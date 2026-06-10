const BusPaymentRepository = require('../repository/busPaymentRepository');
const {sequelize,Bus_Booking,User,Bus} = require('../models');
const crypto = require('crypto');
const busPaymentRepository = new BusPaymentRepository();
const sendEmail = require('../utils/emailService.js');
const BusgenerateTicket=require('../utils/buspdfgnerator.js')
 const fs = require("fs");
const NotificationService=require('./Notification_Service.js')
const notificationService=new NotificationService();
class BusPaymentService{

    async createPayment(data){
            const transaction= await sequelize.transaction();


        try{
            const { busBookingId,paymentMode}=data;

            const booking= await Bus_Booking.findByPk(busBookingId,{
                transaction,
                lock:transaction.LOCK.UPDATE
            })

            if(!booking){
                throw new Error("Booking not found")
            }

            if(booking.status!=='pending'){
                throw new Error("Payment can only be made for pending bookings")
            }

            if (booking.status === "cancelled") {
                throw new Error("Cannot make payment for cancelled booking");
            }
            if (booking.status === "confirmed") {
            throw new Error("Payment already completed for this booking");
            }

            const transactionId=crypto.randomUUID();


            const payment=await busPaymentRepository.createPayment({
                 busBookingId,
                amount:booking.totalAmount,
                paymentMode,
                transactionId,
                status:'success'
            },transaction);

            booking.status='confirmed';

             if(booking.status==='confirmed'){
                await notificationService.createNotification({
                    userId: booking.userId,
                    title: "Booking Confirmed",
                    message: `Your booking has been confirmed successfully.`,
                    type: "BOOKING_CONFIRMED",
                })
            }

            await booking.save({transaction});



            const fullBooking = await Bus_Booking.findByPk(busBookingId,{
                include:[
                    {
                        model:User,
                        as:'user',
                        attributes:['id','name','email']
                    },
                    {
                        model:Bus,
                        as:'bus'
                    }

                ],
                transaction
            })


            const remainderTime = new Date(fullBooking.bus.departureTime.getTime()-12 * 60 * 60 * 1000);
            booking.remainderAt = remainderTime;
            await booking.save({transaction});

             const pdfPath = await BusgenerateTicket(fullBooking,payment);

            await sendEmail({
                to:fullBooking.user.email,
               subject: "TripForge AI - Booking Confirmed",
                text: `Your payment for booking ${busBookingId} has been confirmed. Transaction ID: ${transactionId}`,
                html: `
                    <h2>Booking Confirmed ✅</h2>
                    <p>Hi ${fullBooking.user.name},</p>
                    <p>Your payment has been confirmed.</p>
                    <p><b>Booking ID:</b> ${busBookingId}</p>
                    <p><b>Bus:</b> ${fullBooking.bus.busNumber}</p>
                    <p><b>Route:</b> ${fullBooking.bus.source} → ${fullBooking.bus.destination}</p>
                    <p><b>Seats:</b> ${fullBooking.seats}</p>
                    <p><b>Amount Paid:</b> ₹${fullBooking.totalAmount}</p>
                    <p><b>Transaction ID:</b> ${transactionId}</p>
                `,

                attachments:[
                    {
                        filename:`Ticket_${busBookingId}.pdf`,
                        path:pdfPath
                    }
                ]

                
            })

             fs.unlinkSync(pdfPath);



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
            const payment= await busPaymentRepository.getPaymentById(paymentId);
            return payment;
        }
        catch(error){
            console.log("Error in getting payment by id",error)
            throw error

        }




    }




}



module.exports=BusPaymentService;