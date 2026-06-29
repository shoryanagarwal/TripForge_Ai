import api from '../../api/axios.js'
import { useState,useEffect } from 'react';
import { UserCircle, Mail, Shield, Ticket, LogOut} from 'lucide-react'
import { useNavigate } from 'react-router-dom';

function Profile(){

    const navigate =useNavigate();
    const [user,setUser]=useState(null);
    const [flightBookings,setFlightBookings]=useState([]);
    const [busBookings,setBusBookings]=useState([]);


    useEffect(()=>{

        const fetchUserData=async()=>{

            try{
                const response = await api.get('/profile');
                setUser(response.data.data.user);




            }
            catch(error){
                    console.error('Error fetching user data:', error);

            }


        }


        const fetchBookings=async()=>{
            try{
                const flight=await api.get('/mybookings')
                const bus=await api.get('/mybusbookings');


                const confirmFlightBooking=flight.data.data.filter(booking=>booking.status==='confirmed');
                const confirmBusBooking=bus.data.data.filter(booking=>booking.status==='confirmed');

                setFlightBookings(confirmFlightBooking);
                setBusBookings(confirmBusBooking);

            }
            catch(error){
                console.error('Error fetching flight bookings:', error);
            }
        }

        fetchUserData();
        fetchBookings();

       

    },[])

     const handleLogout=()=>{
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/');
        }


      if (!user) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        Loading profile...
      </div>
    );
  }



  return(
     <div className="min-h-screen bg-[#020617] text-white px-6 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-8">
          <div className="flex items-center gap-5">
            <div className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center">
              <UserCircle size={48} />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {user.name || "TripForge User"}
              </h2>
              <p className="text-slate-400 mt-1">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
              <Mail className="text-blue-500 mb-3" />
              <p className="text-slate-400 text-sm">Email</p>
              <p className="font-semibold mt-1">{user.email}</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
              <Shield className="text-green-500 mb-3" />
              <p className="text-slate-400 text-sm">Role</p>
              <p className="font-semibold mt-1">{user.role}</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
              <Ticket className="text-purple-500 mb-3" />
              <p className="text-slate-400 text-sm">Total Bookings</p>
              <p className="font-semibold mt-1">
                {flightBookings.length + busBookings.length}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
              <p className="text-slate-400 text-sm">Flight Bookings</p>
              <p className="text-3xl font-bold text-blue-500 mt-2">
                {flightBookings.length}
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
              <p className="text-slate-400 text-sm">Bus Bookings</p>
              <p className="text-3xl font-bold text-green-500 mt-2">
                {busBookings.length}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-8 bg-red-600 hover:bg-red-700 rounded-xl px-6 py-3 font-semibold flex items-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  )


















 }





export default Profile;