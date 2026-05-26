const Authenticate = require("../service/authService.js");


const authenticate = new Authenticate();

class AuthController{

    async signup(req,res){


        try{

            const user=await authenticate.signUp(req.body);

            res.status(201).json({
                message:"User created successfully",
                success:true,
                data:user,
                err:{}
            })




        }

        catch(error){

            console.log("Error in sign up in controller",error);
            res.status(500).json({
                message:"Internal server error",
                success:false,
                data:{},
                err:error
            })

        }



    }



    async login(req,res){
        try{

            const user=await authenticate.login(req.body);
            res.status(200).json({
                message:"User logged in successfully",
                success:true,
                data:user,
                err:{}

            })



        }
        catch(error){

            console.log("Error in login in controller",error);
            res.status(500).json({
                message:"Internal server error",
                success:false,
                data:{},
                err:error
            })

        }



    }







}



module.exports=AuthController;