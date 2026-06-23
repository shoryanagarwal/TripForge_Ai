const dotenv=require('dotenv')
dotenv.config();
const {Resend}=require('resend')

const fs=require('fs')


const resend =new Resend(process.env.RESEND_API_KEY)



const sendEmail=async({to, subject, text, html, attachments})=>{

    try{
        const formattedAttachments=attachments?.map((file)=>({
        filename: file.filename,
        content: fs.readFileSync(file.path).toString("base64"),            
        }))

        const response=await resend.emails.send({
            from: process.env.EMAIL_FROM || "TripForge AI <onboarding@resend.dev>",
            to,
            subject,
            text,
            html,
            attachments: formattedAttachments,
        })


        return response;
    }
    catch(error){
        console.error('Error sending email:',error);
        throw new Error('Failed to send email');
    }


}




module.exports=sendEmail;