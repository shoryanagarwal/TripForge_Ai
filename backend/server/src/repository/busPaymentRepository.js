const {Bus_Payment} = require('../models');

class BusPaymentRepository{


    async createPayment(data,transaction){


        try{

            const payment= await Bus_Payment.create(data,{transaction});
            return payment;


        }
        catch(error){
            console.log("Error in creating payment",error)
            throw error


        }
        




    }



    async getPaymentById(paymentId){
    
        try{

        
            const payment = await Bus_Payment.findByPk(paymentId);
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



module.exports=BusPaymentRepository;