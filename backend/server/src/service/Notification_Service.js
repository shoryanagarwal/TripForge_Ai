const NotificationRepository=require('../repository/Notification_Repository.js')

const notificationRepository=new NotificationRepository();

class NotificationService{

    async createNotification(data){
        try{
            const response= await notificationRepository.createNotification(data);
            return response;

        }
        catch(error){
            console.log("Error in service layer while creating notification",error);
            throw error
        }
    }


    async getNotificationsByUserId(userId){
        try{
            const response= await notificationRepository.getNotificationByUserId(userId);
            console.log("Notifications fetched for user in service layer",userId,response);
            if(!response){
                throw new Error("No notifications found for this user")
            }
            
            

            return response;
        }
        catch(error){
            console.log("Error in service layer while fetching notifications",error);
            throw error
        }







   }




   async getNotificationById(notificationId){

        try{
            const response= await notificationRepository.getNotificationById(notificationId);
            if(!response){
                throw new Error("Notification not found")
            }
            return response;

        }

        catch(error){
            console.log("Error in service layer while fetching notification by id",error);
            throw error
        }
   }



   async updateNotification(notificationId){
        try{
            const response = await notificationRepository.getNotificationById(notificationId);

            response.isRead=true;
            const updatedNotification=await notificationRepository.updateNotification(response);
            return updatedNotification;

        }
        catch(error){
            console.log("Error in service layer while updating notification",error);
            throw error
        }
   }
}




module.exports=NotificationService;