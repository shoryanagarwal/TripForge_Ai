import {
  Plane,
  Bus,
  Bot,
  CreditCard,
  Bell,
  TicketCheck,
} from "lucide-react";

function Features() {
  const features = [
    {
      icon: Plane,
      title: "Flight Booking",
      description: "Search and book flights with real-time availability and smooth booking flow.",
    },
    {
      icon: Bus,
      title: "Bus Booking",
      description: "Find buses, select seats, confirm bookings, and manage trips easily.",
    },
    {
      icon: Bot,
      title: "AI Travel Assistant",
      description: "Get smart travel recommendations based on your source, destination, and date.",
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Complete payments safely with Razorpay-powered checkout and verification.",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Receive real-time booking updates using socket notifications and alerts.",
    },
    {
      icon: TicketCheck,
      title: "Instant E-Tickets",
      description: "Get PDF tickets instantly with email confirmation after successful payment.",
    },
  ];

  return (
    <section id="features" className="bg-[#020617] text-white px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-blue-400 font-semibold text-sm">FEATURES</p>

          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            Everything you need for a smarter journey
          </h2>

          <p className="text-slate-400 mt-4">
            TripForge AI combines booking, payments, notifications, and AI
            recommendations into one clean travel experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="bg-[#0B132B] border border-slate-800 rounded-2xl p-6 hover:border-blue-500/60 hover:-translate-y-1 transition"
              >
                <div className="h-12 w-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                  <Icon size={22} className="text-cyan-300" />
                </div>

                <h3 className="text-xl font-semibold mt-5">
                  {feature.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mt-3">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;