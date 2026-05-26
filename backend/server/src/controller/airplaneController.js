const AirplaneService=require('../service/airplaneService.js')


const airplaneService=new AirplaneService();

class AirplaneController{


    async createAirplane(req,res){

        try{

            const airplane= await airplaneService.createAirplane(req.body);

            res.status(201).json({
                message:"Airplane created successfully",
                success:true,
                data:airplane,
                err:{}
            })
        
        
        }
        catch(error){

            console.log("Error in creating airplane in controller",error);
            res.status(500).json({
                message:"Error in creating airplane",
                success:false,
                data:{},
                err:error.message
            })



        }



    }



    async getAllAirplanes(req,res){

        try{
            const airplanes=await airplaneService.getAllAirplanes();
            res.status(200).json({
                message:"Airplanes retrieved successfully",
                success:true,
                data:airplanes,
                err:{}
            })
        }
        catch(error){
            console.log("Error in getting all airplanes in controller",error);

            res.status(500).json({
                message:"Error in getting all airplanes",
                success:false,
                data:{},
                err:error.message
            })
        }



    }


    async getAirplaneById(req,res){

        try{
            const airplane=await airplaneService.getAirplaneById(req.params.id);


            if(!airplane){
                return res.status(404).json({
                    message:"Airplane not found",
                    success:false,
                    data:{},
                    err:{}
            })
         }
        

            res.status(200).json({
                message:"Airplane retrieved successfully",
                success:true,
                data:airplane,
                err:{}
            })
        }

        catch(error){
            console.log("Error in getting airplane by id in controller",error);
            res.status(500).json({
                message:"Error in getting airplane by id",
                success:false,

                data:{},
                err:error.message
            })
        }

    }


}

module.exports=AirplaneController;