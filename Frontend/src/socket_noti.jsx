import React, { useEffect } from 'react';
import socket from './Socket.js';
import {toast} from 'react-hot-toast';

function SocketNotification(){
useEffect(()=>{
    const user= JSON.parse(localStorage.getItem('user'));




    socket.on('connect',()=>{
        console.log("Socket connected with id:", socket.id);


        if(user?.id){
            socket.emit('join',user.id);
            console.log("Joining room:", user.id);
        }






    })



    socket.on('notification',(notification)=>{
        console.log("Received notification:",notification);
        // toast.success(notification.message || "You have a new notification")
    
    })




    return ()=>{
        socket.off('notification');
        socket.off('connect');
    }

},[])



return null;
}



export default SocketNotification;