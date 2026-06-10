const {Notification} = require('../models')


class NotificationRepository{


    async createNotification(data){
        try{

            const response= await Notification.create(data);
            return response;


        }
        catch(error){
            console.log("Error creating notification",error);
            throw error
        }

            
    }



    async getNotificationByUserId(userId){
        try{
            const response=await Notification.findAll({
                where:{
                    userId:userId

                },
                order:[['createdAt','DESC']] // Latest notifications first
            })

            console.log("Notifications fetched for user in repository layer",userId,response);

            return response;

        }
        catch(error){
            console.log("Error fetching notifications",error);
            throw error
        }

    }



    async getNotificationById(notificationId){

        try{

            const response = await Notification.findOne({
                where:{
                    id:notificationId
                }

            })

            return response;

        }

        catch(error){
            console.log("Error fetching notification by id",error);
            throw error
        }

    }


    async updateNotification(data){
        return await data.save();
    }





}


module.exports = NotificationRepository