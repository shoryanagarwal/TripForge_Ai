const PaymentService = require('../service/paymentService.js');

const paymentService = new PaymentService();

class PaymentController{

    async create(req,res){

        try{
            const payment = await paymentService.createPayment({
                bookingId:req.body.bookingId,
                paymentMode:req.body.paymentMode
            })

            res.status(201).json({
                message:"Payment created successfully",
                success:true,
                data:payment
            })


        }
        catch(error){
            console.log("Error in creating payment",error)
            res.status(500).json({
                message:"Error in creating payment",
                err:error,
                success:false,
                data:{}
            })
        }





    }



    async getPaymentById(req,res){
        try{
            const paymentId=req.params.id;
            const payment = await paymentService.getPaymentById(paymentId);
            res.status(200).json({
                message:"Payment fetched successfully",
                success:true,
                data:payment
            })
        }

        catch(error){
            console.log("Error in getting payment by id",error)
            res.status(500).json({
                message:"Error in getting payment by id",
                err:error,
                success:false,
                data:{}
            })
        }
    }




}


module.exports = PaymentController;