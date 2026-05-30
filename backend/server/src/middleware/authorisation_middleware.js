const isadmin =(req,res,next)=>{
    try{
    if(req.user.role!=="ADMIN"){
        return res.status(403).json({
            message:"Forbidden",
            success:false,
            data:{},
            err:{message:"You do not have permission to access this resource"}
        })
    }
    next();
    }
 
    catch(error){

        res.status(500).json({
            message:"Internal Server Error",
            success:false,
            data:{},
            err:{message:error.message}
        })


    }



}


module.exports={isadmin}