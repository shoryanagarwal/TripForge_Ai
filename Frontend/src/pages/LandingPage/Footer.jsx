import { Plane, Mail, ShieldCheck, Bell } from "lucide-react";

function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[#020617] border-t border-slate-800 text-white"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center">
                <Plane size={20} />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  TripForge <span className="text-cyan-300">AI</span>
                </h2>
              </div>
            </div>

            <p className="text-slate-400 mt-4 text-sm leading-relaxed">
              AI-powered travel booking platform for flights and buses with
              secure payments, instant tickets, and smart recommendations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-slate-400 text-sm">
              <a href="#features" className="hover:text-white transition">
                Features
              </a>

              <a href="#how-it-works" className="hover:text-white transition">
                How It Works
              </a>

              <a href="/login" className="hover:text-white transition">
                Login
              </a>

              <a href="/signup" className="hover:text-white transition">
                Sign Up
              </a>
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              Why TripForge AI?
            </h3>

            <div className="space-y-4 text-sm text-slate-400">

              <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-green-400" />
                Secure Razorpay Payments
              </div>

              <div className="flex items-center gap-3">
                <Bell size={18} className="text-cyan-300" />
                Real-Time Notifications
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-blue-400" />
                Instant Email Tickets
              </div>

            </div>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>
            © 2026 TripForge AI. All rights reserved.
          </p>

          <p className="mt-3 md:mt-0">
            Built by Shoryan Agarwal
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;