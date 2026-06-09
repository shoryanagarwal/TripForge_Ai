import {useLocation,useNavigate} from 'react-router-dom'
import {useState} from 'react'
import api from '../../api/axios.js'
import { toast } from 'react-hot-toast'


function BusPayment(){

    const location =useLocation();
    const navigate=useNavigate();

    const {bus,passengers,totalAmount}= location.state || {}

    const [coupon,setCoupon]=useState('');
    const [discount,setDiscount]=useState(0);
    const [paymentMode,setPaymentMode]=useState('UPI');
    const [loading,setLoading]=useState(false);



    if(!bus || !passengers || !totalAmount){
        return (
            <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
                <p>No booking details found.</p>
            </div>
        );
    }

    const applyCoupon=async()=>{

        try{
            if(coupon=='TRIP50'){
                setDiscount(50);
                toast.success('Coupon applied successfully! ₹50 discount added.')
            }
            else if(coupon=='TRIP100'){
                setDiscount(100);
                toast.success('Coupon applied successfully! ₹100 discount added.')
            }
            else if(coupon=='SAVE10'){
                const discountAmount = Math.round(0.1 * baseAmount);
                setDiscount(discountAmount);
                toast.success(`Coupon applied successfully! ₹${discountAmount} discount added.`)
            }
            else{
                setDiscount(0);
                toast.error('Invalid coupon code')
            }


            const finalAmount=totalAmount-discount;







        }

        catch(error){
            console.log(error);
            toast.error(error.response.data.message || 'Invalid coupon code')
        }



    }



    const handlePayment=async()=>{
        if(loading){
            return;
        }

        setLoading(true);
        try{
            const user=JSON.parse(localStorage.getItem('user'));
            const response= await api.post('/busbookings',{
                userId:user.id,
                busId:bus.id,
                seats:passengers.length,
                passengerDetails:passengers,
                totalAmount:finalAmount,
            })

            console.log("Booking response",response.data);
            const bookingId=response.data.data.id;
            await api.post('/buspayments',{
                busBookingId:bookingId,
                paymentMode,
            })
            toast.success('Payment successful! Your bus has been booked.')
            navigate('/my-bookings');
        }

        catch(error){
            console.log(error);
            toast.error(error.response.data.message || 'Payment failed. Please try again.')


        }
        finally{
            setLoading(false);
        }


    }

    const baseFare=bus.price * passengers.length;
    const tax=Math.round(0.18 * (baseFare ));
    const finalAmount=baseFare  - discount + tax;
    





    return(
        <div className="min-h-screen bg-[#020617] text-white px-6 py-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-2">Review And Payment</h1>
                <p className='text-slate-400 mb-8'>
                    Review your journey details before confirming payment
                </p>


                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    <div className='lg:col-span-2 space-y-6'>
                    <div className='bg-[#0f172a] border border-slate-800 rounded-2xl p-6'>

                        <h2 className='text-xl font-semibold mb-4'>Bus Summary</h2>

                        <div className='flex justify-between'>
                            <div>
                                <p className='text-2xl font-bold'>{bus.busNumber}</p>
                                <p className='text-slate-400 mt-1'>{bus.source} → {bus.destination}</p>
                            </div>


                            <p className="text-blue-500  font-bold text-xl">
                             ₹{bus.price}
                            </p> 

                        </div>

                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5 text-sm text-slate-300">
                            <p>Departure: {new Date(bus.departureTime).toLocaleString()}</p>
                            <p>Arrival: {new Date(bus.arrivalTime).toLocaleString()}</p>
                            <p>Duration: {bus.duration} mins</p>
                        </div>

                    </div>
                     
                     <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
                        <h2 className="text-xl font-semibold mb-4">Passengers</h2>

                        <div className='space-y-3'>
                            {passengers.map((p,index)=>(
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


                      

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
                        <h2 className="text-xl font-semibold mb-4">Baggage Policy</h2>
                        <p className="text-slate-400 text-sm">Carry baggage: 7 kg</p>
                        <p className="text-slate-400 text-sm mt-2">
                             baggage Allowed: 15 kg
                        </p>
                        
                        </div>

                        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Cancellation Policy
                        </h2>
                        <p className="text-slate-400 text-sm">
                            80% refund before 24 hours.
                        </p>
                        <p className="text-slate-400 text-sm mt-2">
                            Charges applicable within 24 hours.
                        </p>
                        <p className="text-slate-400 text-sm mt-2">
                            No-show is non-refundable.
                        </p>
                        </div>
                    </div>


                    </div>

                    




                <div className="space-y-6">
                        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sticky top-6">
                            <h2 className="text-xl font-semibold mb-4">Fare Summary</h2>

                            <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-slate-400">
                                <span>Base Fare</span>
                                <span>₹{baseFare}</span>
                            </div>

                            

                            <div className="flex justify-between text-slate-400">
                                <span>Discount</span>
                                <span>- ₹{discount}</span>
                            </div>

                            <div className="border-t border-slate-800 pt-4 flex justify-between font-semibold">
                                <span>Total</span>
                                <span className="text-blue-500 text-xl">₹{finalAmount}</span>
                            </div>
                            </div>

                            <div className="mt-6">
                            <label className="text-sm text-slate-300">Coupon</label>
                            <div className="flex gap-2 mt-2">
                                <input
                                type="text"
                                placeholder="TRIP50"
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 outline-none text-sm text-white"
                                />
                                <button
                                onClick={applyCoupon}
                                className="bg-blue-600 hover:bg-blue-700 rounded-xl px-4 font-semibold"
                                >
                                Apply
                                </button>
                            </div>
                            </div>

                            <div className="mt-6">
                            <label className="text-sm text-slate-300">Payment Mode</label>

                            <select
                                value={paymentMode}
                                onChange={(e) => setPaymentMode(e.target.value)}
                                className="mt-2 w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 outline-none text-white"
                            >
                                <option value="UPI" className="bg-slate-950">
                                UPI
                                </option>
                                <option value="CARD" className="bg-slate-950">
                                Credit / Debit Card
                                </option>
                                <option value="NET_BANKING" className="bg-slate-950">
                                Net Banking
                                </option>
                                <option value="WALLET" className="bg-slate-950">
                                Wallet
                                </option>
                            </select>
                            </div>

                            <button
                                disabled={loading}
                                onClick={handlePayment}
                                className={`mt-6 w-full rounded-xl py-3 font-semibold ${
                                    loading
                                    ? "bg-slate-700 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                                }`}
                                >
                                {loading ? "Processing..." : "Proceed to Payment"}
                                </button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>


    )

}



export default BusPayment;