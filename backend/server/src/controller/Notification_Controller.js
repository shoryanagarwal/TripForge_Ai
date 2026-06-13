const NotificationService=require('../service/Notification_Service')


const notificationService=new NotificationService();



class NotificationController{

    async create(req,res){
        try{
            const response =await notificationService.createNotification(req.body)
            res.status(201).json({
                success:true,
                message:"Notification created successfully",
                data:response
            })
        
        }

        
        catch(error){
            console.log("Error in controller layer while creating notification",error);
            res.status(500).json({
                success:false,
                message:"Error creating notification",
                error:error.message
            })
        }
    }



    async getNotificationsByUserId(req,res){
        try{
            const userId=req.params.id;
            const response=await notificationService.getNotificationsByUserId(userId);
            res.status(200).json({
                success:true,
                message:"Notifications fetched successfully",
                data:response
            })

        }
        catch(error){
            console.log("Error in controller layer while fetching notifications",error);
            res.status(500).json({
                success:false,
                message:"Error fetching notifications",
                error:error.message
            })
        }

    }


    async getNotificationById(req,res){
        try{

            const notifiactionId=req.params.id;
            const response=await notificationService.getNotificationById(notifiactionId);
            res.status(200).json({
                success:true,
                message:"Notification fetched successfully",
                data:response
            })

        }
        catch(error){
            console.log("Error in controller layer while fetching notification by id",error);
            res.status(500).json({
                success:false,
                message:"Error fetching notification",
                error:error.message
            })
        }
    }


    async updateNotification(req,res){
        try{
            const notificationId=req.params.id;
            const response=await notificationService.updateNotification(notificationId);
            res.status(200).json({
                success:true,
                message:"Notification updated successfully",
                data:response
            })
        }
        catch(error){
            console.log("Error in controller layer while updating notification",error);
            res.status(500).json({
                success:false,
                message:"Error updating notification",
                error:error.message
            })
        }
    }


}



module.exports=NotificationController;