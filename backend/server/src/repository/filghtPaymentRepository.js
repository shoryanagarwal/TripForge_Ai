const {Payment} = require('../models');

class PaymentRepository{


    async createPayment(data,transaction){


        try{

            const payment= await Payment.create(data,{transaction});
            return payment;


        }
        catch(error){
            console.log("Error in creating payment",error)
            throw error


        }
        




    }



    async getPaymentById(paymentId){
    
        try{

        
            const payment = await Payment.findByPk(paymentId);
            if(!payment){
                throw new Error("Payment not found")
            }

            return payment;
        
        }

        catch(error){


            console.log("Error in getting payment by id",error)
            throw error

        }
    
    
    
    
    }


    

}



module.exports=PaymentRepository;