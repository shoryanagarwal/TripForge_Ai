import {Plane,Bus,Bot,Ticket,Bell,UserCircle} from 'lucide-react'
import {useNavigate} from 'react-router-dom'

import PopularRoutes from './Home/popularRoutes.jsx'
import HeroSection from './Home/HeroSection.jsx'
import AiBanner from './Home/AiBanner.jsx'
import Navbar from './Home/Navbar.jsx'
import Actions from './Home/actions.jsx'

function Home(){
       


        return (

                <div className="min-h-screen bg-[#020617] text-white">
            <Navbar />

        <main className="max-w-7xl mx-auto px-6 py-3">
            <   HeroSection />

            <AiBanner />

            <Actions />

            <div className="mt-8">
            <div className="lg:col-span-2">
                <PopularRoutes />
            </div>

           
            </div>
        </main>
        </div>




        )









    
 }



 export default Home