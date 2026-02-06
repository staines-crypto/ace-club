import { Link, NavLink } from "react-router-dom";

import { useState } from "react";
import "./Navbar.css";
import logo from "../assets/Logo1.png";
import adminLogo from "../assets/admin-logo.png";

function Navbar() {
const [showNews, setShowNews] = useState(false);

return (
    <nav className="navbar">
    <div className="nav-logo">
  <img src={logo} alt="ACE Club Logo" />
  <span>A.C.E CLUB</span>
</div>


    <ul className="nav-links">
        <li><Link to="/">Home</Link></li>

        <li className="dropdown">
        <span
            className="dropbtn"
            onClick={() => setShowNews(!showNews)}
        >
            News
        </span>

        {showNews && (
            <div className="dropdown-content">
            <Link to="/news/technical" onClick={() => setShowNews(false)}>
                Technical
            </Link>
            <Link to="/news/non-technical" onClick={() => setShowNews(false)}>
                Non-Technical
            </Link>
            </div>
        )}
        </li>

        <li><Link to="/magazine">Magazine</Link></li>
        <li><Link to="/stories">Stories</Link></li>
        <li>
<NavLink to="/admin" className="admin-link">
  <img src={adminLogo} alt="Admin" className="admin-icon" />
</NavLink>
    

</li>

    </ul>
    </nav>
);
}

export default Navbar;
