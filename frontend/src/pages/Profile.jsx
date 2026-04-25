import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaCheck, FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(userData);
  const [editField, setEditField] = useState(null); // name ya email

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    window.dispatchEvent(new Event("userUpdated"));
    setEditField(null);
    toast.success("Profile Updated!");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("User Logout Successfully!");
    navigate("/login");
  };

  return (
    <div className="auth-bg">
      <div className="auth-card text-center">

        {/* USER ICON */}
        <FaUserCircle size={70} className="mb-3" />

        <h2 className="title">My Profile</h2>
        <p className="subtitle">Manage your account</p>

        {/* NAME */}
        <div className="profile-row">
          <label>Name :</label>

          {editField === "name" ? (
            <>
              <input
                type="text"
                name="name"
                value={user?.name || ""}
                onChange={handleChange}
              />
              <FaCheck className="icon save" onClick={handleSave} />
            </>
          ) : (
            <>
              <span>{user?.name}</span>
              <FaEdit className="icon edit" onClick={() => setEditField("name")} />
            </>
          )}
        </div>

        {/* EMAIL */}
        <div className="profile-row">
          <label>Email:</label>

          {editField === "email" ? (
            <>
              <input
                type="email"
                name="email"
                value={user?.email || ""}
                onChange={handleChange}
              />
              <FaCheck className="icon save" onClick={handleSave} />
            </>
          ) : (
            <>
              <span>{user?.email}</span>
              <FaEdit className="icon edit" onClick={() => setEditField("email")} />
            </>
          )}
        </div>

        {/* ROLE */}
        <div className="profile-row">
          <label>Role :</label>
          <span>{user?.role}</span>
        </div>

        {/* LOGOUT */}
        <button className="logout-btn mt-3" onClick={handleLogout}>
          Logout
        </button>

      </div>
    </div>
  );
};

export default Profile;