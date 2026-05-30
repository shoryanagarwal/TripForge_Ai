const cron = require('node-cron');

const {Flight_Booking,Flight,Bus_Booking,Bus}= require('../models');


const {Op} = require('sequelize');
const {sequelize} = require('../models');



cron.schedule('* * * * *',async()=>{

    console.log('Running the cron job to expire bookings');
    const transaction = await sequelize.transaction();

    try{

        const expiredBooking= await Flight_Booking.findAll({
            where:{
                status:'pending',
                expiresAt: {
                    [Op.lt]:new Date()
                }
            },
            transaction,
            lock:transaction.LOCK.UPDATE


        })



        for(const booking of expiredBooking){
            const flight= await Flight.findByPk(booking.flightId,{
                transaction,
                lock:transaction.LOCK.UPDATE
            })
            
            flight.availableSeats+=booking.seats;


            if(flight.status==='full' && flight.availableSeats>0){
                flight.status='scheduled';
            }


            booking.status='cancelled';
            booking.cancelledBy="system";
            booking.cancellationReason="Booking expired due to non-payment";
            booking.cancelledAt=new Date();

            await booking.save({transaction});
            await flight.save({transaction});
        
        }

        await transaction.commit();
        console.log(`Expired ${expiredBooking.length} bookings and updated flight seat availability`);
    
    
    }

    catch(error){

        await transaction.rollback();
        console.error('Error expiring bookings:',error);




    }




})










