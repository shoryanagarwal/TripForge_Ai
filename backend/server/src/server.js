const dotenv=require('dotenv')
const app = require("./app");
const http = require('http');
const PORT = process.env.PORT || 3000;
const server= http.createServer(app)
const {Server} = require('socket.io');
const io=new Server(server,{
    cors:{
        origin:'*'
    }
})
global.io=io;

const {sequelize} = require('./models');
const e = require('express');
dotenv.config();

require('./jobs/busRemainder.js');
require('./jobs/flightreminderBooking.js');
require('./jobs/busexpireBooking.js');
require('./jobs/flightexpireBooking.js');
require('./jobs/DeleteUnVerifiedUser.js');



const startServer= async()=>{

    try{
        await sequelize.authenticate();
      
    console.log("Database synced successfully.");

        console.log("Connection has been established successfully.");

        
        io.on('connection',(socket)=>{
            console.log('a user connected',socket.id);
            
            socket.on('join',(userId)=>{
                socket.join(userId)
                console.log(`User ${userId} joined room`);
            })


            socket.on('disconnect',()=>{
                console.log('user disconnected',socket.id);
            }   )

        })


        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })



    }

    catch(error){
        console.error("Unable to connect to the database:", error);

    }




}

startServer();