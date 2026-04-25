import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="custom-footer py-5 ">

      <div className="container">

        <div className="row">

          {/* BRAND */}
          <div className="col-md-4 mb-3">
            <h4 className="footer-brand">Tech Connect Hub</h4>
            <p className="footer-text">
              A smart platform for lost & found items, complaints and volunteer support.
            </p>
          </div>

          {/* LINKS */}
          <div className="col-md-4 mb-3">
            <h5 className="footer-title">Quick Links</h5>
            <Link className="nav-link nav-custom footer-text" to="/">Home</Link>
            <Link className="nav-link nav-custom footer-text" to="/about">About Us</Link>
            <Link className="nav-link nav-custom footer-text" to="/dashboard">Dashboard</Link>

          </div>

          {/* SOCIAL */}
          <div className="col-md-4 mb-3">
            <h5 className="footer-title">Follow Us</h5>

            <div className="d-flex gap-3 mt-2">
              <FaFacebook size={20} />
              <FaInstagram size={20} />
              <FaGithub size={20} />
            </div>

            <p className="footer-text mt-3">
              © {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;