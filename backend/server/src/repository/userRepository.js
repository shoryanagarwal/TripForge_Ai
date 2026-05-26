const {User} =require('../models')



class UserRepository{


    async createUser(data){
        try{
            const user=await User.create(data);
            return user;
        }
        catch(error){
            console.log("Error in creating user in repository",error);
            throw error;
        }
    }




    async findByEmail(email){

        try{


            const user=await User.findOne({where:{email:email}});


            return user;
        }
        catch(error){

                console.log("Error in finding user by email in repository",error);
            throw error;

        }

    }


    async findById(id){
        try{
            const user=await User.findByPk(id);
            return user;

        }
        catch(error){
            console.log("Error in finding user by id in repository",error);
            throw error;
        }
    }




}



module.exports=UserRepository;