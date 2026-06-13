const {sequelize,Flight,Flight_Booking,User}= require('../models')

const BookingRepository = require('../repository/bookingRepository.js')
const sendEmail = require('../utils/emailService.js');
const NotificationService=require('./Notification_Service.js')
const notificationService=new NotificationService();


const bookingRepository = new BookingRepository()

class BookingService{

    async createBooking(data){

        const transaction=await sequelize.transaction() // iska matlab hai ki agar booking create karne me koi error aata hai to hum uss transaction ko rollback kar sakte hai taki database me koi inconsistent data na jaye


        try{

            const {flightId,userId,seats,passengerDetails,totalAmount}=data;



            const flight= await Flight.findByPk(flightId,{
                transaction,
                lock:transaction.LOCK.UPDATE //race condition ko avoid karta hai ek tarah se set lock hai
            
            });

            const expireAt=new Date(
                Date.now() + 5*60*1000 // 5 minutes
            )

            if(!flight){
                throw new Error("Flight not found")
            }

            if(flight.availableSeats < seats){  
                throw new Error("Not enough seats available")
            }


            if(flight.status !== 'scheduled'){  
                throw new Error("Flight is not scheduled")
            }
            if (!seats || seats <= 0) {
                throw new Error("Seats must be greater than 0");
            }

            if (!passengerDetails || passengerDetails.length !== seats) {
               throw new Error("Passenger count must match selected seats");
            }

           


            if(flight.availableSeats === 0){
                flight.status='full'
            }



            const todayDate = new Date();
            todayDate.setHours(0, 0, 0, 0)
            if (flight.departureTime < todayDate) {
                throw new Error("Cannot book a flight that has already departed");
            }


            await flight.save({transaction});
            const booking = await bookingRepository.createBooking({
                userId,
                flightId,
                seats,
                totalAmount,
                status:'pending',
                expiresAt:expireAt,
                passengerDetails

            },transaction);

            flight.availableSeats= flight.availableSeats - seats;

            await flight.save({transaction});


            await transaction.commit();
            return booking;

        
        
        }
        catch(error){

            console.log("Error in creating booking",error)
            await transaction.rollback();
            throw error


        }





    }






    async getBookingById(bookingId){
            try{
                const booking = await bookingRepository.getBookingById(bookingId);
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

            const bookings = await bookingRepository.getBookingsByUser(userId)
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

            const booking =await Flight_Booking.findByPk(bookingId,{
                    transaction,
                    lock:transaction.LOCK.UPDATE
                    
            
                }

            )

            const flightId= booking.flightId
            const flight= await Flight.findByPk(flightId,{
                transaction,
                lock:transaction.LOCK.UPDATE

            })
            console.log("Booking to be cancelled",booking)
            console.log("User id from request",userId)
            console.log("User role from request",role)

            console.log("Booking user id",flight)

            if(!booking){
                throw new Error("Booking not found")
            }

            if(booking.userId !== userId){
                throw new Error("Unauthorized to cancel this booking")
            }
            if(booking.status === 'cancelled'){
                throw new Error("Booking is already cancelled")
            }

            const now= new Date();
            const departureTime= flight.dataValues.departureTime
            if(now >= departureTime){
                throw new Error("Cannot cancel booking for flight that has already departed")
            }

            

            flight.availableSeats=flight.availableSeats + booking.seats;

            if(flight.status === 'full'){
                flight.status='scheduled'
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




          if(role === 'ADMIN'){
                booking.cancelledBy="ADMIN"
                booking.cancellationReason="Cancelled by admin"

            }
            else{
                booking.cancelledBy="USER"
                booking.cancellationReason="Cancelled by user"
            }
            booking.cancelledAt=new Date();


            await flight.save({transaction});
            await booking.save({transaction});


            const fullBooking= await Flight_Booking.findByPk(bookingId,{
                include:[
                    {
                        model:User,
                        as:'user',
                        attributes:['id','name','email']
                    },
                    {
                        model:Flight,
                        as:'flight'
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
                        <p><b>Flight:</b> ${fullBooking.flight.flightNumber}</p>
                        <p><b>Route:</b> ${fullBooking.flight.source} → ${fullBooking.flight.destination}</p>
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



module.exports = BookingService