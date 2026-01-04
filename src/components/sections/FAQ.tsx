import "../css/LandingPage.css";
import { useState } from "react";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <section id="faq">
      <div className="container">
        <div className="section-title">
          <h2>Frequently Asked Questions</h2>
          <p>Find answers to common questions</p>
        </div>

        <div className="faq-container">

          {[
            {
              q: "Who can participate in Hackathon 8.0?",
              a: "Anyone aged 18 and above with an interest in technology can participate. We welcome students, professionals, and enthusiasts from all backgrounds. Teams can have 2-4 members. International participants are also welcome!"
            },
            {
              q: "Do I need to have coding experience?",
              a: "While coding experience is beneficial, it's not mandatory. We have tracks for different skill levels, and mentors will be available to help beginners. Designers, project managers, and domain experts are also encouraged to join."
            },
            {
              q: "What is the registration fee?",
              a: "Registration is completely free! We believe in making technology accessible to everyone. All participants will receive access to workshops, mentorship, meals during the event, and exclusive swag."
            },
            {
              q: "What should I bring to the hackathon?",
              a: "Please bring your laptop, charger, any hardware you plan to use, valid ID for registration, and enthusiasm! We'll provide meals, snacks, beverages, and a comfortable working environment with high-speed internet."
            },
            {
              q: "Can I work on an existing project?",
              a: "All projects must be started from scratch at the hackathon. You can come with ideas, but coding should begin only after the opening ceremony. This ensures a level playing field for all participants."
            }
          ].map((item, index) => (
            <div className="faq-item" key={index}>
              <div
                className="faq-question glass"
                onClick={() => toggleFAQ(index)}
              >
                <span>{item.q}</span>
                <span className="faq-toggle">
                  <i
                    className={`fas ${
                      activeIndex === index ? "fa-times" : "fa-plus"
                    }`}
                  ></i>
                </span>
              </div>

              <div
                className={`faq-answer glass ${
                  activeIndex === index ? "open" : ""
                }`}
              >
                <p>{item.a}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default FAQ;
