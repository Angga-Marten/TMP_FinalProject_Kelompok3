import "../css/LandingPage.css";
import { useState, useEffect } from "react";

function Talk() {
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
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content glass">
                        <h2 className="cta-title">READY TO EXPAND YOUR KNOWLEDGE?</h2>
                        <p className="cta-text">Curious about how you can be part of this amazing experience? Reach out to our team for more information!</p>
                        <a href="#contact" onClick={(e) => handleNavClick(e, "contact")} className="cta-button">LET'S TALK</a>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Talk