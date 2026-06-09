import {Bot, ArrowRight, Tag, Clock, Wallet, ShieldCheck} from 'lucide-react'
import {useNavigate} from 'react-router-dom'


function AiBanner() {
    const navigate = useNavigate();
    const features=[

        {
            title:'Cheapest Option',
            icon:Tag
        },
        {
            title:'Fastest Option',
            icon:Clock
        },
        {
            title:'Budget Fit',
            icon:Wallet
        },
        {
            title:'Convienience',
            icon: ShieldCheck
        }



    ]


    return (

        <section className="mb-8">
            <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 p-6 md:p-8 shadow-2xl border border-cyan-400/20">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                     <div className="flex items-start gap-3">
                        <div className="h-20 w-20 rounded-3xl bg-white/15 border border-white/20 flex items-center justify-center shadow-lg">
                            <Bot size={42} className="text-white" />
                        </div>



                        <div >
                            <h2 className="text-xl md:text-2xl font-bold  ">TripForge AI Assistant ✨</h2>
                            <p className="text-blue-50 mt-3 max-w-xl leading-relaxed text-sm">
                                Confused between flights and buses? Let AI compare price,
                                duration, budget fit and convenience to find the best option for your next trip.
                            </p>
                        </div>

                     </div>


                     <div className="grid grid-cols-2 gap-4 min-w-[300px]">
                        {features.map((feature)=>{
                            const Icon=feature.icon;
                            return (
                            <div
                            key={feature.title}
                            className="flex items-center gap-3 text-white"
                            >
                            <div className="h-10 w-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center">
                                <Icon size={14} />
                            </div>

                            <span className="text-sm font-semibold ">
                                {feature.title}
                            </span>
                            </div>
                        );
                        })}
                     </div>

                        <button
                        onClick={() => navigate("/assistant")}
                        className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl transition min-w-[180px]"
                        >
                        Ask AI
                        <ArrowRight size={18} />
                    </button>


                </div>
            
            </div>





        </section>



    )











}



export default AiBanner;