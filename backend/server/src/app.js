const express= require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');  
const cors = require('cors');

const ApiRoutes= require('./routes/index.js');

const app = express();


app.use(express.json()); // it acts same as body-parser
app.use(express.urlencoded({extended:true}));

app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.use('/api',ApiRoutes);


app.get("/",(req,res)=>{

    res.status(200).json({
        message:"Welcome to TripForge AI",
        success:true
    })
})


module.exports = app;