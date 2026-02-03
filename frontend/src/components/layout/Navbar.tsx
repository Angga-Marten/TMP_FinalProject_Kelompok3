import "../css/LandingPage.css";
import { useState, useEffect } from "react";

function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 100);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleNavClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        targetId: string
    ) => {
        e.preventDefault();

        if (targetId === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            const target = document.getElementById(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: "smooth",
                });
            }
        }

        // Tutup mobile menu setelah klik
        setOpen(false);
    };

    return (
        <div>
            <div className="glass-header">
                <div className="container">
                    <h1>HACKATHON</h1>
                    <div className="tagline">
                        Future Forward: Exploring the Digital Horizon
                    </div>
                </div>
            </div>

            <header className={scrolled ? "scrolled" : ""}>
                <div className="container">
                    <nav>
                        <a href="#home" className="logo">
                            <i className="fas fa-code"></i>
                            <span>HACKATHON</span>
                        </a>

                        <ul className={`nav-links ${open ? "active" : ""}`}>
                            <li><a href="#home" onClick={(e) => handleNavClick(e, "home")}>Home</a></li>
                            <li><a href="#events" onClick={(e) => handleNavClick(e, "events")}>Events</a></li>
                            <li><a href="#mentors" onClick={(e) => handleNavClick(e, "mentors")}>Mentor & Jury</a></li>
                            <li><a href="#about" onClick={(e) => handleNavClick(e, "about")}>About</a></li>
                            <li><a href="#prizes" onClick={(e) => handleNavClick(e, "prizes")}>Champion Prizes</a></li>
                            <li><a href="#faq" onClick={(e) => handleNavClick(e, "faq")}>FAQ</a></li>
                            <li><a href="#timeline" onClick={(e) => handleNavClick(e, "timeline")}>Timeline</a></li>
                            <li>
                                <a href="/registerpage" className="signup-btn">SIGN UP</a>
                            </li>
                            <li>
                                <a href="/loginpage" className="login-btn">SIGN IN</a>
                            </li>
                        </ul>

                        <button
                            className="mobile-menu-btn"
                            onClick={() => setOpen(!open)}
                        >
                            <i className={`fas ${open ? "fa-times" : "fa-bars"}`}></i>
                        </button>
                    </nav>
                </div>
            </header>
        </div>
    );
}

export default Navbar;
