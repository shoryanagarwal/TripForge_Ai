import { ArrowRight, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CTA() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#020617] text-white px-6 py-20">
      <div className="max-w-6xl mx-auto bg-[#0B132B] border border-slate-800 rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-cyan-400/10 to-transparent" />

        <div className="relative">
          <p className="text-blue-400 font-semibold text-sm">
            START YOUR JOURNEY
          </p>

          <h2 className="text-3xl md:text-5xl font-bold mt-4">
            Ready to plan your next trip?
          </h2>

          <p className="text-slate-400 mt-5 max-w-2xl mx-auto">
            Join TripForge AI and book flights or buses with secure payments,
            smart recommendations, instant tickets, and real-time updates.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={() => navigate("/signup")}
              className="bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
            >
              Create Account
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => navigate("/Login")}
              className="border border-slate-700 hover:border-cyan-400 px-7 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
            >
              <LogIn size={18} />
              Login
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;