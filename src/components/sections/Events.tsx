import "../css/LandingPage.css";
import { useState, useEffect } from "react";

function Events() {
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
            <section id="events" className="events-section">
                <div className="container">
                    <div className="section-title">
                        <h2>OUR EVENTS</h2>
                        <p>Explore our exciting lineup of technology events</p>
                    </div>

                    <div className="events-grid">
                        <div className="event-card glass">
                            <div className="event-number">01</div>
                            <h3>HACKATHON</h3>
                            <p>The premier 42-hour coding competition where innovators create solutions to real-world challenges. Participants collaborate, code, and compete for amazing prizes.</p>
                            <a href="#home" onClick={(e) => handleNavClick(e, "home")} className="event-link">Learn More <i className="fas fa-arrow-right"></i></a>
                        </div>

                        <div className="event-card glass">
                            <div className="event-number">02</div>
                            <h3>TECHNOPEST</h3>
                            <p>An engaging tech festival featuring workshops, tech talks, and exhibitions from industry leaders. Connect with experts and explore the latest technology trends.</p>
                            <a href="#" onClick={(e) => handleNavClick(e, "home")} className="event-link">Coming Soon <i className="fas fa-arrow-right"></i></a>
                        </div>

                        <div className="event-card glass">
                            <div className="event-number">03</div>
                            <h3>TECHNOSUMMIT</h3>
                            <p>A conference bringing together technology leaders, innovators, and enthusiasts to discuss the future of tech and its impact on society and business.</p>
                            <a href="#" onClick={(e) => handleNavClick(e, "home")} className="event-link">Coming Soon <i className="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Events