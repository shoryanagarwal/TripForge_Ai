const {Bus} = require('../models');




class BusRepository{

    async createBus(data){
        console.log("Data in repository",data)

        try{

            const bus = await Bus.create(data);

            return bus;


        }
        catch(error){

            console.log("Something went wrong in the repository layer")
            throw error

        }




    }



    async getBusById(busId){
    
    
         try{

            const bus = await Bus.findByPk(busId);
            return bus;


        }
        catch(error){

            console.log("Something went wrong in the repository layer")
            throw error

        }
    
    
    
    }


    async getAllBus(filter){ // filter is an object which contains the conditions for filtering the flights
        try{
            const bus = await Bus.findAll({ 
                where:filter,
                
            });

            console.log("Buses in repository",bus);
            return bus;
        }
        catch(error){
            console.log("Something went wrong in the repository layer")
            throw error

        }
    }






}


module.exports=BusRepository