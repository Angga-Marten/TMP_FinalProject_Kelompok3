import "../components/css/LandingPage.css";

import BackgroundEffects from "../components/layout/BackgroundEffects";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import Hero from "../components/sections/Hero";
import Events from "../components/sections/Events";
import Statistics from "../components/sections/Statistics";
import Mentors from "../components/sections/Mentors";
import About from "../components/sections/About";
import Prizes from "../components/sections/Prizes";
import Benefits from "../components/sections/Benefits";
import FAQ from "../components/sections/FAQ";
import Timeline from "../components/sections/Timeline";
import Sponsors from "../components/sections/Sponsors";
import Contact from "../components/sections/Contact";
import Talk from "../components/sections/Talk";

import Loading from "../components/ui/Loading";
import Popup from "../components/ui/Popup";

import { useEffect, useState } from "react";

function LandingPage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
        setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            {loading && <div id="loading" />}
            <BackgroundEffects />
            <Navbar />

            <main>
                <Hero />
                <Events />
                <Statistics />
                <Mentors />
                <About />
                <Prizes />
                <Benefits />
                <FAQ />
                <Timeline />
                <Sponsors />
                <Talk />
                <Contact />
            </main>

            <Footer />
            <Popup />
        </>
    );
}

export default LandingPage;