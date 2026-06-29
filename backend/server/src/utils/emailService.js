const dotenv=require('dotenv')
dotenv.config();


const nodemailer=require('nodemailer')

const transporter=nodemailer.createTransport({
     host:process.env.EMAIL_HOST,
     port:Number(process.env.EMAIL_PORT),
     secure:false,
     auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASSWORD
     }
    
})

transporter.verify((error, success) => {
    if (error) {
        console.log("SMTP Verify Error:", error);
    } else {
        console.log("SMTP Server is ready");
    }
});

const sendEmail=async({to,subject,text,html,attachments})=>{
    try{
        const response=await transporter.sendMail({
        from: process.env.EMAIL_FROM,
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