const cron = require('node-cron');
const {Flight_Booking,Flight,User,Sequelize} = require('../models');
const sendEmail = require('../utils/emailService.js');
const {Op} = Sequelize;




cron.schedule('0 * * * *',async()=>{
    console.log('Running the cron job to send booking reminders');
    const transaction = await sequelize.transaction();

    try{
        const bookings= await Flight_Booking.findAll({
            where:{
                status:'confirmed',
                remainderSent:false,
                remainderAt:{
                    [Op.lte]:new Date()
                }

            },

            include:[

                {
                    model:User,
                    as:'user',
                    attributes:['id','name','email']
                },
                {
                    model:Flight,
                    as:'flight'
                }


            ],
            transaction,
            lock:transaction.LOCK.UPDATE
            
        })



        for(const booking of bookings){

                await sendEmail({

                    to:booking.user.email,
                     html: `
                    <h2>Journey Reminder ✈️</h2>
                    <p>Hi ${booking.user.name},</p>
                    <p>This is a reminder for your upcoming journey.</p>
                    <p><b>Flight:</b> ${booking.flight.flightNumber}</p>
                    <p><b>Route:</b> ${booking.flight.source} → ${booking.flight.destination}</p>
                    <p><b>Departure:</b> ${booking.flight.departureTime}</p>
                    <p><b>Seats:</b> ${booking.seats}</p>
                    <p>Please reach the airport on time.</p>
                    `,

                })


                booking.remainderSent=true;
                await booking.save({transaction});


        }


        await transaction.commit();
        console.log(`Sent reminders for ${bookings.length} bookings`);

    }
    catch(error){
        await transaction.rollback();
        console.error('Error sending booking reminders:',error);

        
    }

})


