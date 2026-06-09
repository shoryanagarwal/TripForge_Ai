import {Plane,UserCircle,Bell,ChevronDown} from 'lucide-react';



function Navbar(){

    return(
        <nav className="border-b border-slate-800 bg-[#0f172a]">

                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    
                    <div className="flex items-center gap-3">
                         <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center">
                            <Plane size={20} />
                        </div>

                        <div className="flex items-center gap-1">    
                        <h1 className="text-xl font-bold text-white">TripForge</h1>
                        <h1 className="text-xl font-bold text-cyan-300 ">AI</h1>
                        </div>

                    </div>


                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-1 cursor-pointer">
                        <Bell size={22} className=" cursor-pointer"/>
                        </div>

                        <div className="flex items-center gap-2 cursor-pointer">
                        <UserCircle size={22} className="cursor-pointer"/>
                        <h3 className='text-sm font-semibold'>Hi Traveller</h3>
                            <ChevronDown size={16} className="text-slate-400"/>
                        </div>
                    </div>

                </div>








        </nav>



    )











}



export default Navbar;