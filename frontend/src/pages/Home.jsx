import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="about-bg">
      <div className="container text-white py-5">

        {/* SLIDER */}
        <div id="homeCarousel" className="carousel slide mb-5" data-bs-ride="carousel">

          <div className="carousel-inner rounded overflow-hidden">

            {/* SLIDE 1 */}
            <div className="carousel-item active">
              <div className="slider-overlay"></div>
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
                className="d-block w-100"
                style={{ height: "400px", objectFit: "cover" }}
                alt="slide1"
              />
              <div className="carousel-caption">
                <h2 className="fw-bold">Smart Campus System</h2>
                <p>Manage everything in one place</p>
              </div>
            </div>

            {/* SLIDE 2 */}
            <div className="carousel-item">
              <div className="slider-overlay"></div>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978"
                className="d-block w-100"
                style={{ height: "400px", objectFit: "cover" }}
                alt="slide2"
              />
              <div className="carousel-caption">
                <h2 className="fw-bold">Report & Track Complaints</h2>
                <p>Fast and transparent system</p>
              </div>
            </div>

            {/* SLIDE 3 */}
            <div className="carousel-item">
              <div className="slider-overlay"></div>
              <img
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
                className="d-block w-100"
                style={{ height: "400px", objectFit: "cover" }}
                alt="slide3"
              />
              <div className="carousel-caption">
                <h2 className="fw-bold">Community & Volunteers</h2>
                <p>Help and grow together</p>
              </div>
            </div>

          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>

          <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>

        </div>

        {/* HERO */}
        <div className="text-center mb-5">
          <h1 className="fw-bold display-5">Welcome to Tech Connect Hub</h1>
          <p className="mt-3 px-3 fs-5 text-light">
            A smart platform to manage complaints, track lost items, and connect volunteers — all in one place.
          </p>
        </div>

        {/* CARDS */}
        <div className="row g-4 mb-5">

          <div className="col-md-4">
            <div className="home-card">
              <h4>Lost & Found</h4>
              <p>Report lost items or help others find theirs quickly.</p>
              <Link to="/lostfound" className="signup-btn">Explore</Link>
            </div>
          </div>

          <div className="col-md-4">
            <div className="home-card">
              <h4>Complaints</h4>
              <p>Submit complaints and track resolution in real-time.</p>
              <Link to="/complaint" className="signup-btn">Explore</Link>
            </div>
          </div>

          <div className="col-md-4">
            <div className="home-card">
              <h4>Volunteer</h4>
              <p>Join volunteer programs and support your community.</p>
              <Link to="/volunteer" className="signup-btn">Explore</Link>
            </div>
          </div>

        </div>

        {/*  EXTRA SECTION */}
        <div className="text-center mt-5">
          <h2 className="fw-bold mb-3">Why Choose Tech Connect Hub?</h2>
          <p className="text-white px-3">
            Our platform is designed to simplify campus life with modern technology,
            fast communication, and community engagement.
          </p>
        </div>

        <div className="row g-4 mt-4">

          <div className="col-md-4">
            <div className="glass-card text-center">
              <h5>⚡ Fast System</h5>
              <p>Quick complaint resolution and instant updates.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="glass-card text-center">
              <h5>🔒 Secure</h5>
              <p>Your data is protected with authentication system.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="glass-card text-center">
              <h5>🌍 Community</h5>
              <p>Connect with volunteers and help others.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Home;