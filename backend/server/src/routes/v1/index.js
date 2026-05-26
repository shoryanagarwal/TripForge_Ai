const express = require('express');

const router=express.Router();

const AuthController=require('../../controller/authController.js')
const authenticatorUser=require('../../middleware/auth_middleware.js')
const authcontroller=new AuthController();


router.post('/signup',authcontroller.signup);
router.post('/login',authcontroller.login);


router.get('/profile',authenticatorUser,(req,res)=>{
        res.status(200).json({
                message:"User profile",
                success:true,
                data:{
                        user:req.user
                },
                err:{}
        })

})



// Airplane routes

const AirplaneController=require('../../controller/airplaneController.js')
const airplaneController=new AirplaneController();


router.post('/airplanes',authenticatorUser,airplaneController.createAirplane);
router.get('/airplanes',authenticatorUser,airplaneController.getAllAirplanes);
router.get('/airplanes/:id',authenticatorUser,airplaneController.getAirplaneById);




module.exports=router;