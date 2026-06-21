const RazorPayService=require('../service/BusRazorPayService.js');
const razorPayService=new RazorPayService();


class BusRazorPayController{

    async createOrder(req,res){

        try{
            const order= await razorPayService.createOrder(req.body);
            res.status(200).json({
                success:true,
                message:"Razorpay order created successfully",
                data:order
            })

        }
        catch(error){

            console.log("Error in Razorpay controller while creating order",error);
            res.status(500).json({
                success:false,
                message:"Error in Razorpay controller while creating order",
                error:error.message
            })

        }

    }



    async fetchOrderById(req,res){

        try{

            const orderId=req.params.id;
            const order= await razorPayService.fetchOrderById(orderId);
            res.status(200).json({
                success:true,
                message:"Razorpay order fetched successfully",
                data:order
            })

        }
        catch(error){
            console.log("Error in Razorpay controller while fetching order by id",error);
            res.status(500).json({
                success:false,
                message:"Error in Razorpay controller while fetching order by id",
                error:error.message
            })
        }


    }



    async verifyPayment(req,res){
        try{
            const response= await razorPayService.verifyPayment(req.body);
            res.status(200).json({
                success:true,
                message:"Payment verified successfully",
                data:response
            })
        }
        catch(error){
            console.log("Error in Razorpay controller while verifying payment",error);
            res.status(500).json({
                success:false,
                message:"Error in Razorpay controller while verifying payment",
                error:error.message
            })
            
        }

    }



}


module.exports=BusRazorPayController;