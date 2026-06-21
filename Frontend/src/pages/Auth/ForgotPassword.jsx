import api from "../../api/axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Plane, Mail, Lock, FingerprintPattern } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword(){

    const [FormData,setFormData]=useState({
        email:"",
        otp:"",
        newPassword:""
    })
    const navigate=useNavigate();


    const [otpSent,setOtpSent]=useState(false);
    const [loading,setLoading]=useState(false);

    const handleInput=(e)=>{
        const {name,value}=e.target;
        setFormData((prev)=>({
            ...prev,
            [name]:value // 1. Get the name and value from the event target (the input field that triggered the event).

        }))


        e.preventDefault();




    }


    
    const sendOtp=async()=>{

        try{
            setLoading(true);
            const response=await api.post('/forgot-password',{email:FormData.email});

            toast.success(response.data.message);
            setOtpSent(true);
        }
        catch(error){
            toast.error(error.response.data.message || 'Something went wrong');
        }
        finally{
            setLoading(false);
        }

    }
    
    const handleSubmit=(e)=>{

        e.preventDefault();
        if(!otpSent){
            sendOtp();
        }
        else{
            resetPassword();
        }
    }


    const resetPassword=async()=>{
        try{
            setLoading(true);
            const response=await api.post('/reset-password',{
                email:FormData.email,
                otp:FormData.otp,
                newPassword:FormData.newPassword
            });
            console.log(response.data);
            toast.success(response.data.message);
            navigate('/');



        }
        catch(error){
            toast.error(error.response.data.message || 'Something went wrong');
        }
        finally{
            setLoading(false);
        }



    
    
    }




    return(
        <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-[#0B132B] border border-slate-800 rounded-2xl p-5 shadow-2xl">

            <div className="flex justify-center mb-6">
                <div className="h-10 w-10 rounded-2xl bg-blue-600 flex items-center justify-center">
                <Plane size={18} />
                </div>

                <div className="flex items-center">
                <h1 className="text-2xl font-bold ml-2 text-blue-200">
                    TripForge AI
                </h1>
                </div>
            </div>

            <h1 className="text-3xl font-bold text-center">
                Forgot Password
            </h1>

            <p className="text-slate-400 text-center mt-2 mb-6">
                {!otpSent
                ? "Enter your registered email to receive an OTP."
                : "Enter the OTP and your new password."}
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>

                {!otpSent ? (
                <div>
                    <label className="text-sm text-slate-300">
                    Email
                    </label>

                    <div className="mt-2 flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3">
                    <Mail size={18} className="text-slate-500" />

                    <input
                        type="email"
                        name="email"
                        value={FormData.email}
                        onChange={handleInput}
                        placeholder="Enter your email"
                        className="bg-transparent outline-none w-full text-sm text-white placeholder:text-slate-600"
                    />
                    </div>
                </div>
                ) : (
                <>
                    <div>
                    <label className="text-sm text-slate-300">
                        OTP
                    </label>

                    <div className="mt-2 flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3">
                        <FingerprintPattern
                        size={18}
                        className="text-slate-500"
                        />

                        <input
                        type="text"
                        name="otp"
                        value={FormData.otp}
                        onChange={handleInput}
                        placeholder="Enter OTP"
                        className="bg-transparent outline-none w-full text-sm text-white placeholder:text-slate-600"
                        />
                    </div>
                    </div>

                    <div>
                    <label className="text-sm text-slate-300">
                        New Password
                    </label>

                    <div className="mt-2 flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3">
                        <Lock size={18} className="text-slate-500" />

                        <input
                        type="password"
                        name="newPassword"
                        value={FormData.newPassword}
                        onChange={handleInput}
                        placeholder="Enter new password"
                        className="bg-transparent outline-none w-full text-sm text-white placeholder:text-slate-600"
                        />
                    </div>
                    </div>
                </>
                )}

                <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-3 font-semibold mt-3"
                >
                {loading
                    ? "Processing..."
                    : otpSent
                    ? "Reset Password"
                    : "Send OTP"}
                </button>


                    {otpSent && (
                            <p className="text-center text-slate-400 text-sm mt-4">
                                Didn't receive OTP?{" "}
                                <button
                                    type="button"
                                    onClick={sendOtp}
                                    disabled={loading}
                                    className="text-blue-500 hover:text-blue-400 font-medium"
                                >
                                    Resend OTP
                                </button>
                            </p>
                    )}

            </form>

            <p className="text-center text-slate-400 text-sm mt-6">
                Remember your password?{" "}
                <Link
                to="/"
                className="text-blue-500 hover:text-blue-400 font-medium"
                >
                Login
                </Link>
            </p>

            </div>
        </div>
     
    )






}


export default ForgotPassword;