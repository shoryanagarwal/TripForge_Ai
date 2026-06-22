
import Navbar from "./navBar.jsx";
import Hero from "./Hero.jsx";
import Features from "./Features.jsx";
import HowItWorks from "./HowItWorks.jsx";
import CTA from "./CTA.jsx";
import Footer from "./Footer.jsx";

function LandingPage(){
        return(
        <div className="bg-[#020617] min-h-screen text-white">
            <Navbar/>
            <Hero/>
            <Features/>
            <HowItWorks/>
            <CTA/>
            <Footer/>
        </div>

    )








}

export default LandingPage;