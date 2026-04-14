import React, { useState, useEffect } from "react";
import LostFound from "../pages/LostFound";
import MyReports from "../pages/MyReports";
import MyComplaints from "../pages/MyComplaints";
import Complaint from "../pages/Complaint";
import Volunteer from "../pages/Volunteer";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { toast } from "react-toastify";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaFileAlt,
  FaBell,
  FaExclamationCircle,
  FaHandsHelping,
  FaSignOutAlt,
  FaClipboardList
} from "react-icons/fa";

const Dashboard = () => {

  const [activePage, setActivePage] = useState("dashboard");

  const [reports, setReports] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [myVolunteerRequest, setMyVolunteerRequest] = useState(null);

  const [userName, setUserName] = useState("");
  const [openNotif, setOpenNotif] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // ================= USER =================
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name || "User");
      } catch {
        setUserName("User");
      }
    }
  }, [token]);

  // ================= FETCH REPORTS =================
  const fetchReports = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/lostfound/my`,
        config
      );
      setReports(res.data || []);
    } catch {
      setReports([]);
    }
  };

  // ================= FETCH COMPLAINTS =================
  const fetchComplaints = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/complaint/my`,
        config
      );
      setComplaints(res.data || []);
    } catch {
      setComplaints([]);
    }
  };

  // ================= FETCH VOLUNTEER =================
  const fetchVolunteerRequest = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/volunteer/my-request`,
        config
      );
      setMyVolunteerRequest(res.data || null);
    } catch {
      setMyVolunteerRequest(null);
    }
  };

  // ================= FETCH NOTIFICATIONS =================
  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/notification/my`,
        config
      );
      setNotifications(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= FIRST LOAD =================
  useEffect(() => {
    if (!token) return;

    fetchReports();
    fetchComplaints();
    fetchVolunteerRequest();
    fetchNotifications();
  }, [token]);

  // ================= VOLUNTEER TAB REFRESH =================
  useEffect(() => {
    if (activePage === "volunteer") {
      fetchVolunteerRequest();
    }
  }, [activePage]);

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const totalReports = reports.length;
  const totalComplaints = complaints.length;
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const recentActivity = [...reports, ...complaints]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const markAsRead = async (id) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/notification/${id}/read`,
        {},
        config
      );

      fetchNotifications();
    } catch (err) {
      console.log("Mark read error", err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchNotifications();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="d-flex admin-user-main">

      {/* ================= SIDEBAR ================= */}
      <div className="sidebar">
        <h4>User Panel</h4>

        <ul className="nav flex-column">

          <li className="nav-item" onClick={() => setActivePage("dashboard")}>
            <FaTachometerAlt className="me-2" /> Dashboard
          </li>

          <li className="nav-item" onClick={() => setActivePage("lostfound")}>
            <FaBoxOpen className="me-2" /> Lost & Found
          </li>

          <li className="nav-item" onClick={() => setActivePage("myreports")}>
            <FaFileAlt className="me-2" /> My Reports
          </li>

          <li className="nav-item" onClick={() => setActivePage("complaints")}>
            <FaClipboardList className="me-2" /> Submit Complaint
          </li>

          <li className="nav-item" onClick={() => setActivePage("mycomplaints")}>
            <FaExclamationCircle className="me-2" /> My Complaints
          </li>

          <li className="nav-item" onClick={() => setActivePage("volunteer")}>
            <FaHandsHelping className="me-2" /> Volunteer
          </li>

          <li className="nav-item text-danger" onClick={handleLogout}>
            <FaSignOutAlt className="me-2" /> Logout
          </li>

        </ul>
      </div>

      {/* ================= MAIN ================= */}
      <div className="main-content">

        {/* ================= HEADER ================= */}
        <div className="d-flex justify-content-between align-items-center mb-3">

          <h2>Welcome, {userName}</h2>

          {/*  NOTIFICATION */}
          <div style={{ position: "relative" }}>
            <FaBell
              size={22}
              style={{ cursor: "pointer" }}
              onClick={() => setOpenNotif(!openNotif)}
            />

            {unreadCount > 0 && (
              <span className="notif-badge">
                {unreadCount}
              </span>
            )}
          </div>

        </div>

        {/* ================= DASHBOARD ================= */}
        {activePage === "dashboard" && (
          <>
            {/* CARDS */}
            <div className="row mb-4">

              <div className="col-md-4">
                <div className="glass-card text-center">
                  <FaFileAlt size={28} className="mb-2 card-icon" />
                  <h6>Total Reports</h6>
                  <h3>{totalReports}</h3>
                </div>
              </div>

              <div className="col-md-4">
                <div className="glass-card text-center">
                  <FaExclamationCircle size={28} className="mb-2 card-icon" />
                  <h6>Total Complaints</h6>
                  <h3>{totalComplaints}</h3>
                </div>
              </div>

              <div className="col-md-4">
                <div className="glass-card text-center">
                  <FaHandsHelping size={28} className="mb-2 card-icon" />
                  <h6>Volunteer Status</h6>

                  {myVolunteerRequest ? (
                    <span className={`status-badge ${myVolunteerRequest.status?.toLowerCase()}`}>
                      {myVolunteerRequest.status}
                    </span>
                  ) : (
                    <span className="text-muted">Not Applied</span>
                  )}

                </div>
              </div>

            </div>

            {/* RECENT */}
            <div className="glass-section">
              <h5>Recent Activity</h5>

              {recentActivity.length === 0 ? (
                <p>No recent activity</p>
              ) : (
                recentActivity.map((item) => (
                  <div key={item._id} className="glass-card-sm mb-2">
                    <h6>{item.title}</h6>
                    <p>{item.description}</p>
                    <span className={`status-badge ${item.status?.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* ROUTES */}
        {activePage === "lostfound" && (
          <LostFound onSubmitted={fetchReports} />
        )}
        {activePage === "myreports" && <MyReports />}
        {activePage === "complaints" && <Complaint onSubmitted={fetchComplaints} />}
         {activePage === "mycomplaints" && <MyComplaints complaints={complaints} />}

        {activePage === "volunteer" && (
          <div className="glass-section">
            {!myVolunteerRequest ? (
              <Volunteer onSubmitted={fetchVolunteerRequest} />
            ) : (
              <div className="glass-card">
                <h5>Your Request</h5>

                <p><b>Event:</b> {myVolunteerRequest.event}</p>
                <p><b>Availability:</b> {myVolunteerRequest.availability}</p>

                <p>
                  <b>Status:</b>{" "}
                  <span className={`status-badge ${myVolunteerRequest.status?.toLowerCase()}`}>
                    {myVolunteerRequest.status}
                  </span>
                </p>
              </div>
            )}
          </div>
        )}

      </div>
      {openNotif && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Notifications</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setOpenNotif(false)}
                ></button>
              </div>

              <div
                className="modal-body"
                style={{ maxHeight: "400px", overflowY: "auto" }}
              >
                {notifications.length === 0 ? (
                  <p className="text-center">No notifications</p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n._id}
                      className="border rounded p-2 mb-2 d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <p className="mb-1">{n.message}</p>
                        <small className="text-muted">{n.type}</small>
                      </div>

                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => markAsRead(n._id)}
                      >
                        ✓
                      </button>
                    </div>
                  ))
                )}
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;