const { json } = require("sequelize");
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


    async verifyEmail(req,res){

            try{

                const user= await authenticate.verifyEmail(req.body);

                res.status(200).json({
                    message:"Email verified successfully",
                    success:true,
                    data:user,
                    err:{}
                })
            
            }
            catch(error){

                console.log("Error in email verification in controller",error);
                res.status(500).json({
                    message:"Internal server error",
                    success:false,
                    data:{},
                    err:error
                })

            }






    }



    async resendOtp(req,res){

        try {
            
            const otp=await authenticate.resendOtp(req.body);


            res.status(200).json({
                     message:"otp send successfully",
                    success:true,
                    data:otp,
                    err:{}
            })



        } 
        
        catch (error) {
            console.log("Error in resending otp in controller",error);
            res.status(500).json({
                message:"error while sending otp",
                success:false,
                data:{},
                err:error
            })

        }



    }



    async forgotPassword(req,res){
        try{

            const response= await authenticate.forgotPassword(req.body);
            
            res.status(200).json({
                message:"Otp send successfully",
                success:true,
                data:response,
                err:{}
            })


        }
        catch(error){
            res.status(500).json({
                message:"error while sending otp",
                success:false,
                data:{},
                err:error
            })

        }



    }



    async resetPassword(req,res){

        try{
            const response=await authenticate.resetPassword(req.body);
            res.status(200).json({
                message:"Password reset successfully",
                success:true,
                data:response,
                err:{}
            })

        }
        catch(error){
            res.status(500).json({
                message:"error while resetting password",
                success:false,
                data:{},
                err:error
            })
        }

    }





}



module.exports=AuthController;