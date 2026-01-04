import "../css/LandingPage.css";
import { useState, useEffect } from "react";

function Footer() {
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
            <footer>
                <div className="container">
                    <div className="footer-content">
                        <div>
                            <div className="footer-logo">
                                <i className="fas fa-code"></i> <span>HACKATHON</span>
                            </div>
                            <p style={{ color: 'var(--text-light)', marginBottom: '25px', maxWidth: '300px' }}>The premier technology event of the year, bringing together innovators, creators, and technology enthusiasts from around the world.</p>

                            <div style={{ marginTop: '30px' }}>
                                <h4>Subscribe to TechnoScape</h4>
                                <div style={{ display: 'flex', marginTop: '15px' }}>
                                    <input type="email" placeholder="Enter your email" style={{ padding: '12px 15px', borderRadius: '8px 0 0 8px', border: '1px solid rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.5)', color: 'var(--text)', flex: 1, minWidth: 0 }} />
                                    <button style={{ background: 'var(--gradient-1)', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '0 8px 8px 0', fontWeight: 600, cursor: 'pointer' }}>Subscribe</button>
                                </div>
                            </div>
                        </div>

                        <div className="footer-links">
                            <div className="footer-column">
                                <h4>Quick Links</h4>
                                <ul>
                                    <li><a href="#home" onClick={(e) => handleNavClick(e, "home")}>Home</a></li>
                                    <li><a href="#events" onClick={(e) => handleNavClick(e, "events")}>Events</a></li>
                                    <li><a href="#prizes" onClick={(e) => handleNavClick(e, "prizes")}>Prizes</a></li>
                                    <li><a href="#mentors" onClick={(e) => handleNavClick(e, "mentors")}>Mentors</a></li>
                                </ul>
                            </div>

                            <div className="footer-column">
                                <h4>Resources</h4>
                                <ul>
                                    <li><a href="#faq" onClick={(e) => handleNavClick(e, "faq")}>FAQ</a></li>
                                    <li><a href="#timeline" onClick={(e) => handleNavClick(e, "timeline")}>Timeline</a></li>
                                    <li><a href="#sponsors" onClick={(e) => handleNavClick(e, "sponsors")}>Sponsors</a></li>
                                    <li><a href="#contact" onClick={(e) => handleNavClick(e, "contact")}>Contact</a></li>
                                </ul>
                            </div>

                            <div className="footer-column">
                                <h4>Legal</h4>
                                <ul>
                                    <li><a href="#" onClick={(e) => handleNavClick(e, "home")}>Privacy Policy</a></li>
                                    <li><a href="#" onClick={(e) => handleNavClick(e, "home")}>Terms of Service</a></li>
                                    <li><a href="#" onClick={(e) => handleNavClick(e, "home")}>Code of Conduct</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="organized-by">
                        <img src="https://tse3.mm.bing.net/th/id/OIP.FMZPUyPuGA5e1NlrleB9KQHaCK?pid=Api&P=0&h=180" style={{height: '40px', width: '70px'}} alt="BNCC Logo" className="organizer-logo" />
                        <img src="https://tse1.mm.bing.net/th/id/OIP.T6KliB-gKFe3weIOVJGQngHaEj?pid=Api&P=0&h=180" style={{height: '40px', width: '70px'}} alt="Binus University Logo" className="organizer-logo" />
                    </div>

                    <div className="copyright">
                        <p>Organized by: <strong>BNCC</strong> & <strong>BINUS UNIVERSITY</strong> | © Bina Nusantara Computer Club 2025</p>
                        <p style={{ marginTop: '10px' }}><a href="#" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Privacy Policy</a> & <a href="#" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Terms of Service</a></p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer