const cron = require('node-cron');

const {Bus_Booking,Bus}= require('../models');


const {Op} = require('sequelize');
const {sequelize} = require('../models');



cron.schedule('* * * * *',async()=>{

    console.log('Running the cron job to expire bookings for bus');
    const transaction = await sequelize.transaction();

    try{

        const expiredBooking= await Bus_Booking.findAll({
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
            const bus= await Bus.findByPk(booking.busId,{
                transaction,
                lock:transaction.LOCK.UPDATE
            })
            
            bus.availableSeats+=booking.seats;


            if(bus.status==='full' && bus.availableSeats>0){
                bus.status='scheduled';
            }


            booking.status='cancelled';

            await booking.save({transaction});
            await bus.save({transaction});
        
        }

        await transaction.commit();
        console.log(`Expired ${expiredBooking.length} bookings and updated bus seat availability`);
    
    
    }

    catch(error){

        await transaction.rollback();
        console.error('Error expiring bookings:',error);




    }




})










