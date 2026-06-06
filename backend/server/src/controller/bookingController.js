const BookingService = require('../service/bookingService.js');



const bookingService = new BookingService()


class BookingController{


    async create(req,res){

        try{
            const booking = await bookingService.createBooking({
                userId:req.user.id,
                flightId:req.body.flightId,
                seats:req.body.seats,
                passengerDetails:req.body.passengerDetails
            })



            return res.status(201).json({
                success:true,
                message:"Booking created successfully",
                data:booking,
                error:{}
            })

        }
        catch(error){


            console.log("Error in creating booking",error)
            return res.status(500).json({
                success:false,
                message:"Error in creating booking",
                error:error.message
            })

        }



    }


    async getBookingById(req,res){

        try{
            const booking = await bookingService.getBookingById(req.params.id);

            return res.status(200).json({
                success:true,
                message:"Booking fetched successfully",
                data:booking
            })
        }
        catch(error){
            console.log("Error in getting booking by id",error)
            return res.status(500).json({
                success:false,
                message:"Error in getting booking by id",
                error:error.message
            })
        }

    }


        async getBookingsByUserId(req,res){
            console.log("User id from request",req.user.id)
        
            try{
                const bookings = await bookingService.getMyBookings(req.user.id);
                

                return res.status(200).json({
                    success:true,
                    message:"Bookings fetched successfully",
                    data:bookings
                })


            }
            catch(error){

                console.log("Error in getting bookings by user id",error)
                return res.status(500).json({
                    success:false,
                    message:"Error in getting bookings by user id",
                    error:error.message
                })

            }
        
        }



        async cancel(req,res){
            try{
                const booking = await bookingService.cancelBooking(req.params.id,req.user.id,req.user.role)

                return res.status(200).json({
                    success:true,
                    message:"Booking cancelled successfully",
                    data:booking
                })


            }
            catch(error){
                console.log("Error in cancelling booking",error)
                return res.status(500).json({
                    success:false,
                    message:"Error in cancelling booking",
                    error:error.message
                })
            }
        }



}


module.exports=BookingController