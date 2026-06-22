import {Plane,Bus,Bot,ShieldCheck,Ticket,Check,Bell} from "lucide-react";
import {useNavigate} from "react-router-dom";


function Hero(){
    const navigate = useNavigate();
    const scrollToFeatures = () => {
        const featuresSection = document.getElementById("features");
        if (featuresSection) {
          featuresSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return(
         <section className="relative overflow-hidden bg-[#020617] text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-400/10" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm mb-6">
            <Bot size={16} />
            AI-powered travel booking platform
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Travel Smarter with{" "}
            <span className="text-cyan-300">TripForge AI</span>
          </h1>

          <p className="text-slate-400 mt-6 text-lg leading-relaxed max-w-xl">
            Book flights and buses effortlessly with smart recommendations,
            secure payments, real-time notifications, and instant e-tickets.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={() => navigate("/signup")}
              className="bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-xl font-semibold transition"
            >
              Get Started
            </button>

            <button
              onClick={scrollToFeatures}
              className="border border-slate-700 hover:border-cyan-400 px-7 py-3 rounded-xl font-semibold transition"
            >
              Explore Features
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-10 max-w-lg">
            <div className="bg-[#0B132B] border border-slate-800 rounded-2xl p-4">
              <Plane className="text-blue-400 mb-2" size={22} />
              <p className="font-semibold">Flights</p>
              <p className="text-xs text-slate-500 mt-1">Fast booking</p>
            </div>

            <div className="bg-[#0B132B] border border-slate-800 rounded-2xl p-4">
              <Bus className="text-cyan-300 mb-2" size={22} />
              <p className="font-semibold">Buses</p>
              <p className="text-xs text-slate-500 mt-1">Easy travel</p>
            </div>

            <div className="bg-[#0B132B] border border-slate-800 rounded-2xl p-4">
              <Ticket className="text-purple-400 mb-2" size={22} />
              <p className="font-semibold">Tickets</p>
              <p className="text-xs text-slate-500 mt-1">Instant PDF</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="bg-[#0B132B] border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Upcoming Trip</p>
                  <h2 className="text-2xl font-bold mt-1">Delhi → Mumbai</h2>
                </div>

                <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center">
                  <Plane size={24} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-[#0B132B] rounded-xl p-4 border border-slate-800">
                  <p className="text-slate-500 text-xs">Payment</p>
                  <div className="flex items-center gap-2 mt-2">
                    <ShieldCheck size={18} className="text-green-400" />
                    <p className="font-semibold">Secure</p>
                  </div>
                </div>

                <div className="bg-[#0B132B] rounded-xl p-4 border border-slate-800">
                  <p className="text-slate-500 text-xs">Updates</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Bell size={18} className="text-cyan-300" />
                    <p className="font-semibold">Realtime</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-blue-600/10 border border-blue-500/20 rounded-xl p-4">
                <p className="text-sm text-slate-300">
                  AI suggests: Best value fare with instant ticket and flexible
                  cancellation.
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-6 bg-blue-600 rounded-2xl px-5 py-4 shadow-xl hidden md:block">
            <p className="text-sm font-semibold">Razorpay Enabled</p>
            <p className="text-xs text-blue-100 mt-1">Safe payments</p>
          </div>
        </div>
      </div>
    </section>





    )
    



}


export default Hero;