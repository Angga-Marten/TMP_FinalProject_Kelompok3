import "../css/LandingPage.css";
import { useState, useEffect } from "react";

function Hero() {
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
            <section id="home">
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <div className="glass-title">HACKATHON 8.0</div>
                            <h1>Innovation Beyond Imagination</h1>
                            <span className="tagline">42-Hour Coding Marathon</span>
                            <p>
                                Join the most exciting 42-hour coding competition of the year!
                                Collaborate with brilliant minds, solve real-world problems, and
                                showcase your innovative solutions. Hackathon is the peak event
                                of TechnoScape that challenges participants to create innovative
                                applications or websites.
                            </p>
                            <a href="#about" onClick={(e) => handleNavClick(e, "about")} className="guidebook-btn">
                                Learn More <i className="fas fa-arrow-right"></i>
                            </a>
                        </div>

                        <div className="hero-image">
                            <div className="glass">
                                <img
                                    src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                                    alt="Hackathon Recap"
                                    className="recap-video"
                                />
                                <div
                                    style={{
                                        textAlign: "center",
                                        marginTop: "15px",
                                        color: "var(--text-light)",
                                        fontSize: "0.95rem",
                                    }}
                                >
                                    <i className="fas fa-play-circle"></i> Watch TechnoScape 2024
                                    Recap
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Hero;
