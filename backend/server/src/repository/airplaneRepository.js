const {Airplane} = require('../models');



class AirplaneRepository{

    async createAirplane(data){

            try{

                const airplane=await Airplane.create(data);

                return airplane;
            
            }

            catch(error){

            console.log("Error in creating airplane in repository",error);
            throw error;


            }





    }



    async getAllAirplanes(){

        try{
            const airplanes=await Airplane.findAll();
            return airplanes;
        }
        catch(error){
            console.log("Error in getting all airplanes in repository",error);
            throw error;
        }

    }


    async getAirplaneById(id){
        try{

            const airplane=await Airplane.findByPk(id);
            return airplane;


        }
        catch(error){

            console.log("Error in getting airplane by id in repository",error);
            throw error;
        }

    }




}



module.exports=AirplaneRepository;