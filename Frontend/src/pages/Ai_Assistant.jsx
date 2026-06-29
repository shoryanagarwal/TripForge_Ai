import api from "../api/axios.js";
import { useState } from "react";
import {toast} from 'react-hot-toast';


import {Bot,Sparkles} from 'lucide-react'


function Ai_Assistant(){

    const [formData,setFormData]=useState({
        source:"",
        destination:"",
        date:"",
        budget:""
    })


    const [recommendations,setRecommendations]=useState(null);
    const [loading,setLoading]=useState(false);


    const handleRecommendation=async(e)=>{
        e.preventDefault();

        try{

            if(!formData.source || !formData.destination){
                toast.error("Source and destination are required");
                return;
            }
            if(!formData.date){
                toast.error("Date is required");
                return;
            }
            
            setLoading(true);
            const response= await api.post('/ai/recommend',formData);


            setRecommendations(response.data.data);
            toast.success("Recommendations fetched successfully")





        }
        catch(error){
            console.log("Error in fetching recommendations",error);
            toast.error(error.response.data.message || 'Something went wrong')
        }
        finally{
            setLoading(false);
        }



    }


    return(
        <div className="min-h-screen bg-[#020617] text-white px-6 py-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold flex items-center gap-3">
                    <Bot size={32} className="text-blue-500"/>
                    AI Travel Assistant
                </h1>


                <p className="text-slate-400 mt-2">
                    Compare flights and buses using AI-powered recommendations.
                </p>


                <form
                   onSubmit={handleRecommendation}
                   className="mt-8 bg-[#0f172a] border border-slate-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-4 gap-4" 
                >

                    <input
                        type="text"
                        placeholder="Source"
                        className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 outline-none text-sm text-white"
                        value={formData.source}
                        onChange={(e)=> setFormData({...formData,source:e.target.value})}   
                    />


                    <input
                        type="text"
                        placeholder="destination"
                        className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 outline-none text-sm text-white"
                        value={formData.destination}
                        onChange={(e)=> setFormData({...formData,destination:e.target.value})}   
                    />


                    <input
                        type="text"
                        placeholder="Date"
                        className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 outline-none text-sm text-white"
                        value={formData.date}
                        onChange={(e)=> setFormData({...formData,date:e.target.value})}   
                    />

                    <input
                        type="number"
                        placeholder="Budget"
                        className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 outline-none text-sm text-white"
                        value={formData.budget}
                        onChange={(e)=> setFormData({...formData,budget:e.target.value})}   
                    />



                    <button 
                        type="submit"
                         className="md:col-span-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-xl py-3 font-semibold flex items-center justify-center gap-2"
                         
                         disabled={loading}

          
                    
                    >
                        <Sparkles size={20} className={loading ? "animate-spin" : ""}/>
                        {loading ? "Fetching Recommendations..." : "Get Recommendations"}

                    </button>











                </form>


                {recommendations && (
                    <div className="mt-8 bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
                    <h2 className="text-xl font-semibold mb-4">
                    AI Recommendation
                    </h2>

                    <div className="text-slate-300 leading-7 whitespace-pre-line">
                    {recommendations}
                    </div>
                </div>
        )}
      </div>
    </div>
  );
}


export default Ai_Assistant;
