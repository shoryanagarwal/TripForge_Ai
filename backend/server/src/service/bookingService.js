const {sequelize,Flight,Flight_Booking}= require('../models')

const BookingRepository = require('../repository/bookingRepository.js')


const bookingRepository = new BookingRepository()

class BookingService{

    async createBooking(data){

        const transaction=await sequelize.transaction() // iska matlab hai ki agar booking create karne me koi error aata hai to hum uss transaction ko rollback kar sakte hai taki database me koi inconsistent data na jaye


        try{

            const {flightId,userId,seats}=data;


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

            const totalAmount = flight.price * seats;
            flight.availableSeats=flight.availableSeats - seats;


            if(flight.availableSeats === 0){
                flight.status='full'
            }

            await flight.save({transaction});
            const booking = await bookingRepository.createBooking({
                userId,
                flightId,
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






    async getBookingById(bookingId){
            try{
                const booking = await bookingRepository.getBookingById(bookingId);
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

            const bookings = await bookingRepository.getBookingsByUser(userId)
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

            const booking =await Flight_Booking.findByPk(bookingId,{
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

            const flight= await Flight.findByPk(booking.flightId,{
                transaction,
                lock:transaction.LOCK.UPDATE

            })

            flight.availableSeats=flight.availableSeats + booking.seats;

            if(flight.status === 'full'){
                flight.status='scheduled'
            }

            booking.status='cancelled';

            await flight.save({transaction});
            await booking.save({transaction});
            await transaction.commit();

            return booking;
            

        }
        catch(error){
            console.log("Error in cancelling booking",error)
            await transaction.rollback();
            throw error
        }
    
    
    }


}



module.exports = BookingService