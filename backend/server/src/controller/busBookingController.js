const BusBookingService = require('../service/busBookingService');



const busbookingService = new BusBookingService()


class BusBookingController{


    async create(req,res){

        try{
            const booking = await busbookingService.createBooking({
                userId:req.user.id,
                busId:req.body.busId,
                seats:req.body.seats,
                passengerDetails:req.body.passengerDetails,
                totalAmount:req.body.totalAmount
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
            const booking = await busbookingService.getBusBookingById(req.params.id);

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
        
            try{
                const bookings = await busbookingService.getMyBookings(req.user.id);
                

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
                const booking = await busbookingService.cancelBooking(req.params.id,req.user.id)

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


module.exports=BusBookingController