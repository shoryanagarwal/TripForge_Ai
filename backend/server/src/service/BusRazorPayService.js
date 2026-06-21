const RazorPayRepository=require('../repository/PaymentRepo.js');
const razorPayRepository=new RazorPayRepository();
const dotenv=require('dotenv');
dotenv.config();

const crypto=require('crypto');
const {Bus_Booking,sequelize}=require('../models/index.js');

const BusPaymentService=require('./busPayment.js');
const busPaymentService=new BusPaymentService();
class BusRazorPayService{

    async createOrder(data){



    try  {

        
        const {busBookingId}=data;

        const response= await Bus_Booking.findByPk(busBookingId);

        if(!response){
            throw new Error("Booking not found")
        }

        if(response.status!=='pending'){
            throw new Error("Payment can only be made for pending bookings")
        }


        const order= await razorPayRepository.creatorder({
            amount:response.totalAmount*100,
            currency:'INR',
            receipt:response.id.toString(),

        })
        return order;

    }


    catch(error){

        console.log("Error in creating order",error)
        throw error


    }




    }



    async fetchOrderById(orderId){

        try{
            const order= await razorPayRepository.fetchOrderById(orderId);
            return order;

        }
        catch(error){

            console.log("Error in fetching order by id",error)
            throw error
        }



    }




    async verifyPayment(data){
        try{

            const {razorpay_order_id,razorpay_payment_id,razorpay_signature,busBookingId,paymentMode}=data;

             const body = razorpay_order_id + "|" + razorpay_payment_id;

             const expectedSignature= crypto.createHmac('sha256',process.env.RAZORPAY_KEY_SECRET)
             .update(body)
             .digest('hex')


             if(expectedSignature!==razorpay_signature){
                throw new Error("Invalid signature. Payment verification failed.")
             }

             const payment=await busPaymentService.createPayment({
                busBookingId: busBookingId,
                paymentMode,
                razorpayOrderId: razorpay_order_id,
                razorpayPaymentId: razorpay_payment_id

             })
             return true

        }

        catch(error){

            console.log("Error in verifying payment",error)
            throw error


        }
    }


}


module.exports=BusRazorPayService;