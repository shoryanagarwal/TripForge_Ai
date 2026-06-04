import {Plane,Bus,Bot,Ticket,Bell,UserCircle} from 'lucide-react'
import {useNavigate} from 'react-router-dom'


function Home(){
        const navigate = useNavigate();
        const cards=[
            {
                title:'Search Flights',
                description:'Find the best flight options for your next trip with our powerful search engine.',
                icon:Plane,
                path:'/flights'
            },
            {
                title:"Search Buses",
                description:'Discover convenient bus routes and schedules for your travel needs.',
                icon:Bus,
                path:'/buses'
            },
            {
                title:'Travel Assistant',
                description:'Get personalized travel recommendations and assistance from our AI-powered assistant.',
                icon:Bot ,
                path:'/assistant'  
            },
            {
                title:'My Bookings',
                description:'View and manage your flight and bus bookings in one place.',
                icon:Ticket,
                path:'/my-bookings'
            }



        ];



        return (

                <div className='min-h-screen bg-[#020617] text-white'>
                    <nav className="border-b border-slate-800 bg-[#0f172a]">
                        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                            <h1 className="text-2xl font-bold">TripForge AI</h1>

                             <div className="flex items-center gap-10 text-slate-300">
                                <Bell size={20} />
                                <UserCircle size={24} />
                             </div>

                        </div>


                    </nav>

                    <main className='max-w-6xl mx-auto px-6 py-12'>
                        <section className='mb-12 text-center'>
                            <h2 className='text-4xl md:text-5xl font-bold'>Book Smarter With AI</h2>

                            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
                                Search and compare flights and buses, then let TripForge AI help you
                                choose the best travel option.
                            </p>

                        </section>


                        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {cards.map((card)=>{
                                const Icon = card.icon;

                                return (
                                    <div
                                    key={card.title}
                                    onClick={() => navigate(card.path)}
                                    className="bg-[#0f172a] border border-slate-800 rounded-2xl p-8 hover:bg-slate-800 transition cursor-pointer shadow-xl">
                                        
                                        <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center mb-5">
                                            <Icon size={24} />
                                        </div>

                                        <h3 className="text-2xl font-semibold">{card.title}</h3>

                                        <p className="text-slate-400 mt-2">{card.description}</p>
                                    
                                    </div>


                                )
                            })}
                        </section>


                    </main>



                </div>







        )









    
 }



 export default Home