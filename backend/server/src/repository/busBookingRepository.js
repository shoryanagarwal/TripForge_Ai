const {Bus_Booking,User,Bus} = require('../models');




class BusBookingRepository{


    async createBooking(data,transaction){


        try{

            const booking = await Bus_Booking.create(data,{transaction});


            return booking

            
        }
        catch(error){
            console.log("Error in creating booking",error)
            throw error
        }


    }



    async getBookingById(id){

        try{

            const booking = await Bus_Booking.findByPk(id,{
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
                ]
            })


            return booking

        }
        catch(error){

        console.log("Error in fetching booking by id",error)
        throw error

        }



    }





    async getBookingsByUser(userId){

        try{

            const bookings = await Bus_Booking.findAll({
                where:{
                    userId
                },
                include:[
                    {
                        model:Bus,
                        as:'bus',
                    }
                ]
                
            })



            return bookings
        
        }


        catch(error){

            console.log("Error in fetching bookings by user",error)
            throw error
        }





    }





}



module.exports=BusBookingRepository