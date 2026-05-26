const bcrypt=require('bcrypt');


const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const UserRepository = require('../repository/userRepository.js')


const userRepository = new UserRepository();


class Authenticate{


    async signUp(data){

        try{

            const existingUser=await userRepository.findByEmail(data.email);

            if(existingUser){
                throw new Error("User already exists with this email");
            }

            const hashedPassword=bcrypt.hashSync(data.password,10)

            const user=await userRepository.createUser({
                ...data,
                password:hashedPassword
            })


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

           const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                },
                    process.env.JWT_SECRET_KEY,
                {
                    expiresIn: "1h",
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





}


module.exports=Authenticate;