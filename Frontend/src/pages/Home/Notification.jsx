import { useState } from 'react';
import { useEffect } from 'react';
import api from '../../api/axios.js';
import { toast } from 'react-hot-toast';
import { Bell, Circle, CheckCircle } from 'lucide-react';




function Notification(){

    
    const [notifications,setNotifications]=useState([])


    useEffect(()=>{
        const fetchNotifications=async()=>{
            try{
                
                const user=JSON.parse(localStorage.getItem('user'));


                const response=await api.get(`/users/${user.id}/notifications`);
                setNotifications(response.data.data);


            }
            catch(error){
                console.log("Error fetching notifications in navbar",error);
                toast.error("Error fetching notifications")

            }
        }
            fetchNotifications();
    },[])


    
    const handleAsRead=async(id)=>{
        try{
            const response =await api.patch(`/notifications/${id}/read`)
            setNotifications((prev)=> prev.map(noti=> noti.id===id ? {...noti,isRead:true}:noti));
            

        }
        catch(error){
            console.log("Error marking notification as read",error);
            toast.error("Error marking notification as read")

        }
    }

        const unreadCount= notifications.filter(noti=>!noti.isRead).length;







    return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center">
              <Bell size={24} />
            </div>

            <div>
              <h1 className="text-3xl font-bold">Notifications</h1>
              <p className="text-slate-400 text-sm mt-1">
                You have {unreadCount} unread notification
                {unreadCount !== 1 ? "s" : ""}.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-8 text-center">
              <p className="text-slate-400">No notifications yet.</p>
            </div>
          ) : (
            notifications.map((noti) => (
              <div
                key={noti.id}
                onClick={() => handleAsRead(noti.id)}
                className={`bg-[#0f172a] border rounded-2xl p-5 cursor-pointer transition hover:bg-slate-800/70 ${
                  !noti.isRead
                    ? "border-cyan-500/40"
                    : "border-slate-800"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`mt-1 ${
                      !noti.isRead ? "text-cyan-400" : "text-slate-500"
                    }`}
                  >
                    {!noti.isRead ? (
                      <Circle size={14} fill="currentColor" />
                    ) : (
                      <CheckCircle size={18} />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <h2 className="font-semibold text-lg">{noti.title}</h2>

                      {!noti.isRead && (
                        <span className="text-xs bg-cyan-500/10 text-cyan-300 px-3 py-1 rounded-full">
                          New
                        </span>
                      )}
                    </div>

                    <p className="text-slate-400 text-sm mt-2">
                      {noti.message}
                    </p>

                    <p className="text-slate-600 text-xs mt-3">
                      {new Date(noti.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );






}






export default Notification;