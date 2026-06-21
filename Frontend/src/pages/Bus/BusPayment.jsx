import {useLocation,useNavigate} from 'react-router-dom'
import {useState,useEffect} from 'react'
import api from '../../api/axios.js'
import { toast } from 'react-hot-toast'


function BusPayment(){

    const location =useLocation();
    const navigate=useNavigate();

    const {bus,passengers,totalAmount,booking}= location.state || {}

    const [coupon,setCoupon]=useState('');
    const [discount,setDiscount]=useState(0);
    const [paymentMode,setPaymentMode]=useState('UPI');
    const [loading,setLoading]=useState(false);
    const [timer,setTimer]=useState(0);
    const [isPaid,setIsPaid]=useState(false);
    const [confirming, setConfirming]=useState(false);


    useEffect(()=>{


        const checkBooking=async()=>{
            try{
            if(!booking || !booking.id){
                toast.error('No booking details found. Please start the booking process again.');
                navigate('/home',{replace:true});
                return;
            }

            const response= await api.get(`/busbookings/${booking.id}`);
            const freshBooking=response.data.data;
                
            if(freshBooking.status==='confirmed'){
                setIsPaid(true);
                toast.success('Booking already confirmed. Redirecting to booking details...')
                navigate(`/busbooking/${booking.id}`, {
                    state: {
                        busbooking: freshBooking
                    },
                    replace: true
                });
            }
        }

        catch(error){
            console.log(error);
            toast.error('Error fetching booking details. Please start the booking process again.');
            navigate('/home',{replace:true});
        }

            
            

        }
        checkBooking();

    },[booking?.id])
    if(!bus || !passengers || !totalAmount){
        return (
            <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
                <p>No booking details found.</p>
            </div>
        );
    }



    useEffect(()=>{
   
   
           if(!booking.expiresAt) return;
   
           const interval= setInterval(()=>{
               const expiryTime=new Date(booking.expiresAt).getTime();
               const currentTime= new Date().getTime();
   
   
               const difference=expiryTime-currentTime;
   
               if(difference<=0){
                   clearInterval(interval);
                   setTimer(0);
                   toast.error('Booking session expired. Please start again.');
                   navigate('/home',{replace:true});
               }
               else{
                   setTimer(difference);
               }
           },1000) // update every second
   
   
           return ()=> clearInterval(interval);
   
   
       },[booking.expiresAt])



    const formatTime=(ms)=>{

        const totalSeconds=Math.floor(ms/1000);
        const minutes=Math.floor(totalSeconds/60);
        const seconds=totalSeconds % 60;



        return `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`; //what is padStart? it adds leading zeros if minutes or seconds are less than 10 to maintain consistent formatting


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
           const bookingId=booking.id;
           const response =await api.post('/bus-razorpay/create-order',{
                busBookingId:bookingId,
                
           })


           const order=response.data.data;
           const options={

                key:import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount:order.amount,
                currency:order.currency,
                name:'TripForge AI',
                description:`Payment for booking ${bookingId}`,
                order_id:order.id,


                handler:async function(response){
                    setConfirming(true);
                    try{
                        const toastId=toast.loading('Verifying payment, please wait...');

                        const result=await api.post('/bus-razorpay/verify-payment',{
                            razorpay_order_id:response.razorpay_order_id,
                            razorpay_payment_id:response.razorpay_payment_id,
                            razorpay_signature:response.razorpay_signature,
                            busBookingId:bookingId,
                            paymentMode:paymentMode

                        })
                        toast.success('Payment successful! Your bus has been booked.',{id:toastId})

                        const bookingResponse= await api.get(`/busbookings/${bookingId}`);

                        navigate(`/busbooking/${bookingId}`, {
                            state: {
                                busbooking: bookingResponse.data.data
                            },
                            replace: true
                        });


                    }
                    catch(error){
                        setConfirming(false);
                        console.log("Error in payment handler",error);
                        toast.error(error.response.data.message || 'Payment failed. Please try again.')
                    }
                },
                theme:{ // Razorpay theme customization
                    color:'#2563eb'
                }

               





           }


              const rzp=new window.Razorpay(options);
              rzp.on('payment.failed', function (response){
                console.log("Payment failed",response.error);
                toast.error('Payment failed. Please try again.')
              })
              rzp.open();
            
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
        <>
        {confirming && (
            <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
                <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-8 text-center">
                <p className="text-xl font-bold">Confirming your booking...</p>
                <p className="text-slate-400 mt-2">Please wait, generating your ticket.</p>
                </div>
            </div>
            )}
        <div className="min-h-screen bg-[#020617] text-white px-6 py-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-2">Review And Payment</h1>

                <div className="mt-6 bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-center">
                <p className="text-sm text-red-400 font-semibold">
                    Complete payment within {formatTime(timer)} to avoid booking cancellation
                </p>
                </div>

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
                                disabled={loading || isPaid}
                                onClick={handlePayment}
                                className={`mt-6 w-full rounded-xl py-3 font-semibold ${
                                    loading || isPaid
                                    ? "bg-slate-700 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                                }`}
                                >
                                {isPaid ? "Payment Completed" : loading ? "Processing..." : "Proceed to Payment"}
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
       
        </>
    )

}



export default BusPayment;