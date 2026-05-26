const dotenv=require('dotenv')

const sequelize = require('./config/database.js');
dotenv.config();


const app = require("./app");

const PORT = process.env.PORT || 3000;

const startServer= async()=>{

    try{
        await sequelize.authenticate();

        console.log("Connection has been established successfully.");

        
        app.listen(PORT,()=>{
            console.log(`Server is running on port ${PORT}`);
            
        })




    }

    catch(error){
        console.error("Unable to connect to the database:", error);

    }




}

startServer();