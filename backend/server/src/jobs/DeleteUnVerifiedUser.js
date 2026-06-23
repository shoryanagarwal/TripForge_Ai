const cron = require('node-cron');
const {Op}=require ('sequelize');
const {User}=require('../models');

//for 10 min
cron.schedule('*/10 * * * *',async()=>{

    console.log('Running the cron job to delete unverified users');

    try{
        const expiryTime= new Date(Date.now()-10*60*1000)
        const response=await User.destroy({
            where:{
                isVerified:false,
                createdAt:{
                    [Op.lt]:expiryTime
                }
            }
        })

        console.log(`Deleted ${response} unverified users`);
    }
    catch(error){
        console.error('Error deleting unverified users:',error);
    }


})