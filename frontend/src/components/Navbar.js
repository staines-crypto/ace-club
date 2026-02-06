import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
import logo from "../assets/Logo1.png";
import adminLogo from "../assets/admin-logo.png";

function Navbar() {
  const [showNews, setShowNews] = useState(false);

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="nav-logo">
        <img src={logo} alt="ACE Club Logo" />

        <div className="logo-text">
          <span className="club-name">A.C.E CLUB</span>
          <span className="college-name">
            Sri Vasavi Engineering College
          </span>
        </div>
      </div>

      {/* NAV LINKS */}
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        {/* NEWS DROPDOWN */}
        <li className="dropdown">
          <span
            className="dropbtn"
            onClick={() => setShowNews((prev) => !prev)}
          >
            News
          </span>

          {showNews && (
            <div className="dropdown-content">
              <Link
                to="/news/technical"
                onClick={() => setShowNews(false)}
              >
                Technical
              </Link>
              <Link
                to="/news/non-technical"
                onClick={() => setShowNews(false)}
              >
                Non-Technical
              </Link>
            </div>
          )}
        </li>

        <li>
          <Link to="/magazine">Magazine</Link>
        </li>

        <li>
          <Link to="/stories">Stories</Link>
        </li>

        <li>
          <Link to="/events">Events</Link>
        </li>


      </ul>
    </nav>
  );
}

export default Navbar;
