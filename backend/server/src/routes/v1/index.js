const express = require('express');

const router=express.Router();

const AuthController=require('../../controller/authController.js')

const authcontroller=new AuthController();


router.post('/signup',authcontroller.signup);
router.post('/login',authcontroller.login);

module.exports=router;