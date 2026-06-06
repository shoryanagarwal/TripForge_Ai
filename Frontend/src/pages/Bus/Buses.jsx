import {useState} from 'react'
import api from '../../api/axios.js'
import { toast } from 'react-hot-toast'
import { Plane, Search } from "lucide-react";
import {useNavigate} from 'react-router-dom'




function Bus(){
    const navigate=useNavigate();

   const [query,setQuery]=useState({
        source:'',
        destination:'',
        date:''
   });


   const [buses,setBuses]=useState([]);

   const handleSearch=async(e)=>{
        e.preventDefault();


        try{
            const response = await api.get('/',{
                params:query
            })

            setBuses(response.data.data);
            toast.success("buses fetched successfully");

        }


        catch(error){
            console.log(error);
            toast.error(error.response.data.message || 'Something went wrong')
        }




   }
   



   return (
         <div className = 'min-h-screen bg-[#020617] text-white px-6 py-8'>
            <div className='max-w-6xl mx-auto'>
                <div className='mb-10'>
                    <h1 className='text-3xl font-bold flex items-center gap-3'>
                        <Plane className='text-blue-500' />
                        Search Buses
                    </h1>


                    <p className='text-slate-400 mt-2'> Find available Buses and choose the best one for your journey..

                    </p>
                </div>


                <form onSubmit={handleSearch}
                    className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-4 gap-4"
                >
                    <input
                        type="text"
                        placeholder="Source"
                        value={query.source}
                        onChange={(e)=>setQuery({
                            ...query,
                            source:e.target.value
                        })}
                        className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 outline-none text-sm"
                        
                    
                    ></input>

                    <input
                        type="text"
                        placeholder="destination"
                        value={query.destination}
                        onChange={(e)=>setQuery({
                            ...query,
                            destination:e.target.value
                        })}
                        className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 outline-none text-sm"
                        
                    
                    ></input>



                    <input
                        type="text"
                        placeholder="YYYY-MM-DD"
                        value={query.date}
                        onChange={(e) =>
                        setQuery({ ...query, date: e.target.value })
                        }
                        className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 outline-none text-sm"
                    />


                    <button type='Submit'
                             className="bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center gap-2 font-semibold"
                    >
                        <Search size={18} />
                        Search
                    </button>





                </form>



                 <div className="mt-10 space-y-5">
          {buses.map((bus) => (
            <div
              key={bus.id}
              className="bg-[#0f172a] border border-slate-300 rounded-2xl p-6 flex flex-row md:flex-row md:items-center md:justify-between gap-4"
            >
                <div>
                <div>
                    <h2 className="text-xl font-semibold">
                        {bus.busNumber}
                    </h2>
                     <p className="text-slate-400 mt-1">
                  {bus.operatorName} • {bus.busType}
                </p>
                <p className="text-slate-400 mt-1">
                    {bus.source} → {bus.destination}
                </p>
                    <p className="text-slate-500 text-sm mt-2">
                    Duration: {bus.duration} mins
                </p>
              </div>

              <div className="text-slate-300">
                <p>Departure: {new Date(bus.departureTime).toLocaleString()}</p>
                <p>Arrival: {new Date(bus.arrivalTime).toLocaleString()}</p>
              </div>
              </div>


                <div className="ml-60">
              <div className="text-right">
                <p className="text-xl font-bold text-blue-500">
                  ₹{bus.price}
                </p>
                <p className="text-slate-500 text-sm">
                  Seats: {bus.availableSeats}
                </p>
 
                <button className="mt-3 bg-blue-600 hover:bg-blue-700 rounded-xl px-5 py-2 font-semibold"
                    onClick={()=>{
                        navigate(`/Flight/${flight.id}/book`,{
                            state:{                 // Pass the entire flight object as state to the booking page
                                flight 
                            }
                        })
                    }}
                >
                  Book Now
                </button>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Bus;