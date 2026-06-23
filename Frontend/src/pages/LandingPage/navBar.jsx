import React from "react";
import { Plane } from "lucide-react";
import { useNavigate } from "react-router-dom";


function Navbar(){


    const navigate = useNavigate();
    return(
        
            <nav className="sticky top-0 z-50 bg-[#020617]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center">
            <Plane size={20} />
          </div>

          <div className="flex items-center gap-1">
            <h1 className="text-xl font-bold text-white">TripForge</h1>
            <h1 className="text-xl font-bold text-cyan-300">AI</h1>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#how-it-works" className="hover:text-white transition">How It Works</a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/Login")}
            className="hidden sm:block border border-slate-700 hover:border-blue-500 text-white px-5 py-2 rounded-xl text-sm font-semibold transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition"
          >
            Sign Up
          </button>
        </div>

      </div>
    </nav>
        



    )




}


export default Navbar;