import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>A.C.E Club – Sri Vasavi</h3>
          <p>VOICE OF VASAVI</p>
          <p className="tagline">Articulate • Create • Express</p>
        </div>

        <div className="footer-section">
          <h4>CONTACT Link</h4>
          <ul>
            <a href="https://www.instagram.com/ace_.club._?igsh=MTdwMzFrcnhsM3h0">ace_.club._</a>
            
          </ul>
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
