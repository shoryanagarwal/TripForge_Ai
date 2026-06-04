 import {useState} from 'react'
 import api from '../api/axios.js'
 import {useNavigate, useLocation} from 'react-router-dom'
 import { toast } from 'react-hot-toast'
 import { Link } from "react-router-dom";
 import { FingerprintPattern,Plane } from "lucide-react";
 
 function VerifyOtp(){


            const navigate=useNavigate();
            const location = useLocation();
            const [otp,setOtp]=useState('');
            const email =location.state?.email || '' //location hook kya hai-> simply yeh hook hume current location ke baare me information deta hai, jaise ki url, state, etc. Is case me humne state se email ko access kiya hai jo signup page se pass kiya gaya tha.

            const handleSubmit=async(e)=>{

                    e.preventDefault();

                    try{
                        const response =await api.post('/verify-email',{email,otp});
                        toast.success(response.data.message);
                        navigate('/home');



                    }
                    catch(error){
                        toast.error(error.response.data.message || 'Something went wrong')

                    }

            }


       return (

            <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-[#0f172a] border border-slate-800 rounded-2xl p-8 shadow-2xl">

                    <div className="flex justify-center mb-6">
                        <div className="h-14 w-14 rounded-2xl bg-blue-600 flex items-center justify-center">
                            <Plane size={28} />
                        </div>
                        <div className="flex items-center">
                         <h1 className="text-2xl font-bold ml-2 text-cyan-300">TripForge AI</h1>
                         </div>

                    </div>

                    <h1 className="text-3xl font-bold text-center"> Verify Email</h1>


                    <p className="text-slate-400 text-center mt-2 mb-2"> Enter the OTP sent to your registered email.</p>

                    <div className="mt-8">
                    <form className="space-y-5 " onSubmit={handleSubmit}>
                        <div>
                            <label className="text-sm text-slate-300 ">Otp</label>
                         <div className="mt-2 flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3">
                        <FingerprintPattern size={18} className="text-slate-500" />
                        <input
                            type="text"
                            value={otp}
                            onChange={(e)=>setOtp(e.target.value)}
                            placeholder="Enter your otp"
                            className="bg-transparent outline-none w-full text-sm text-white placeholder:text-slate-600"
                        />
                        </div>
                    </div>

          

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-3 font-semibold mt-3"
          >
            Verify Otp
          </button>
        </form>

        </div>

        <p className="text-center text-slate-400 text-sm mt-6">
         Didn't receive the OTP?{" "}
          <Link to="/signup" className="text-blue-500 hover:text-blue-400 font-medium">
                Resend Otp
            </Link>
        </p>
      </div>
    </div>
  );










    
 }



 export default VerifyOtp