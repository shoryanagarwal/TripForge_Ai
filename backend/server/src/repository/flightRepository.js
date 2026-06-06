const {Flight}=require('../models')


const {Airplane}=require('../models')
class FlightRepository{

    async createFlight(data){
        console.log("Data in repository",data)

        try{

            const flight = await Flight.create(data);

            return flight;


        }
        catch(error){

            console.log("Something went wrong in the repository layer")
            throw error

        }




    }



    async getFlight(flightId){
    
    
         try{

            const flight = await Flight.findByPk(flightId,{
                include:[
                    {
                        model:Airplane,
                        as:'airplane'
                    }
                ]
            });
            return flight;


        }
        catch(error){

            console.log("Something went wrong in the repository layer")
            throw error

        }
    
    
    
    }


    async getAllFlights(filter){ // filter is an object which contains the conditions for filtering the flights
        try{
            const flights = await Flight.findAll({ 
                where:filter,
                include:[
                    {
                        model:Airplane,
                        as:'airplane'
                    }
                ]
            });
            return flights;
        }
        catch(error){
            console.log("Something went wrong in the repository layer")
            throw error

        }
    }


    




}


module.exports=FlightRepository