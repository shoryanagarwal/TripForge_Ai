const cron = require('node-cron');
const {Bus_Booking,Bus,User,Sequelize, sequelize} = require('../models/index.js');
const sendEmail = require('../utils/emailService.js');
const {Op} = sequelize;




cron.schedule('0 * * * *',async()=>{
    console.log('Running the cron job to send booking reminders');
    const transaction = await sequelize.transaction();

    try{
        const bookings= await Bus_Booking.findAll({
            where:{
                status:'confirmed',
                reminderSent:false,
                reminderAt:{
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
                    model:Bus,
                    as:'bus'
                }


            ],
            transaction,
            lock:transaction.LOCK.UPDATE
            
        })



        for(const booking of bookings){

                await sendEmail({

                    to:booking.user.email,
                    subject: "TripForge AI - Bus Journey Reminder",
                     html: `
                    <h2>Journey Reminder ✈️</h2>
                    
                    <p>Hi ${booking.user.name},</p>
                    <p>This is a reminder for your upcoming journey.</p>
                    <p><b>Bus:</b> ${booking.bus.busNumber}</p>
                    <p><b>Route:</b> ${booking.bus.source} → ${booking.bus.destination}</p>
                    <p><b>Departure:</b> ${booking.bus.departureTime}</p>
                    <p><b>Seats:</b> ${booking.seats}</p>
                    <p>Please reach the Bus Stand on time.</p>
                    `,

                })


                booking.reminderSent=true;
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


