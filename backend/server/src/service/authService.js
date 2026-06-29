const bcrypt=require('bcrypt');


const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const UserRepository = require('../repository/userRepository.js');
const sendEmail= require('../utils/emailService.js');

const userRepository = new UserRepository();
const { User } = require('../models/index.js');



const generateOtp=()=>{
    return Math.floor(100000 + Math.random() * 900000).toString();
}


class Authenticate{


    async signUp(data){

        try{

          let user=await userRepository.findByEmail(data.email);

          if(user){
             if(user.isVerified){
                throw new Error("User already exists with this email. Please login.");
             }

             const otp=generateOtp();
                const hashOtp=bcrypt.hashSync(otp,10);
                user.otp=hashOtp;
                user.otp_expiry=new Date(Date.now() + 10 * 60 * 1000);
                await user.save();


                try{
                    await sendEmail({
                        to: user.email,
                    subject: "TripForge AI - Verify Your Email",
                    html: `
                        <h2>Email Verification</h2>
                        <p>Hi ${user.name},</p>
                        <p>Your OTP is:</p>
                        <h1>${otp}</h1>
                        <p>This OTP is valid for 10 minutes.</p>
                    `,
                });
                }
                catch(error){
                    console.log("Error sending email in service",error);
                    throw new Error("Error sending email. Please try again later.");

                }

                return user;
          }


          const hashedPassword=bcrypt.hashSync(data.password,10);
          const otp=generateOtp();
          const hashOtp=bcrypt.hashSync(otp,10);
          const otpExpiry=new Date(Date.now() + 10 * 60 * 1000);
           user = await userRepository.createUser({
            ...data,
            password: hashedPassword,
            otp: hashedOtp,
            otp_expiry: otpExpiry,
            isVerified: false
        });

        try{
            await sendEmail({
                to: user.email,
                subject: "TripForge AI - Verify Your Email",
                html: `
                    <h2>Email Verification</h2>
                    <p>Hi ${user.name},</p>
                    <p>Your OTP is:</p>
                    <h1>${otp}</h1>
                    <p>This OTP is valid for 10 minutes.</p>
                `,
            });
        }
        catch(error){
            console.log("Error sending email in service",error);
            throw new Error("Error sending email. Please try again later.");
        }

        return user;

        }
        catch(error){
            console.log("Error in sign up in service",error);
            throw error;
        }


    }




    async login(data){


        try{

            const user=await userRepository.findByEmail(data.email);

            if(!user){
                throw new Error("No user found with this email");
            }

            const ispasswordValid=bcrypt.compareSync(data.password,user.password)


            if(!ispasswordValid){
                throw new Error("Invalid password");
            }


            if(!user.isVerified){
                throw new Error("Email not verified. Please verify your email before logging in.");
            }

           const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                },
                    process.env.JWT_SECRET_KEY,
                {
                    expiresIn: "7h",
                }
            );

            return{
                token:token,
                user:{
                    id:user.id,
                    email:user.email,
                    role:user.role,
                    name:user.name
                }

            }
        
        }



        catch(error){
            console.log("Error in login in service",error);
            throw error;
        }



    }



    async verifyEmail(data){

        try{

            const user = await userRepository.findByEmail(data.email);
            if(!user){
                throw new Error("No user found with this email");
            }
            if(user.isVerified){
                throw new Error("Email is already verified");
            }


          const isOtpValid=bcrypt.compareSync(data.otp,user.otp);


          if(!isOtpValid){
            throw new Error("Invalid OTP. Please check the OTP sent to your email.");
          }

            if(new Date() > new Date(user.otp_expiry)){
                throw new Error("OTP has expired. Please request a new one.");
            }

            user.isVerified=true;
            user.otp=null;
            user.otp_expiry=null;

            await user.save();
            return user;


        }
        catch(error){

            console.log("Error in email verification in service",error);
            throw error;



        }



    }



    async resendOtp(data){

        try{
            const user= await userRepository.findByEmail(data.email);

            if(!user){
                throw new error("user validation failed retry sign up")
            }

            if(user.isVerified){
                throw new error("user already verified");
            }

            const otp=generateOtp();
            const hashOtp=bcrypt.hashSync(otp,10);


            user.otp=hashOtp
            user.otp_expiry=new Date(Date.now() + 10 * 60 * 1000);

            await user.save();


           await sendEmail({
            to: user.email,
            subject: "TripForge AI - New OTP",
            html: `
                <h2>Email Verification</h2>
                <p>Your new OTP is:</p>
                <h1>${otp}</h1>
                <p>Valid for 10 minutes.</p>
            `
        });

        return {
            message:"otp send successfully"
        }


        }

        catch(error){
             console.log(error);
             throw error;
             

        }



    }


    async forgotPassword(data){

        try{

            const {email}=data;
             
            const user=await User.findOne({where:{email:email}});

            if(!user){
                throw new Error("No user found with this email");

            }

            const otp=generateOtp();

            user.resetOtp=bcrypt.hashSync(otp,10);
            user.resetOtpExpiry=new Date(Date.now()+10*60*1000);

            await user.save();

            await sendEmail({
                to: email,
                subject: "TripForge AI - Reset Password OTP",
                 html: `
                <h2>Password Reset Request</h2>
                <p>Hi ${user.name},</p>
                <p>Your password reset OTP is:</p>
                <h1>${otp}</h1>
                <p>This OTP is valid for 10 minutes.</p>
                <p>If you did not request this, please ignore this email.</p>
            `
        
            })

            return true;

        }
        catch(error){
            throw error;
            console.log("Error in forgot password in service",error);

        }



    }


    async resetPassword(data){
        try{
            const {email,otp,newPassword}=data;
            const user=await User.findOne({where:{email:email}});

            if(!user){
                throw new Error("No user found with this email");
            }

            if(!user.resetOtp || !user.resetOtpExpiry){
                throw new Error("No password reset request found for this email");
            }

            console.log("Received OTP:", otp);
            console.log("is otp coorect",bcrypt.compareSync(otp,user.resetOtp)); 

            if(!bcrypt.compareSync(otp,user.resetOtp)){
                throw new Error("Invalid OTP. Please check the OTP sent to your email.");
            }
            if(new Date()>new Date(user.resetOtpExpiry)){
                throw new Error("OTP has expired. Please request a new password reset.");
            }

            const hashedpassword=bcrypt.hashSync(newPassword,10);
            const password=hashedpassword;
            user.password=password;
            user.resetOtp=null;
            user.resetOtpExpiry=null;
            await user.save();

            return true;

        }
        catch(error){
            console.log("Error in reset password in service",error);
            throw error;
        }


    }



}


module.exports=Authenticate;