import "../css/LandingPage.css";

function Prizes() {
    return (
        <div>
            <section id="prizes">
                <div className="container">
                    <div className="section-title">
                        <h2>Champion Prizes</h2>
                        <p>Amazing rewards await the winners</p>
                    </div>

                    <div className="prizes">
                        <div className="prize-card glass">
                            <div className="prize-medal silver">
                                <i className="fas fa-medal"></i>
                            </div>
                            <h3>2nd Place</h3>
                            <div className="prize-amount">Rp 25,000,000</div>
                            <ul>
                                <li><i className="fas fa-check"></i> Exclusive Merchandise Pack</li>
                                <li><i className="fas fa-check"></i> Winner Certificate</li>
                                <li><i className="fas fa-check"></i> Internship Opportunities</li>
                                <li><i className="fas fa-check"></i> Mentorship Sessions</li>
                            </ul>
                        </div>

                        <div className="prize-card glass">
                            <div className="prize-medal gold">
                                <i className="fas fa-trophy"></i>
                            </div>
                            <h3>1st Place</h3>
                            <div className="prize-amount">Rp 50,000,000</div>
                            <ul>
                                <li><i className="fas fa-check"></i> Premium Merchandise Pack</li>
                                <li><i className="fas fa-check"></i> Winner Trophy & Certificate</li>
                                <li><i className="fas fa-check"></i> Job Offers from Sponsors</li>
                                <li><i className="fas fa-check"></i> Incubation Support</li>
                            </ul>
                        </div>

                        <div className="prize-card glass">
                            <div className="prize-medal bronze">
                                <i className="fas fa-award"></i>
                            </div>
                            <h3>3rd Place</h3>
                            <div className="prize-amount">Rp 15,000,000</div>
                            <ul>
                                <li><i className="fas fa-check"></i> Special Merchandise Pack</li>
                                <li><i className="fas fa-check"></i> Runner-up Certificate</li>
                                <li><i className="fas fa-check"></i> Networking Opportunities</li>
                                <li><i className="fas fa-check"></i> Tech Gadgets</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Prizes