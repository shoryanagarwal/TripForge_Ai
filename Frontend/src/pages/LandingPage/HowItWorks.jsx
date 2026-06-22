import {
  Search,
  MousePointerClick,
  CreditCard,
  TicketCheck,
  MapPinned,
} from "lucide-react";

function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Search Trips",
      desc: "Enter your source, destination, and travel date.",
    },
    {
      icon: MousePointerClick,
      title: "Choose Option",
      desc: "Select the best flight or bus based on your preference.",
    },
    {
      icon: CreditCard,
      title: "Pay Securely",
      desc: "Complete payment safely using Razorpay checkout.",
    },
    {
      icon: TicketCheck,
      title: "Get Ticket",
      desc: "Receive instant PDF ticket and email confirmation.",
    },
    {
      icon: MapPinned,
      title: "Start Journey",
      desc: "Travel stress-free with real-time updates.",
    },
  ];

  return (
    <section id="how-it-works" className="bg-[#020617] text-white px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-blue-400 font-semibold text-sm">HOW IT WORKS</p>

          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            Book your journey in simple steps
          </h2>

          <p className="text-slate-400 mt-4">
            From search to ticket delivery, TripForge AI keeps the travel
            booking experience smooth and simple.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mt-14">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative bg-[#0B132B] border border-slate-800 rounded-2xl p-5 text-center hover:border-cyan-400/50 transition"
              >
                <div className="mx-auto h-12 w-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                  <Icon size={22} className="text-cyan-300" />
                </div>

                <div className="mt-4 text-sm text-blue-400 font-semibold">
                  Step {index + 1}
                </div>

                <h3 className="text-lg font-semibold mt-2">
                  {step.title}
                </h3>

                <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;