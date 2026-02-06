import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import "../components/Container.css";
import heroVideo from "../assets/hero.mp4";
import "./Home.css";

import kavya from "../assets/kavya.png";
import sneha from "../assets/sneha.png";
import akhil from "../assets/akhil.png";

function Home() {
  /* 👥 STUDENT COORDINATORS FROM BACKEND */
  const [coordinators, setCoordinators] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/coordinators")
      .then(res => res.json())
      .then(data => setCoordinators(data))
      .catch(err => console.error("Coordinator fetch error", err));
  }, []);

  /* FILTER BY DOMAIN */
  const byDomain = (domain) =>
    coordinators.filter(c => c.domain === domain);

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <div className="video-hero">
        <video autoPlay loop muted playsInline>
          <source src={heroVideo} type="video/mp4" />
        </video>

        <div className="video-overlay">
          <img src={logo} alt="ACE Club Logo" className="hero-logo" />
          <p className="hero-tagline">"The Official Voice Of Sri Vasavi"</p>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="container">

        {/* ABOUT */}
        <section>
          <h2>About A.C.E Club</h2>
          <p>
            <b>A.C.E Club – Sri Vasavi</b> is a structured student association
            established to enhance communication, creativity, and expression.
          </p>
          <p>
            Built on <b>Articulate, Create, and Express</b>, ACE gives students
            a professional platform to be heard.
          </p>
        </section>

        <hr />

        {/* CLUB WINGS */}
        <section>
          <h3>Club Wings</h3>
          <ul>
            <li><b>Editing Wing</b> – Content accuracy & presentation</li>
            <li><b>Web Management Wing</b> – Digital publishing</li>
            <li><b>Radio Anchoring Wing</b> – Audio announcements</li>
            <li><b>Data Collection Wing</b> – Campus information</li>
          </ul>
        </section>

        <hr />

        {/* FACULTY */}
        <section className="faculty-section">
          <h3>Faculty Co-ordinators</h3>

          <p>
            ACE started from what we saw in our classrooms. Many students have
            great ideas but often miss events because they don’t get the
            information on time. Even when they know what to say, some hesitate
            to speak in front of others because they’re nervous or unsure.
            <br /><br />
            During a group discussion, some students told us they knew exactly
            what to speak but were too scared. When we asked them to write it
            down instead, they did it confidently.
            <br /><br />
            That moment made us realize that so many students have thoughts that
            can inspire others, but they just don’t have a platform to share
            them. That’s how ACE came to life — combining a campus radio and a
            magazine.
          </p>

          <div className="faculty-grid">
            <div className="faculty-card">
              <img src={kavya} alt="Kavya" />
              <h4>Kavya Chalamalasetty</h4>
              <span>Assistant Professor</span><br />
              <span>Dept of ECE</span>
            </div>

            <div className="faculty-card">
              <img src={sneha} alt="Sneha" />
              <h4>Sneha Pradhan</h4>
              <span>Assistant Professor</span><br />
              <span>Dept of CSD</span>
            </div>

            <div className="faculty-card">
              <img src={akhil} alt="Akheel" />
              <h4>Syed Akheel Hassan Gori</h4>
              <span>Assistant Professor</span><br />
              <span>Dept of CST</span>
            </div>
          </div>
        </section>

        <hr />

        {/* ================= STUDENT COORDINATORS ================= */}
        <section className="faculty-section">
          <h3>Students Driving A.C.E Club Operations</h3>

          {[
            ["overall", "A.C.E Coordinators"],
            ["web", "Webpage Management"],
            ["editing", "Editing Wing"],
            ["data", "Data Collection Wing"],
            ["anchoring", "Radio Anchoring"],
          ].map(([key, title]) => {
            const list = byDomain(key);
            return (
              <div key={key} className="domain-wrapper">
                <h4 className="domain-title">{title}</h4>

                <div className="domain-row">
                  <div
                    className={`domain-inner ${
                      list.length <= 3 ? "centered" : ""
                    }`}
                  >
                    {list.map(c => (
                      <div className="person-card" key={c.id}>
                        <div className="person-img">
                          <img
                            src={`http://localhost:5000${c.image}`}
                            alt={c.name}
                          />
                        </div>

                        <div className="person-info">
                          <div className="person-name">{c.name}</div>
                          <div className="person-meta">
                            {c.branch} • {c.year}
                          </div>
                        </div>
                      </div>
                    ))}

                    {list.length === 0 && (
                      <p style={{ opacity: 0.6 }}>
                        No coordinators added
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </section>

      </div>
    </>
  );
}

export default Home;
