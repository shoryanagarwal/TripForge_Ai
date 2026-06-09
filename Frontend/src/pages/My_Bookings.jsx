import {useState, useEffect} from 'react';
import api from '../api/axios.js'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


function MyBookings(){


    const navigate=useNavigate();

    const [bookings,setBookings]=useState([]);

    useEffect(()=>{

            const flightFetchBookings=async()=>{

                try{

                    const response =await api.get('/mybookings');

                    //remove cancelled bookings from the list
                    const activeBooking=response.data.data.filter(booking=> booking.status !=='cancelled')



                    setBookings((prev) => [
                      ...prev,
                      ...activeBooking.map((booking) => ({
                        ...booking,
                        type: "flight",
                      })),
                    ]);
                    toast.success("Bookings fetched successfully")

                }
                catch(error){
                    console.log("Error in fetching bookings",error)
                    toast.error(error.response.data.message || 'Something went wrong')
                }



            }


            flightFetchBookings();



    },[])


    //bus bookings
    useEffect(()=>{

        const busFetchBookings=async()=>{
        
            try{

              const response= await api.get('/mybusbookings');
              const activeBookings=response.data.data.filter(booking=> booking.status !=='cancelled')
               setBookings((prev) => [
                ...prev,
                ...activeBookings.map((booking) => ({
                  ...booking,
                  type: "bus",
                })),
              ]);
              toast.success("Bus bookings fetched successfully")

            }
            catch(error){
              console.log("Error in fetching bus bookings",error)
              toast.error(error.response.data.message || 'Something went wrong')
            }


        }

        busFetchBookings();



    },[])


    //remopve the booking from the list after cancellation
    

     return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold">My Bookings</h1>

        <div className="mt-8 space-y-5">
          {bookings.map((booking) => (
            
           <div
            key={booking.id}
            className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 flex justify-between items-center"
            >
            <div>
                <h2 className="text-xl font-semibold">
                {booking.flight?.flightNumber || booking.bus?.busNumber}
                </h2>

                <p className="text-slate-400 mt-1">
                {booking.flight ? `${booking.flight.source} → ${booking.flight.destination}` : `${booking.bus.source} → ${booking.bus.destination}`}
                </p>

                <p className="mt-3">Seats: {booking.seats}</p>
                <p>Status: {booking.status}</p>
                <p>Total: ₹{booking.totalAmount}</p>
            </div>

            <button 
              onClick={()=>{
                if(booking.type === 'flight'){
                    navigate(`/booking/${booking.id}`,{state:{booking}})
                }
                else if(booking.type === 'bus'){
                    navigate(`/busbooking/${booking.id}`,{state:{busbooking:booking}})
                }
              }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl">
                View Details
            </button>
            </div>
                    

            
          ))}
        </div>
      </div>
    </div>
  );
}









export default MyBookings;