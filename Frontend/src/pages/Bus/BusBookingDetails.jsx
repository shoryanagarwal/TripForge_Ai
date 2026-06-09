import React from 'react';
import { useState } from 'react';
import api from '../../api/axios.js'
import { toast } from 'react-hot-toast';
import{useNavigate,useLocation} from 'react-router-dom'
import { CheckCircle, Download, XCircle } from 'lucide-react';




function BusBookingDetails(){

    const navigate=useNavigate();
    const location=useLocation();

    const booking=location.state?.busbooking;
    console.log("Booking details:",booking);

    if(!booking){
        return (
            <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
                <h1 className='text-2xl'>No booking details found.</h1>
            </div>
        )
    }

    const handleDownload=()=>{
           window.print();
    }

    const handleCancel=async()=>{
        try{
            const response = await api.patch(`/busbookings/${booking.id}/cancel`)
            toast.success("Booking cancelled successfully");
            navigate('/my-bookings',{replace:true})
        }
        catch(error){
            console.log("Error in cancelling booking",error)
            toast.error(error.response.data.message || 'Something went wrong')
        }
    }




         return (
            <div className="min-h-screen bg-[#020617] text-white px-6 py-8">
            <div className="max-w-5xl mx-auto">
                <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-8 text-center">
                <CheckCircle className="text-green-500 mx-auto" size={48} />

                
                <h1 className="text-3xl font-bold mt-4">Trip Confirmed</h1>
               
                <p className="text-slate-400 mt-2">
                    Your booking has been successfully confirmed.
                </p>
               
                </div>

                <div className="mt-6 bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
               
                <h2 className="text-xl font-semibold mb-4">Bus Details</h2>

               
                <p className="text-2xl font-bold">{booking.bus?.busNumber}</p>
               
                <p className="text-slate-400 mt-1">
                    {booking.bus?.source} → {booking.bus?.destination}
                </p>

               
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5 text-sm text-slate-300">
               
                    <p>
                    Departure:{" "}
                    {new Date(booking.bus?.departureTime).toLocaleString()}
                    </p>
               
                    <p>
                    Arrival:{" "}
                    {new Date(booking.bus?.arrivalTime).toLocaleString()}
                    </p>
               
                    <p>Seats: {booking.seats}</p>
                </div>
                </div>

               
                <div className="mt-6 bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
               
                <h2 className="text-xl font-semibold mb-4">Passengers</h2>

                <div className="space-y-3">
               
                    {booking.passengerDetails?.map((p, index) => (
               
               <div
                        key={index}
                        className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 flex justify-between"
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

                <div className="mt-6 bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>

                <p>Status: {booking.status}</p>
                <p>Total Amount: ₹{booking.totalAmount}</p>
                <p>Booking ID: {booking.id}</p>
                </div>

                <div className="mt-6 flex gap-4">
                <button
                    onClick={handleDownload}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-xl py-3 font-semibold flex items-center justify-center gap-2"
                >
                    <Download size={18} />
                    Download Ticket
                </button>

                {booking.status !== "cancelled" && (
                    <button
                    onClick={handleCancel}
                    className="flex-1 bg-red-600 hover:bg-red-700 rounded-xl py-3 font-semibold flex items-center justify-center gap-2"
                    >
                    <XCircle size={18} />
                    Cancel Booking
                    </button>
                )}
                </div>
            </div>
            </div>
        );


}
export default BusBookingDetails;