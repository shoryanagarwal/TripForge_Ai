const {sequelize,Bus,Bus_Booking,User}= require('../models')

const BusBookingRepository = require('../repository/busBookingRepository.js');
const sendEmail = require('../utils/emailService.js');

const busbookingRepository = new BusBookingRepository()
const NotificationService=require('./Notification_Service.js')
const notificationService=new NotificationService();
class BusBookingService{

    async createBooking(data){

        const transaction=await sequelize.transaction() // iska matlab hai ki agar booking create karne me koi error aata hai to hum uss transaction ko rollback kar sakte hai taki database me koi inconsistent data na jaye


        try{

            const {busId,userId,seats,passengerDetails,totalAmount}=data;


            const bus= await Bus.findByPk(busId,{
                transaction,
                lock:transaction.LOCK.UPDATE //race condition ko avoid karta hai ek tarah se set lock hai
            
            });

            const expireAt=new Date(
                Date.now() + 5*60*1000 // 5 minutes
            )

            if(!bus){
                throw new Error("Bus not found")
            }

            if(bus.availableSeats < seats){  
                throw new Error("Not enough seats available")
            }


            if(bus.status !== 'scheduled'){  
                throw new Error("Bus is not scheduled")
            }
            

            


            if(bus.availableSeats === 0){
                bus.status='full'
            }
            if (!seats || seats <= 0) {
                throw new Error("Seats must be greater than 0");
            }
            if (!passengerDetails || passengerDetails.length !== seats) {
                throw new Error("Passenger count must match selected seats");
            }


             const todayDate = new Date();
            todayDate.setHours(0, 0, 0, 0)
            if (bus.departureTime < todayDate) {
                throw new Error("Cannot book a bus that has already departed");
            }

            await bus.save({transaction});
            const booking = await busbookingRepository.createBooking({
                userId,
                busId,
                seats,
                totalAmount,
                status:'pending',
                expiresAt:expireAt,
                passengerDetails

            },transaction);

            bus.availableSeats -= seats;
            await bus.save({transaction});


            await transaction.commit();
            return booking;

        
        
        }
        catch(error){

            console.log("Error in creating booking",error)
            await transaction.rollback();
            throw error


        }





    }






    async getBusBookingById(bookingId){
            try{
                const booking = await busbookingRepository.getBookingById(bookingId);
                if(!booking){
                    throw new Error("Booking not found")
                }
                
                
                return booking;
            }


            catch(error){

                console.log("Error in getting booking by id",error)
                throw error

            }




    }



    async getMyBookings(userId){
        try{

            const bookings = await busbookingRepository.getBookingsByUser(userId)
            return bookings
        
        }


        catch(error){

            console.log("Error in getting bookings for user",error)
            throw error


        }
    
    
    
    }



    async cancelBooking(bookingId,userId,role){
    
        const transaction = await sequelize.transaction();


        try{

            const booking =await Bus_Booking.findByPk(bookingId,{
                    transaction,
                    lock:transaction.LOCK.UPDATE
                    
            
                }

            )


            if(!booking){
                throw new Error("Booking not found")
            }

            if(booking.userId !== userId){
                throw new Error("Unauthorized to cancel this booking")
            }
            if(booking.status === 'cancelled'){
                throw new Error("Booking is already cancelled")
            }

            const bus= await Bus.findByPk(booking.busId,{
                transaction,
                lock:transaction.LOCK.UPDATE

            })

            const now= new Date();
        
            const departureTime= bus.departureTime;
            if(now >= departureTime){
                throw new Error("Cannot cancel booking for bus that has already departed")
            }

            
            if(!bus){
                throw new Error("Associated bus not found")
            }

            bus.availableSeats=bus.availableSeats + booking.seats;

            if(bus.status === 'full'){
                bus.status='scheduled'
            }
            if(booking.status === 'pending'){
                throw new Error("Cannot cancel unpaid booking");
            }

            booking.status='cancelled';

            if(booking.status==='cancelled'){
                await notificationService.createNotification({
                    userId: booking.userId,
                    title: "Booking Cancelled",
                    message: `Your booking has been Cancelled successfully.`,
                    type: "BOOKING_CANCELLED",
                })
            }


            if(role==='ADMIN'){
                 booking.cancelledBy="ADMIN"
                booking.cancellationReason="Cancelled by admin"
            }
            else{
                booking.cancelledBy="USER"
                booking.cancellationReason="Cancelled by user"
            }
            booking.cancelledAt=new Date();

            await bus.save({transaction});
            await booking.save({transaction});


            const fullBooking= await Bus_Booking.findByPk(bookingId,{
                include:[
                    {
                        model:User,
                        as:'user',
                        attributes:['id','name','email']
                    },
                    {
                        model:Bus,
                        as:'bus',

                    }

                ],
                transaction
            })

            


            await transaction.commit();

            await sendEmail({
                to:fullBooking.user.email,
                 subject: "TripForge AI - Booking Cancelled",
                    html: `
                        <h2>Booking Cancelled</h2>
                        <p>Hi ${fullBooking.user.name},</p>
                        <p>Your booking has been cancelled successfully.</p>
                        <p><b>Booking ID:</b> ${fullBooking.id}</p>
                        <p><b>Bus:</b> ${fullBooking.bus.busNumber}</p>
                        <p><b>Route:</b> ${fullBooking.bus.source} → ${fullBooking.bus.destination}</p>
                        <p><b>Seats Cancelled:</b> ${fullBooking.seats}</p>
                        <p><b>Refund Amount:</b> ₹${fullBooking.totalAmount}</p>
                        <p>Your refund will be processed soon.</p>
                    `,

            })

            return fullBooking;
            

        }
        catch(error){
            console.log("Error in cancelling booking",error)
            await transaction.rollback();
            throw error
        }
    
    
    }


}



module.exports = BusBookingService