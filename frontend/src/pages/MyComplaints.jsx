import React, { useState, useEffect } from "react";
import axios from "axios";

const MyComplaints = () => {

  const [complaints, setComplaints] = useState([]);
  const token = localStorage.getItem("token");

  const loadComplaints = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/complaint/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComplaints(res.data || []);
    } catch (err) {
      console.log(err);
      setComplaints([]);
    }
  };

useEffect(() => {
  loadComplaints();

  window.addEventListener("focus", loadComplaints);

  return () => {
    window.removeEventListener("focus", loadComplaints);
  };
}, []);

  return (
    <div>
      <h3 className="mb-4">My Complaints</h3>

      {complaints.length === 0 && <p>No complaints submitted yet.</p>}

      <div className="row">
        {complaints.map((c) => (
          <div key={c._id} className="col-md-4 mb-3">
            <div className="lf-card p-3 shadow-sm h-100">
              <h5 className="mb-1">Title:</h5>
              <p className="mb-2">{c.title || "No Title"}</p>
              <h5 className="mb-1">Description:</h5>
              <p className="mb-3">{c.description || "No Description"}</p>
              <span
                className={`badge ${
                  c.status?.toLowerCase() === "pending"
                    ? "bg-warning"
                    : c.status?.toLowerCase() === "resolved"
                    ? "bg-success"
                    : "bg-primary"
                }`}
              >
                {c.status || "Unknown"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyComplaints;