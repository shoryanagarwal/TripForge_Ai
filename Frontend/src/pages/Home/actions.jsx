import {Plane,Bus,Bot,Ticket,ArrowRight} from 'lucide-react'
import {useNavigate} from 'react-router-dom'

function Actions(){

    const navigate = useNavigate();
    const cards=[
         {
      title: "Search Flights",
      description: "Find the best flight options for your next trip.",
      icon: Plane,
      path: "/flights",
      color: "bg-blue-600",
      text: "text-blue-400",
    },
    {
      title: "Search Buses",
      description: "Discover convenient bus routes and schedules.",
      icon: Bus,
      path: "/buses",
      color: "bg-green-600",
      text: "text-green-400",
    },
    {
      title: "Travel Assistant",
      description: "Get AI-powered travel recommendations.",
      icon: Bot,
      path: "/assistant",
      color: "bg-purple-600",
      text: "text-purple-400",
    },
    {
      title: "My Bookings",
      description: "View and manage your flight and bus bookings.",
      icon: Ticket,
      path: "/my-bookings",
      color: "bg-orange-500",
      text: "text-orange-400",
    },


    ]




    return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
         {cards.map((card)=>{
             const Icon=card.icon;

                return (
                    <div key={card.title}
                    onClick={()=>navigate(card.path)}
                    className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 hover:bg-slate-800/80 hover:border-cyan-500/30 transition cursor-pointer shadow-xl"
                    >

                        <div className={`h-14 w-14 rounded-xl ${card.color} flex items-center justify-center mb-5 shadow-lg`}>
                            <Icon size={26} />

                        </div>
                        <h3 className='text-xl font-semibold'>{card.title}</h3>
                        <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                            {card.description}
                        </p>


                        <div className={`flex items-center gap-2 mt-6 font-medium ${card.text}`}>
                            <span>Explore</span>
                            <ArrowRight size={17} />
                        </div>


                    </div>


                )
         })}
    </section>
  );


}

export default Actions;