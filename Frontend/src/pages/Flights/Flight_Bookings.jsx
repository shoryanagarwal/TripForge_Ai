import { useState } from "react";
import {useLocation,useNavigate} from 'react-router-dom'
import {Plane,Plus,User,Calendar,VenusAndMars,CheckCircle} from 'lucide-react'
import { useEffect } from "react";
import api from "../../api/axios.js";


import toast from 'react-hot-toast'


function FlightBooking(){


    const location =useLocation();
    const navigate=useNavigate();
    const flight=location.state?.flight

    const [packages,setPackages]=useState([]);
    const [selectedPackage,setSelectedPackage]=useState(null);
    //calculate duration in hors and minutes
    const durationInMinutes=(new Date(flight.arrivalTime)- new Date(flight.departureTime))/60000;

    const duration=`${Math.floor(durationInMinutes/60)}h ${Math.floor(durationInMinutes%60)}m`
    useEffect(()=>{
        if(!flight){
            toast.error('No flight data found. Please select a flight first.');
            navigate('/flights');
            return;
        }

        const fetchPackages=async()=>{

            try{
                const response=await api.get(`/flights/${flight.id}/fare-packages`);

                console.log("Fare packages for flight",flight.id,response.data.data);


                const packageData= Array.isArray(response.data.data)? response.data.data : Array


                setPackages(response.data.data);

                if(response.data.data.length>0){
                    setSelectedPackage(response.data.data[0]) //select the first package by default
                }

            }

            catch(error){

                toast.error('Failed to fetch fare packages. Please try again later.');
                console.error('Error fetching fare packages:', error);
            }


        }

        fetchPackages();

    },[]);


    const [currentPassenger,setCurrentPassenger]=useState({
        name:'',
        age:'',
        gender:''
    });

    const [passengers,setPassengers]=useState([]);


    if(!flight){
        return (
             <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
            <p>No flight selected.</p>
            </div>
        )
    }

    const handleAddPassenger=()=>{
        if(!currentPassenger.name || !currentPassenger.age || !currentPassenger.gender){
            toast.error('Please fill in all passenger details.');
            return;
        }


        if(passengers.length >= flight.availableSeats){
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



    const ContinueHandler=async()=>{
        if(passengers.length===0){
            toast.error('Please add at least one passenger to continue.');
            return;
        }

        if(!selectedPackage){
            toast.error('Please select a fare package to continue.');
            return;
        }

        const baseAmount=passengers.length * flight.price;

        const packageAmount= passengers.length * selectedPackage.price;
        const taxAmount= Math.round(0.18 * (baseAmount + packageAmount));

        const totalAmount=baseAmount + packageAmount+ taxAmount;

          const user=JSON.parse(localStorage.getItem('user'));
            const response= await api.post('/bookings',{
                userId:user.id,
                flightId:flight.id,
                seats:passengers.length,
                passengerDetails:passengers,
                totalAmount:totalAmount,
                status:'pending'
            })

            const booking =response.data.data

            



        navigate('/payment',{
            state:{
                flight,
                passengers,
                selectedPackage,
                totalAmount,
                booking
            }
        })

    }

    
    return (
  <div className="min-h-screen bg-[#020617] text-white px-6 py-8">
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold flex items-center gap-3">
        <Plane size={28} className="text-blue-600" />
        Flight Booking
      </h1>

      <div className="mt-6 bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
        <h2 className="text-2xl font-semibold">{flight.flightNumber}</h2>
        <p className="text-slate-400 mt-2">
          {flight.source} → {flight.destination}
        </p>

        <p className="mt-4 text-blue-500 text-2xl font-bold">
          ₹{flight.price} / passenger
        </p>

        <p className="flex items-center gap-4 mt-4 text-slate-400">
          <span>
            <p>{new Date(flight.departureTime).toLocaleString()} ----   {duration}   ------
            {new Date(flight.arrivalTime).toLocaleString()}
            </p>
            </span>
        </p>

        <p className="text-slate-400 mt-2">
          {flight.availableSeats} seats left
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

      <div className="mt-6 bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-5">Choose Fare Package</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg)}
              className={`border rounded-2xl p-5 cursor-pointer transition ${
                selectedPackage?.id === pkg.id
                  ? "border-blue-600 bg-blue-600/10"
                  : "border-slate-800 bg-slate-950 hover:border-slate-600"
              }`}
            >
              <div className="flex justify-between">
                <h3 className="font-semibold">{pkg.name}</h3>
                {selectedPackage?.id === pkg.id && (
                  <CheckCircle size={18} className="text-blue-500" />
                )}
              </div>

              <p className="text-blue-500 font-bold mt-2">
                + ₹{pkg.price} / passenger
              </p>

              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                {pkg.features?.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {passengers.length > 0 && selectedPackage && (
        <div className="mt-6 bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between text-slate-400">
            <p>Base Fare</p>
            <p>₹{passengers.length * flight.price}</p>
          </div>

          <div className="flex justify-between text-slate-400 mt-2">
            <p>Package Charges</p>
            <p>₹{passengers.length * selectedPackage.price}</p>
          </div>

          <div className="flex justify-between text-slate-400 mt-2">
            <p>Tax and additional charges</p>
            <p>₹{Math.round(0.18 * (passengers.length * flight.price + passengers.length * selectedPackage.price))}</p>
          </div>

          <div className="border-t border-slate-800 mt-4 pt-4 flex justify-between">
            <p className="font-semibold">Total Amount</p>
            <p className="text-blue-500 font-bold">
              ₹
              {passengers.length * flight.price +
                passengers.length * selectedPackage.price +
                Math.round(0.18 * (passengers.length * flight.price + passengers.length * selectedPackage.price))}
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


export default FlightBooking;