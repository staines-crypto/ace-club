import "./Footer.css";
import { FaInstagram, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>A.C.E Club – Sri Vasavi</h3>
          <p>VOICE OF VASAVI</p>
          <p className="tagline">Articulate • Create • Express</p>
        </div>

        {/* CONTACT SECTION */}
        <div className="footer-section">
          <h4>Contact</h4>

          <div className="contact-item">
            <FaInstagram className="icon insta" />
            <a
              href="https://www.instagram.com/ace_.club._?igsh=MTdwMzFrcnhsM3h0"
              target="_blank"
              rel="noopener noreferrer"
            >
              ace_.club._
            </a>
          </div>

          <div className="contact-item">
  <FaEnvelope className="icon mail" />
  <a href="mailto:aceclub2k26@gmail.com">
    aceclub2k26@gmail.com
  </a>
</div>

        </div>

        <div className="footer-section">
          <h4>College</h4>
          <p>Sri Vasavi Engineering College</p>
          <p>Tadepalligudem</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} A.C.E Club – Sri Vasavi. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
