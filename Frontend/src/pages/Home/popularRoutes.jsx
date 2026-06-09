import {Plane,Bus} from 'lucide-react'


function PopularRoutes() {

    const routes = [
         {
            route: "Delhi → Mumbai",
            flights: true,
            buses: true,
        },
        {
            route: "Delhi → Bangalore",
            flights: true,
            buses: true,
        },
        {
            route: "Mumbai → Pune",
            flights: false,
            buses: true,
        },
        {
            route: "Kolkata → Delhi",
            flights: true,
            buses: true,
        },
    ];

    


    return(

        <section>

                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-2xl font-bold">
                        Popular Routes
                    </h2>

                            <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium border border-cyan-400 hover:border-cyan-300 px-4 py-2 rounded-lg transition">
                                    View All
                            </button>
      

                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {routes.map((route) => (
                <div
                    key={route.route}
                    className="bg-[#0f172a] border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/30 hover:bg-slate-800/50 transition"
                >
                    <h3 className="text-lg font-semibold">
                    {route.route}
                    </h3>

                    <p className="text-slate-400 text-sm mt-2">
                    Explore travel options for this route
                    </p>

                    <div className="flex items-center gap-4 mt-5">
                    {route.flights && (
                        <div className="flex items-center gap-2 text-blue-400">
                        <Plane size={16} />
                        <span className="text-sm">Flights</span>
                        </div>
                    )}

                    {route.buses && (
                        <div className="flex items-center gap-2 text-green-400">
                        <Bus size={16} />
                        <span className="text-sm">Buses</span>
                        </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>


    )






}


export default PopularRoutes;