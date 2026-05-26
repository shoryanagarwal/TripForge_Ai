// this middleware ensures that the user is authenticated before accessing protected routes


const jwt=require('jsonwebtoken');
const dotenv =require('dotenv');

dotenv.config();

const authenticatorUser=async (req,res,next)=>{

        try{

                const authHeader=req.headers.authorization;

                if(!authHeader || !authHeader.startsWith('Bearer ')){
                        return res.status(401).json({
                                message:"Unauthorized",
                                success:false,
                                data:{},
                                err:"No token provided"
                        })
                }


                const token= authHeader.split(' ')[1];


                const decoded= jwt.verify(token,process.env.JWT_SECRET_KEY); // this will throw an error if token is invalid or expired

                req.user=decoded; // we can access this user in our controllers to check for authorization or to get user details

                next();
        
        
        }


        catch(error){


                console.log("Error in authenticating user in middleware",error);
                res.status(401).json({
                        message:"Unauthorized",
                        success:false,
                        data:{},
                        err:"Invalid or expired token"
                })


        }





}

module.exports=authenticatorUser;