import { useState } from "react";
import {useLocation,useNavigate} from 'react-router-dom'
import {Bus,Plus,User,Calendar,VenusAndMars,CheckCircle} from 'lucide-react'
import { useEffect } from "react";
import api from "../../api/axios.js";


import toast from 'react-hot-toast'


function BusBooking(){


    const location =useLocation();
    const navigate=useNavigate();
    const bus=location.state?.bus

    
    //calculate duration in hors and minutes
    const durationInMinutes=(new Date(bus.arrivalTime)- new Date(bus.departureTime))/60000;

    const duration=`${Math.floor(durationInMinutes/60)}h ${Math.floor(durationInMinutes%60)}m`
    useEffect(()=>{
        if(!bus){
            toast.error('No bus data found. Please select a bus first.');
            navigate('/buses');
            return;
        }

        
    },[]);


    const [currentPassenger,setCurrentPassenger]=useState({
        name:'',
        age:'',
        gender:''
    });

    const [passengers,setPassengers]=useState([]);


    if(!bus){
        return (
             <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
            <p>No bus selected.</p>
            </div>
        )
    }

    const handleAddPassenger=()=>{
        if(!currentPassenger.name || !currentPassenger.age || !currentPassenger.gender){
            toast.error('Please fill in all passenger details.');
            return;
        }


        if(passengers.length >= bus.availableSeats){
            toast.error('Cannot add more passengers than available seats.');
            return;
        }

        setPassengers([...passengers,
            currentPassenger
        ])


        setCurrentPassenger({
            name:'',
            age:'',
            gender:''
        })


    }



    const ContinueHandler=()=>{
        if(passengers.length===0){
            toast.error('Please add at least one passenger to continue.');
            return;
        }

       

        const baseAmount=passengers.length * bus.price;
        const totalAmount= baseAmount + Math.round(0.18 * baseAmount);

       

        

        navigate('/buspayment',{
            state:{
                bus,
                passengers,
                
                totalAmount,
            }
        })

    }

    
    return (
  <div className="min-h-screen bg-[#020617] text-white px-6 py-8">
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold flex items-center gap-3">
        <Bus size={28} className="text-blue-600" />
        Bus Booking
      </h1>

      <div className="mt-6 bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
        <h2 className="text-2xl font-semibold">{bus.busNumber}</h2>
        <p className="text-slate-400 mt-2">
          {bus.source} → {bus.destination}
        </p>

        <p className="mt-4 text-blue-500 text-2xl font-bold">
          ₹{bus.price} / passenger
        </p>

        <p className="flex items-center gap-4 mt-4 text-slate-400">
          <span>
            <p>{new Date(bus.departureTime).toLocaleString()} ----   {duration}   ------
            {new Date(bus.arrivalTime).toLocaleString()}
            </p>
            </span>
        </p>

        <p className="text-slate-400 mt-2 ">
          {bus.availableSeats} seats left
        </p>
      </div>

      <div className="mt-4 bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-5">Passenger Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Passenger name"
            value={currentPassenger.name}
            onChange={(e) =>
              setCurrentPassenger({
                ...currentPassenger,
                name: e.target.value,
              })
            }
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 outline-none text-white"
          />

          <input
            type="number"
            placeholder="Age"
            value={currentPassenger.age}
            onChange={(e) =>
              setCurrentPassenger({
                ...currentPassenger,
                age: e.target.value,
              })
            }
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 outline-none text-white"
          />

          <select
            value={currentPassenger.gender}
            onChange={(e) =>
              setCurrentPassenger({
                ...currentPassenger,
                gender: e.target.value,
              })
            }
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 outline-none text-white"
          >
            <option value="" className="bg-slate-950 ">
              Gender
            </option>
            <option value="Male" className="bg-slate-950">
              Male
            </option>
            <option value="Female" className="bg-slate-950">
              Female
            </option>
          </select>

          <button
            onClick={handleAddPassenger}
            className="bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center gap-2 font-semibold"
          >
            <Plus size={18} />
            Add
          </button>
        </div>
      </div>

      {passengers.length > 0 && (
        <div className="mt-4 bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Added Passengers</h2>

          <div className="space-y-3">
            {passengers.map((p, index) => (
              <div
                key={index}
                className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 flex justify-between text-sm"
              >
                <span>
                  {index + 1}. {p.name}
                </span>
                <span className="text-slate-400">
                  {p.age} yrs | {p.gender}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      

      {passengers.length > 0  && (
        <div className="mt-6 bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between text-slate-400">
            <p>Base Fare</p>
            <p>₹{passengers.length * bus.price}</p>
          </div>

          

          <div className="flex justify-between text-slate-400 mt-2">
            <p>Tax and additional charges</p>
            <p>₹{Math.round(0.18 * (passengers.length * bus.price ))}</p>
          </div>

          <div className="border-t border-slate-800 mt-4 pt-4 flex justify-between">
            <p className="font-semibold">Total Amount</p>
            <p className="text-blue-500 font-bold">
              ₹
              {passengers.length * bus.price +
                +
                Math.round(0.18 * (passengers.length * bus.price  ))}
            </p>
          </div>
        </div>
      )}

      <button
        onClick={ContinueHandler}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-3 font-semibold"
      >
        Continue
      </button>
    </div>
  </div>
);








}


export default BusBooking;