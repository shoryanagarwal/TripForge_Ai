const {Flight_Booking,User,Flight,Airplane} = require('../models')


class BookingRepository{


    async createBooking(data,transaction){


        try{

            const booking = await Flight_Booking.create(data,{transaction});


            return booking

            
        }
        catch(error){
            console.log("Error in creating booking",error)
            throw error
        }


    }



    async getBookingById(id){

        try{

            const booking = await Flight_Booking.findByPk(id,{
                include:[
                    {
                        model:User,
                        as:'user',
                        attributes:['id','name','email']
                    },
                    {
                        model:Flight,
                        as:'flight',
                        include:[
                            {
                                model:Airplane,
                                as:'airplane',
                               
                            }
                        ],
                       


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

            const bookings = await Flight_Booking.findAll({
                where:{
                    userId
                },
                include:[
                    {
                        model:Flight,
                        as:'flight',
                        include:[
                            {
                                model:Airplane,
                                as:'airplane'
                            }
                        ]
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



module.exports=BookingRepository