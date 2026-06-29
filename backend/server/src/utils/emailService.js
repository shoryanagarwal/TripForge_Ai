const dotenv=require('dotenv')
dotenv.config();


const nodemailer=require('nodemailer')

const transporter=nodemailer.createTransport({
    service:"gmail",
     connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASSWORD
    }
})

const sendEmail=async({to,subject,text,html,attachments})=>{
    try{
        const response=await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        html,
        attachments
    }
);

    return response;

}

    catch(error){
        console.error("Error sending email:", error);
        throw error;
    }
}


module.exports=sendEmail;