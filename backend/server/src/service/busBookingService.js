const {sequelize,Bus,Bus_Booking,User}= require('../models')

const BusBookingRepository = require('../repository/busBookingRepository.js');
const sendEmail = require('../utils/emailService.js');

const busbookingRepository = new BusBookingRepository()

class BusBookingService{

    async createBooking(data){

        const transaction=await sequelize.transaction() // iska matlab hai ki agar booking create karne me koi error aata hai to hum uss transaction ko rollback kar sakte hai taki database me koi inconsistent data na jaye


        try{

            const {busId,userId,seats}=data;


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

            const totalAmount = bus.price * seats;
            bus.availableSeats=bus.availableSeats - seats;


            if(bus.availableSeats === 0){
                bus.status='full'
            }

            await bus.save({transaction});
            const booking = await busbookingRepository.createBooking({
                userId,
                busId,
                seats,
                totalAmount,
                status:'pending',
                expiresAt:expireAt

            },transaction);


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
                console.log("Booking in service layer",booking)
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



    async cancelBooking(bookingId,userId){
    
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

            return booking;
            

        }
        catch(error){
            console.log("Error in cancelling booking",error)
            await transaction.rollback();
            throw error
        }
    
    
    }


}



module.exports = BusBookingService