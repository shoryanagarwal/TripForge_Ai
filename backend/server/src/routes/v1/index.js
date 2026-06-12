const express = require('express');
const {User}=require('../../models')
const router=express.Router();

const AuthController=require('../../controller/authController.js')
const authenticatorUser=require('../../middleware/auth_middleware.js')
const authcontroller=new AuthController();

const {isadmin} =require('../../middleware/authorisation_middleware.js')
router.post('/signup',authcontroller.signup);
router.post('/login',authcontroller.login);


router.get('/profile',authenticatorUser,async(req,res)=>{
        try{
                const user=await User.findByPk(req.user.id,{
                       attributes: ["id", "name", "email", "role"]
                })
                res.status(200).json({
                        message: "User profile",
                        success: true,
                        data: {
                                user,
                        },
                        err: {},
                });
                } catch (error) {
                        res.status(500).json({
                        message: "Error fetching profile",
                        success: false,
                        data: {},
                        err: error.message,
                });
  }
});



// Airplane routes

const AirplaneController=require('../../controller/airplaneController.js')
const airplaneController=new AirplaneController();


router.post('/airplanes',authenticatorUser,isadmin,airplaneController.createAirplane);
router.get('/airplanes',authenticatorUser,airplaneController.getAllAirplanes);
router.get('/airplanes/:id',authenticatorUser,airplaneController.getAirplaneById);




// Flight routes

const FlightController=require('../../controller/flightControlletr.js')
const flightController=new FlightController();

router.post('/flights',authenticatorUser,isadmin,flightController.create);
router.get('/flights/:id',authenticatorUser,flightController.get);
router.get('/flights',authenticatorUser,flightController.getAll);




// Booking routes
const BookingController=require('../../controller/bookingController.js')
const bookingController=new BookingController();

router.post('/bookings',authenticatorUser,bookingController.create);
router.get('/bookings/:id',authenticatorUser,bookingController.getBookingById);
router.get('/mybookings',authenticatorUser,bookingController.getBookingsByUserId);
router.patch('/bookings/:id/cancel',authenticatorUser,bookingController.cancel);



// Payment routes
const PaymentController=require('../../controller/flightPaymentController.js')
const paymentController=new PaymentController();

router.post('/payments',authenticatorUser,paymentController.create);
router.get('/payments/:id',authenticatorUser,paymentController.getPaymentById);


// Email routes



// Bus routes
const BusController=require('../../controller/busController.js')
const busController=new BusController();

router.post('/buses',authenticatorUser,isadmin,busController.create);
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


//otp verification route
router.post('/verify-email',authcontroller.verifyEmail);

//resend otp

router.post('/resend-otp',authcontroller.resendOtp);


// Ai routes
const AiController=require('../../controller/AiController.js')
const aiController=new AiController();

router.post('/ai/recommend',aiController.recommendTrips);


//Fare package routes
const FarePackageController=require('../../controller/FarePackageController.js')
const farePackageController=new FarePackageController();
router.post('/fare-packages',authenticatorUser,isadmin,farePackageController.createFarePackage);
router.get('/flights/:flightId/fare-packages',authenticatorUser,farePackageController.getFarePackagesByFlight);


//Notification routes
const NotificationController=require('../../controller/Notification_Controller.js')
const notificationController=new NotificationController();

router.post('/notifications',notificationController.create);
router.get('/users/:id/notifications',notificationController.getNotificationsByUserId);
router.get('/notifications/:id',notificationController.getNotificationById);
router.patch('/notifications/:id/read',notificationController.updateNotification);




module.exports=router;