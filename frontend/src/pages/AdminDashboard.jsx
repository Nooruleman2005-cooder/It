import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { toast } from "react-toastify";
import {
  FaUsers,
  FaBoxOpen,
  FaExclamationCircle,
  FaClipboardList,
  FaBell,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [reports, setReports] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const unreadCount = notifications.filter(n => !n.isRead).length;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // ================= FETCH FUNCTIONS =================

  const fetchVolunteers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/volunteer/volunteers`,
        config
      );
      setVolunteers(res.data || []);
    } catch {
      toast.error("Failed to load volunteers!");
    }
  };

  const fetchReports = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/lostfound/all`,
        config
      );
      setReports(res.data || []);
    } catch {
      toast.error("Failed to load reports!");
    }
  };

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/complaint/all`,
        config
      );
      setComplaints(res.data || []);
    } catch {
      toast.error("Failed to load complaints!");
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/notification/my`,
        config
      );
      setNotifications(res.data || []);
    } catch (error) {
      console.log("Notification error:", error);
    }
  };

  useEffect(() => {
    fetchVolunteers();
    fetchReports();
    fetchComplaints();
    fetchNotifications();
  }, []);

  // ================= UPDATE STATUS =================

  const updateVolunteerStatus = async (id, status) => {
    try {
      setUpdatingId(id);

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/volunteer/volunteer/${id}/status`,
        { status },
        config
      );

      toast.success(`Volunteer ${status} successfully!`);
      fetchVolunteers();
      fetchNotifications();
    } catch {
      toast.error("Failed to update volunteer!");
    } finally {
      setUpdatingId(null);
    }
  };

  const updateReportStatus = async (id) => {
    try {
      setUpdatingId(id);

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/lostfound/update/${id}/status`,
        { status: "Found" },
        config
      );

      toast.success("Report Marked As Found!");
      fetchReports();
      fetchNotifications();
    } catch {
      toast.error("Failed to update report!");
    } finally {
      setUpdatingId(null);
    }
  };

  const updateComplaintStatus = async (id) => {
    try {
      setUpdatingId(id);

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/complaint/${id}/status`,
        { status: "Resolved" },
        config
      );

      toast.success("Complaint Resolved Successfully!");
      fetchComplaints();
      fetchNotifications();
    } catch {
      toast.error("Failed to resolve complaint!");
    } finally {
      setUpdatingId(null);
    }
  };

  // ================= BADGE =================

  const getBadge = (status) => {
    if (status === "Pending") return "badge bg-warning text-dark";
    if (status === "Approved") return "badge bg-success";
    if (status === "Rejected") return "badge bg-danger";
    if (status === "Resolved") return "badge bg-primary";
    if (status === "Found") return "badge bg-success";
    return "badge bg-secondary";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Admin Logged Out Successfully!");
    navigate("/");
  };

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
    <div className="admin-container">
      {/* ================= HEADER ================= */}
      <div className="admin-header d-flex justify-content-between align-items-center mb-3">

        {/* LEFT SIDE */}
        <div>
          <h2>Admin Panel</h2>
          <p>Manage Reports, Complaints & Volunteers</p>
        </div>

        {/* RIGHT SIDE */}
        <div className="d-flex align-items-center gap-3 position-relative">

          {/*  Bell */}
          <div style={{ position: "relative" }}>
            <FaBell
              size={22}
              style={{ cursor: "pointer" }}
              onClick={() => setShowModal(true)}
            />

            {unreadCount > 0 && (
              <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                {unreadCount}
              </span>
            )}
          </div>

          {/*  Logout */}
          <button className="btn btn-danger" onClick={handleLogout}>
            <FaSignOutAlt className="me-2" />
            Logout
          </button>

        </div>
      </div>
      {/* ================= CARDS ================= */}
      <div className="admin-cards">
        <div className="card-box text-center">
          <FaUsers size={30} className="admin-card-icon mb-2" />
          <h4>Volunteers</h4>
          <h2>{volunteers.length}</h2>
        </div>

        <div className="card-box text-center">
          <FaBoxOpen size={30} className="admin-card-icon mb-2" />
          <h4>Reports</h4>
          <h2>{reports.length}</h2>
        </div>

        <div className="card-box text-center">
          <FaExclamationCircle size={30} className="admin-card-icon mb-2" />
          <h4>Complaints</h4>
          <h2>{complaints.length}</h2>
        </div>
      </div>

      {/* ================= VOLUNTEERS TABLE ================= */}
      <h3 className="mt-4">
        <FaClipboardList className="me-2" />
        Volunteers
      </h3>

      {volunteers.length === 0 ? (
        <p>No volunteers found</p>
      ) : (
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Event</th>
                <th>Availability</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map((v) => (
                <tr key={v._id}>
                  <td>{v.userId?.name}</td>
                  <td>{v.userId?.email}</td>
                  <td>{v.event}</td>
                  <td>{v.availability}</td>
                  <td>
                    <span className={getBadge(v.status)}>
                      {v.status}
                    </span>
                  </td>
                  <td>
                    {v.status === "Pending" && (
                      <>
                        <button
                          className="btn-approve"
                          disabled={updatingId === v._id}
                          onClick={() =>
                            updateVolunteerStatus(v._id, "Approved")
                          }
                        >
                          {updatingId === v._id ? "Updating..." : "Approve"}
                        </button>

                        <button
                          className="btn-reject"
                          disabled={updatingId === v._id}
                          onClick={() =>
                            updateVolunteerStatus(v._id, "Rejected")
                          }
                        >
                          {updatingId === v._id ? "Updating..." : "Reject"}
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= REPORTS TABLE ================= */}
      <h3 className="mt-4">
        <FaClipboardList className="me-2" />
        Reports
      </h3>

      {reports.length === 0 ? (
        <p>No reports found</p>
      ) : (
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r._id}>
                  <td>{r.title}</td>
                  <td>{r.description}</td>
                  <td>
                    <span className={getBadge(r.status)}>
                      {r.status}
                    </span>
                  </td>
                  <td>
                    {r.status === "Pending" && (
                      <button
                        className="btn-approve"
                        disabled={updatingId === r._id}
                        onClick={() => updateReportStatus(r._id)}
                      >
                        {updatingId === r._id
                          ? "Updating..."
                          : "Mark Found"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= COMPLAINTS TABLE ================= */}
      <h3 className="mt-4">
        <FaClipboardList className="me-2" />
        Complaints
      </h3>

      {complaints.length === 0 ? (
        <p>No complaints found</p>
      ) : (
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => (
                <tr key={c._id}>
                  <td>{c.title}</td>
                  <td>{c.description}</td>
                  <td>
                    <span className={getBadge(c.status)}>
                      {c.status}
                    </span>
                  </td>
                  <td>
                    {c.status === "Pending" && (
                      <button
                        className="btn-approve"
                        disabled={updatingId === c._id}
                        onClick={() =>
                          updateComplaintStatus(c._id)
                        }
                      >
                        {updatingId === c._id
                          ? "Resolving..."
                          : "Resolve"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Notifications</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body" style={{ maxHeight: "400px", overflowY: "auto" }}>
                {notifications.length === 0 ? (
                  <p className="text-center">No notifications</p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n._id}
                      className="border rounded p-2 mb-2 d-flex justify-content-between align-items-center"
                    >
                      <span>{n.message}</span>

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

export default AdminDashboard;