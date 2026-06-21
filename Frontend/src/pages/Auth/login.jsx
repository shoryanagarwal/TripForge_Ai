import {useState} from 'react'
import api from '../../api/axios.js'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { Plane, Mail, Lock } from "lucide-react";
import {Link} from 'react-router-dom'

function Login(){

            const navigate=useNavigate();
            const [formData,setFormData]=useState({
                email:'',
                password:''
             })


             const handleSubmit=async(e)=>{
                e.preventDefault();

                try{
                  const response= await api.post('/login',formData);
                  const {token,user}=response.data.data;
                  console.log(response.data.data);

                  localStorage.setItem('token',token);
                  localStorage.setItem('user',JSON.stringify(user));
                  console.log(token);
                  
                  toast.success(response.data.message);
                  navigate('/home');

                }
                catch(error){
                    toast.error(error.response.data.message || 'Something went wrong')
                }


             }

        return (

            <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center px-4">
                <div className="w-full max-w-sm bg-[#0B132B] border border-slate-800 rounded-2xl p-5 shadow-2xl">

                    <div className="flex justify-center mb-4 gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-blue-600 flex items-center justify-center">
                            <Plane size={18} />  
                           
                        </div>
                        <div className="flex items-center">
                         <h1 className="text-xl font-bold  text-blue-200">TripForge AI</h1>
                         </div>

                    </div>

                    <h1 className="text-xl font-bold text-center">WELCOME BACK</h1>


                    <p className="text-slate-400 text-center text-sm mt-2 ">Login to continue your journey with TripForge AI</p>

                    <div className="mt-4">
                    <form className="8 space-y-5 " onSubmit={handleSubmit}>
                        <div>
                            <label className="text-sm text-slate-300 ">Email</label>
                         <div className="mt-2 flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3">
              <Mail size={18} className="text-slate-500" />
              <input
                type="email"
                value={formData.email}
                onChange={(e)=>setFormData({
                    ...formData,
                    email:e.target.value
                })}
                placeholder="Enter your email"
                className="bg-transparent outline-none w-full text-sm text-white placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="mt-2">
            <label className="text-sm text-slate-300">Password</label>
            <div className="mt-2 flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3">
              <Lock size={18} className="text-slate-500" />
              <input
                type="password"
                value={formData.password}
                onChange={(e)=>setFormData({
                    ...formData,
                    password:e.target.value
                })}
                placeholder="Enter your password"
                className="bg-transparent outline-none w-full text-sm text-white placeholder:text-slate-600"
              />
            </div>

            <button className="text-white hover:text-blue-400 text-sm font mt-1 block " onClick={()=>navigate('/forgot-password')}>
              Forgot password?{" "}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-3 font-semibold mt-1"
          >
            Login
          </button>
        </form>

        </div>

        <p className="text-center text-slate-300 text-sm mt-2">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:text-blue-400 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;