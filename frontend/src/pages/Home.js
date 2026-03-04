import { useEffect, useState, useRef } from "react";
import logo from "../assets/logo.png";
import "../components/Container.css";
import heroVideo from "../assets/hero.mp4";
import "./Home.css";

import kavya from "../assets/kavya.png";
import sneha from "../assets/sneha.png";
import akhil from "../assets/akhil.png";

function Home() {

  /* ================= FACULTY CAROUSEL ================= */
  const [facultyIndex, setFacultyIndex] = useState(0);
  const startX = useRef(0);

  const facultyList = [
    {
      img: kavya,
      name: "Kavya Chalamalasetty",
      dept: "Dept of ECE"
    },
    {
      img: sneha,
      name: "Sneha Pradhan",
      dept: "Dept of CSD"
    },
    {
      img: akhil,
      name: "Syed Akheel Hassan Gori",
      dept: "Dept of CST"
    }
  ];
  const facultyLength = facultyList.length;

  // Auto swap every 2 seconds
  useEffect(() => {
  const interval = setInterval(() => {
    setFacultyIndex(prev => (prev + 1) % facultyLength);
  }, 2000);

  return () => clearInterval(interval);
}, [facultyLength]);

  // Swipe Support
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = startX.current - e.changedTouches[0].clientX;

    if (diff > 50) {
      setFacultyIndex(prev => (prev + 1) % facultyList.length);
    } else if (diff < -50) {
      setFacultyIndex(prev =>
        (prev - 1 + facultyList.length) % facultyList.length
      );
    }
  };

  /* ================= STUDENT COORDINATORS ================= */

  const [coordinators, setCoordinators] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/coordinators")
      .then(res => res.json())
      .then(data => setCoordinators(data))
      .catch(err => console.error("Coordinator fetch error", err));
  }, []);

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

        {/* ================= FACULTY ================= */}
        <section className="faculty-section">
  <h3>Faculty Co-ordinators</h3>

  <div
    className="faculty-carousel-wrapper"
    onTouchStart={handleTouchStart}
    onTouchEnd={handleTouchEnd}
  >
    <div
      className="faculty-carousel"
      style={{
        transform: `translateX(-${facultyIndex * 100}%)`
      }}
    >
      {facultyList.map((faculty, index) => (
        <div className="faculty-card" key={index}>
          <img src={faculty.img} alt={faculty.name} />
          <h4>{faculty.name}</h4>
          <span>Assistant Professor</span><br />
          <span>{faculty.dept}</span>
        </div>
      ))}
    </div>
  </div>
</section>

        <hr />

        {/* ================= STUDENT COORDINATORS ================= */}
        <section className="faculty-section">
          <h3>Students Driving A.C.E Club Operations</h3>

          {[
  ["president", "President"],
  ["vice_president", "Vice President"],
  ["secretary", "Secretary"],
  ["joint_secretary", "Joint Secretary"],
  ["operational_head", "Operational Head"],
  ["promotional_head", "Promotional Head"],
  ["social_media_head", "Social Media Head"],
  ["campus_radio_head", "Campus Radio Head"],
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