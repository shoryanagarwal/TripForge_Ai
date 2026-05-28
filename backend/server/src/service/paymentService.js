const PaymentRepository = require('../repository/paymentRepository.js');

const {sequelize,Flight_Booking,User,Flight} = require('../models');
const crypto = require('crypto');
const paymentRepository = new PaymentRepository();
const sendEmail = require('../utils/emailService.js');
class PaymentService{

    async createPayment(data){
            const transaction= await sequelize.transaction();


        try{
            const {bookingId,paymentMode}=data;

            const booking= await Flight_Booking.findByPk(bookingId,{
                transaction,
                lock:transaction.LOCK.UPDATE
            })

            if(!booking){
                throw new Error("Booking not found")
            }

            if(booking.status!=='pending'){
                throw new Error("Payment can only be made for pending bookings")
            }

            const transactionId=crypto.randomUUID();


            const payment=await paymentRepository.createPayment({
                bookingId,
                amount:booking.totalAmount,
                paymentMode,
                transactionId,
                status:'success'
            },transaction);

            booking.status='confirmed';
            await booking.save({transaction});



            const fullBooking = await Flight_Booking.findByPk(bookingId,{
                include:[
                    {
                        model:User,
                        as:'user',
                        attributes:['id','name','email']
                    },
                    {
                        model:Flight,
                        as:'flight'
                    },

                ],
                transaction
            })


            const remainderTime = new Date(fullBooking.flight.departureTime.getTime()-12 * 60 * 60 * 1000);
            booking.remainderAt = remainderTime;
            await booking.save({transaction});

            await sendEmail({
                to:fullBooking.user.email,
               subject: "TripForge AI - Booking Confirmed",
                text: `Your payment for booking ${bookingId} has been confirmed. Transaction ID: ${transactionId}`,
                html: `
                    <h2>Booking Confirmed ✅</h2>
                    <p>Hi ${fullBooking.user.name},</p>
                    <p>Your payment has been confirmed.</p>
                    <p><b>Booking ID:</b> ${bookingId}</p>
                    <p><b>Flight:</b> ${fullBooking.flight.flightNumber}</p>
                    <p><b>Route:</b> ${fullBooking.flight.source} → ${fullBooking.flight.destination}</p>
                    <p><b>Seats:</b> ${fullBooking.seats}</p>
                    <p><b>Amount Paid:</b> ₹${fullBooking.totalAmount}</p>
                    <p><b>Transaction ID:</b> ${transactionId}</p>
                `,
            })


            await transaction.commit();
            return payment;

        }
        catch(error){

            await transaction.rollback();
            console.log("Error in creating payment",error)
            throw error


        }
    }



    async getPaymentById(paymentId){


        try{
            const payment= await paymentRepository.getPaymentById(paymentId);
            return payment;
        }
        catch(error){
            console.log("Error in getting payment by id",error)
            throw error

        }




    }




}



module.exports=PaymentService;