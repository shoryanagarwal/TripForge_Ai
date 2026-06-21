const razorpay = require('../config/razor_pay.js');


class RazorPayRepository{

    async creatorder(data){
        try{

            const response = await razorpay.orders.create(data);

            return response;

        }
        catch(error){
            console.log("Error in creating order",error);
            throw error
        }
    }



    async fetchOrderById(orderId){

        try{

            const response = await razorpay.orders.fetch(orderId);
            return response;

        }
        catch(error){
            console.log("Error in fetching order by id",error);
            throw error
        }


    }





}


module.exports = RazorPayRepository;