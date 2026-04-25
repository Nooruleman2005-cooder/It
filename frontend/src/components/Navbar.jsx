import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import logo from "../assets/it.png";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("User Logout Successfully!");
    navigate("/login");
  };

  return (
    <nav className="custom-navbar navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid px-4">

        {/* BRAND */}
        <Link className="navbar-brand fw-bold brand-text" to="/">
          <img src={logo} alt="logo" className="nav-logo" />
        </Link>

        {/* ☰ TOGGLER */}
        <button
          className="navbar-toggler "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* LINKS */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-3">

            <li className="nav-item">
              <Link className="nav-link nav-custom" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link nav-custom" to="/about">
                About Us
              </Link>
            </li>

            {token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link nav-custom" to="/profile">
                    <FaUserCircle size={20} />
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link nav-custom" to="/dashboard">
                    Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <button className="logout-btn" onClick={handleLogout}>
                    <FaSignOutAlt className="me-2" />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link nav-custom" to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="signup-btn" to="/signup">
                    Signup
                  </Link>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;