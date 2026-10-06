import './style.css'
import { useNavigate } from "react-router-dom";

export const Home: any = () => {
    const navigate = useNavigate();

    function handleLoginCheck(): void {
        navigate("/dashboard");
    }

    return (
        <div className="">
            <>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>MedPortal - AI Healthcare Recommendation System</title>
                <link rel="stylesheet" href="style.css" />
                <nav id="navbar">
                    <div id="logoBox">
                        <h2 id="logo">MedPortal</h2>
                    </div>
                    <ul id="navLinks">
                        <li>
                            <a href="#home">Home</a>
                        </li>
                        <li>
                            <a href="#features">Features</a>
                        </li>
                        <li>
                            <a href="#about">About</a>
                        </li>
                        <li>
                            <a href="#contact">Contact</a>
                        </li>
                    </ul>
                    <button onClick={handleLoginCheck} id="loginBtn">Login</button>
                    <div id="hamburger">
                        <span />
                        <span />
                        <span />
                    </div>
                </nav>
                {/* HERO */}
                <section id="hero">
                    <h1>AI-Based Personalized Healthcare Recommendation System</h1>
                    <p>
                        Get smart, personalized health recommendations powered by AI. Track symptoms, get diagnostic support, and manage your health records in
                        one place.
                    </p>
                    <button onClick={handleLoginCheck} id="ctaBtn">Get Started</button>
                </section>
                {/* STATS */}
                <section id="stats">
                    <div className="statBox">
                        <h3 className="counter" data-target={1000}>
                            0
                        </h3>
                        <p>Patients Helped</p>
                    </div>
                    <div className="statBox">
                        <h3 className="counter" data-target={125}>
                            0
                        </h3>
                        <p>Partner Doctors</p>
                    </div>
                    <div className="statBox">
                        <h3 className="counter" data-target={96}>
                            0
                        </h3>
                        <p>% Prediction Accuracy</p>
                    </div>
                </section>
                {/* FEATURES */}
                <section id="features">
                    <h2>Features</h2>
                    <p id="featuresSubtext">Everything the platform will offer once fully built</p>
                    <div id="featureCards">
                        <div className="card">
                            <h3>AI Diagnosis</h3>
                            <p>Get preliminary health insights based on your symptoms using an AI model.</p>
                        </div>
                        <div className="card">
                            <h3>Patient Records</h3>
                            <p>Keep all your medical history, prescriptions and reports organized in one place.</p>
                        </div>
                        <div className="card">
                            <h3>Personalized Recommendations</h3>
                            <p>Recommendations tailored to your health profile, age, and history.</p>
                        </div>
                        <div className="card">
                            <h3>Appointment Scheduling</h3>
                            <p>Book and manage appointments with doctors directly through the platform.</p>
                        </div>
                        <div className="card">
                            <h3>24/7 Support</h3>
                            <p>Round the clock access to your health data and basic AI guidance.</p>
                        </div>
                        <div className="card">
                            <h3>Secure &amp; Private</h3>
                            <p>Your health data stays protected and only accessible to you and your doctor.</p>
                        </div>
                    </div>
                </section>
                {/* ABOUT */}
                <section id="about">
                    <h2>About This Project</h2>
                    <p>
                        MedPortal is a minor project being built as an AI-Based Personalized Healthcare Recommendation System, aligned with SDG 3 (Good Health
                        and Well-being). It aims to help patients get quick, AI-assisted health insights while keeping their records organized in one place.
                    </p>
                </section>
                <section id="contact">
                    <h2>Get In Touch</h2>
                    <form id="contactForm">
                        <input type="text" id="nameInput" placeholder="Your Name" required />
                        <input type="email" id="emailInput" placeholder="Your Email" required />
                        <textarea id="messageInput" placeholder="Your Message" rows={4} required defaultValue={""} />
                        <button type="submit">Send Message</button>
                    </form>
                    <p id="formMsg" />
                </section>
                {/* FOOTER */}
                <footer id="footer">
                    <p>© 2026 MedPortal — Minor Project</p>
                </footer>
            </>
        </div>
    );
};
