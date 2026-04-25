import React from "react";

const AboutUs = () => {
  return (
    <div className="about-bg">

      <div className="container text-white mt-3 mb-5">

        {/* HERO */}
        <div className="text-center mb-5">
          <h1 className="fw-bold">Tech Connect Hub</h1>
          <p className="mt-3 px-3">
            A smart community platform where people can report lost items,
            find belongings, raise complaints, and help others through volunteering.
          </p>
        </div>

        {/* MISSION */}
        <div className="mb-5">
          <h3>Our Mission</h3>
          <p className="mt-2">
            We aim to build a trusted digital network where users can quickly
            report lost & found items, submit complaints, and support each other.
          </p>
        </div>

        {/* FEATURES */}
        <div className="mb-5">
          <h3>What You Can Do Here</h3>

          <p className="mt-2">
            🔎 Report Lost & Found Items<br />
            📝 Submit Complaints<br />
            🤝 Send Volunteer Requests<br />
            📢 Track updates in real-time<br />
            🔐 Secure user system
          </p>
        </div>

        {/* HOW IT WORKS */}
        <div className="mb-5">
          <h3>How It Works</h3>
          <p className="mt-2">
            Sign up → Submit report → Admin reviews → Updates → Volunteers help recover.
          </p>
        </div>

        {/* WHY US */}
        <div className="mb-5">
          <h3>Why Tech Connect Hub?</h3>
          <p className="mt-2">
            Fast, simple, and community-driven platform that connects people instantly.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;