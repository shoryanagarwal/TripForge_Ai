const AirplaneRepository = require('../repository/airplaneRepository.js')



const airplaneRepository=new AirplaneRepository();



class AirplaneService{

    async createAirplane(data){

        try{

            if (data.economySeats+data.buisnessSeats !== data.totalSeats) {
                throw new Error("Economy seats and business seats must equal total seats");
            }

            const airplane=await airplaneRepository.createAirplane(data);
            return airplane;


        }
        catch(error){
            console.log("Error in creating airplane in service",error);
            throw error;

        }



    }


    async getAllAirplanes(){
        try{
            const airplanes=await airplaneRepository.getAllAirplanes();
            return airplanes;
        }
        catch(error){
            console.log("Error in getting all airplanes in service",error);
            throw error;
        }

    }

    async getAirplaneById(id){

        try{


            const airplane=await airplaneRepository.getAirplaneById(id);


            if(!airplane){
                throw new Error("Airplane not found");
            }
            return airplane;

        }
        catch(error){

            console.log("Error in getting airplane by id in service",error);
            throw error;


        }



    }









}



module.exports=AirplaneService;