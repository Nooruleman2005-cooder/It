import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { toast } from "react-toastify";

const Volunteer = () => {

  const [event, setEvent] = useState("");
  const [availability, setAvailability] = useState("");
  const [myRequest, setMyRequest] = useState(null);

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const EVENTS = [
    "Community Clean-Up",
    "Tree Plantation",
    "Blood Donation",
    "Food Drive",
  ];

  const submitRequest = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/volunteer/register`,
        { event, availability },
        config
      );

      setMyRequest(res.data.volunteer);
      toast.success("Volunteer Request Submitted!");

      setEvent("");
      setAvailability("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error Submitting Request!");
    }
  };

  const fetchMyRequest = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/volunteer/my-request`,
        config
      );
      setMyRequest(res.data);
    } catch {
      setMyRequest(null);
    }
  };

  useEffect(() => {
  fetchMyRequest();

  window.addEventListener("focus", fetchMyRequest);

  return () => {
    window.removeEventListener("focus", fetchMyRequest);
  };
}, []);
  

  return (
    <div className="auth-card" style={{ width: "500px", margin: "30px auto" }}>
      <h2 className="title">Volunteer Form</h2>

      {!myRequest ? (
        <form onSubmit={submitRequest}>
          <label>Event</label>
          <select
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            required
          >
            <option value="">-- Select Event --</option>
            {EVENTS.map((ev) => (
              <option key={ev} value={ev}>
                {ev}
              </option>
            ))}
          </select>

          <label>Availability</label>
          <input
            type="text"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            placeholder="Weekends / Evenings"
            required
          />

          <button type="submit">Submit Request</button>
        </form>
      ) : (
        <div className="request-card">
          <p>
            <strong>Event:</strong> {myRequest.event}
          </p>
          <p>
            <strong>Availability:</strong> {myRequest.availability}
          </p>
          <p>
            <strong>Status:</strong> {myRequest.status}
          </p>
        </div>
      )}
    </div>
  );
};

export default Volunteer;