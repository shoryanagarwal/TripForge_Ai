const dotenv=require('dotenv')

dotenv.config();



const RazorPay=require('razorpay')

const razorpay=new RazorPay({
    key_id:process.env.RAZORPAY_API_KEY,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})


module.exports=razorpay;