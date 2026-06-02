const AiService= require('../service/aiService.js');


const aiService = new AiService();


class AiController{

    async recommendTrips(req,res){

        try{

            const response= await aiService.recommendTrips(req.body);
            res.status(200).json({
                message:"Trips recommended successfully",
                success:true,
                data:response,
                err:{}
            })


        }

        catch(error){
            console.log("Error in recommending trips in controller",error);
            res.status(500).json({
                message:"Internal server error",
                success:false,
                data:{},
                err:error
            })
        }





    }




}


module.exports=AiController;