import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../App.css";
import { toast } from "react-toastify";

const Signup = () => {

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, form);
      console.log(response.data);
      console.log(response?.data?.message);
      toast.success("User Created Successfully!");
      navigate('/login');
    }
    catch (error) {
      console.log(error.response.data);
      toast.error(
      error.response?.data?.message || "Something Went Wrong!"
    );
    }
  }

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h2 className="title">Create Account</h2>
        <p className="subtitle">Join Saylani Mass IT Hub</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />

          <div className="password-field">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <span onClick={() => setShowPass(!showPass)}>
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit">Signup</button>
        </form>

        <p className="switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
