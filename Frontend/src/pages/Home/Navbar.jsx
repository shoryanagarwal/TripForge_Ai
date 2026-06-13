import {Plane,UserCircle,Bell,ChevronDown} from 'lucide-react';
import {useNavigate} from 'react-router-dom'
import api from '../../api/axios.js'
import { useState,useEffect } from 'react';
import socket from '../../Socket.js'


function Navbar(){

    const [notifications,setNotifications]=useState([]);
    const navigate=useNavigate();



    


    useEffect(()=>{


        

          const fetchNotification=async()=>{

                try{
                    const user= JSON.parse(localStorage.getItem('user'));

                    if (!user?.id) {
                        console.log("User id not found in localStorage");
                        return;
                    }
                    const response =await api.get(`/users/${user.id}/notifications`);

                    setNotifications(response.data.data)

                }
                catch(error){
                    console.error('Error fetching notifications:', error);

                }

          }


          fetchNotification();


         
    },[])
     const unreadCount=notifications.filter(noti=>!noti.isRead).length;


    return(
        <nav className="border-b border-slate-800 bg-[#0f172a]">

                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    
                    <div className="flex items-center gap-3">
                         <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center">
                            <Plane size={20} />
                        </div>

                        <div className="flex items-center gap-1">    
                        <h1 className="text-xl font-bold text-white">TripForge</h1>
                        <h1 className="text-xl font-bold text-cyan-300 ">AI</h1>
                        </div>

                    </div>


                    <div className="flex items-center gap-6">
                        <div className=" relative flex items-center gap-1 cursor-pointer" onClick={()=>navigate('/notifications')}>
                        <Bell size={22} className=" cursor-pointer"/>
                        
                        {unreadCount>0 &&(
                            <span  className="absolute -top-2 -right-2 h-5 min-w-5 px-1 rounded-full bg-red-500 text-white text-[11px] flex items-center justify-center font-bold">
                                {unreadCount}
                            </span>
                        )}

                        </div>

                        <div className="flex items-center gap-2 cursor-pointer">
                        <button onClick={()=>navigate('/profile')}>
                        <UserCircle size={22} className="cursor-pointer"/>
                        </button>
                        <h3 className='text-sm font-semibold'>Hi Traveller</h3>
                            <ChevronDown size={16} className="text-slate-400"/>
                        </div>
                    </div>

                </div>








        </nav>



    )











}



export default Navbar;