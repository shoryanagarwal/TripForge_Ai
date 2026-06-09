import HeroBanner from '../../assests/Hero.png'

function HeroSection() {


    return(

            <section className="mb-5">
                <div className="relative overflow-hidden rounded-3xl border border-slate-800 min-h-[320px]">
                
                    <img
                        src={HeroBanner}
                        alt="Travel Banner"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                     <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent"></div>


                     <div className="relative z-10 p-10 max-w-2xl">
                        <p className="text-xl font-semibold">
                            Welcome back, Traveler! 👋
                        </p>

                        <h2 className="text-5xl font-bold mt-4">
                                Book Smarter With
                                <span className="text-cyan-400"> AI</span>
                        </h2>


                        <p className="text-slate-300 mt-5 text-lg max-w-xl">Search and compare Flights and Buses,
                            then let TripForge AI help you choose the best travel option</p>



                        <div className="flex flex-wrap gap-4 mt-6">
                            <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-100">
                                🟢 4 Active Services
                            </span>
                           
                            <span className='px-1 py-2 text-sm'>Flights</span>
                            <span className='px-0.5 py-2 text-sm'>•</span>
                            <span className='px-1 py-2 text-sm'>Buses</span>
                            <span className='px-0.5 py-2 text-sm'>•</span>
                            <span className='px-1 py-2 text-sm'>AI Assistant</span>
                            <span className='px-0.5 py-2 text-sm'>•</span>
                            <span className='px-1 py-2 text-sm'>Bookings</span>
                            



                        </div>

                    </div>    

                
                </div>




            </section>





    )









}

export default HeroSection;