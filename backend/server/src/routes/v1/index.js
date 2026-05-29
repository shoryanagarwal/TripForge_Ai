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




// Flight routes

const FlightController=require('../../controller/flightControlletr.js')
const flightController=new FlightController();

router.post('/flights',authenticatorUser,flightController.create);
router.get('/flights/:id',authenticatorUser,flightController.get);
router.get('/flights',authenticatorUser,flightController.getAll);




// Booking routes
const BookingController=require('../../controller/bookingController.js')
const bookingController=new BookingController();

router.post('/bookings',authenticatorUser,bookingController.create);
router.get('/bookings/:id',authenticatorUser,bookingController.getBookingById);
router.get('/mybookings',authenticatorUser,bookingController.getBookingsByUserId);
router.post('/bookings/:id/cancel',authenticatorUser,bookingController.cancel);



// Payment routes
const PaymentController=require('../../controller/paymentController.js')
const paymentController=new PaymentController();

router.post('/payments',authenticatorUser,paymentController.create);
router.get('/payments/:id',authenticatorUser,paymentController.getPaymentById);


// Email routes
const sendEmail=require('../../utils/emailService.js')
router.get('/test-email',async(req,res)=>{

        try{
                await sendEmail({
                        to:'shoryanagarwal154@gmail.com',
                        subject:'Test Email from TripForge AI',
                        text:'This is a test email sent from the TripForge AI application.',
                        html:'<p>This is a test email sent from the <strong>TripForge AI</strong> application.</p>'
                })

                res.status(200).json({
                        message:"Test email sent successfully",
                        success:true,
                        data:{},
                        err:{}
                })
        }
        catch(error){
                res.status(500).json({
                        message:"Error sending email",
                        success:false,
                        data:{},
                        err:error.message
                })
        }

})


// Bus routes
const BusController=require('../../controller/busController.js')
const busController=new BusController();

router.post('/buses',authenticatorUser,busController.create);
router.get('/buses/:id',authenticatorUser,busController.get);
router.get('/buses',authenticatorUser,busController.getAll);

// Bus Booking routes
const BusBookingController=require('../../controller/busBookingController.js')
const busBookingController=new BusBookingController();

router.post('/busbookings',authenticatorUser,busBookingController.create);
router.get('/busbookings/:id',authenticatorUser,busBookingController.getBookingById);
router.get('/mybusbookings',authenticatorUser,busBookingController.getBookingsByUserId);
router.patch('/busbookings/:id/cancel',authenticatorUser,busBookingController.cancel);


// Bus Payment routes
const BusPaymentController=require('../../controller/busPaymentController.js')
const busPaymentController=new BusPaymentController();
router.post('/buspayments',authenticatorUser,busPaymentController.create);
router.get('/buspayments/:id',authenticatorUser,busPaymentController.getPaymentById);

module.exports=router;