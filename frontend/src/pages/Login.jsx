import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import "../App.css"
import { toast } from "react-toastify";

const Login = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, form);

      console.log(response.data);
      console.log(response?.data?.message);

      // Token save
      localStorage.setItem("token", response?.data?.token);

      // User info + role save
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: response.data.user.name,
          email: response.data.user.email,
          role: response.data.user.role
        })
      );

      // Role check karke navigate
      if (response.data.user.role === "admin") {
        toast.success("Admin Login Successfully!");
        navigate("/admin");
      } else {
        toast.success("User Login Successfully!");
        navigate("/dashboard"); // normal user dashboard
      }

    } catch (error) {
      console.log(error.response?.data);
      toast.error(
        error.response?.data?.message || "Invalid Email or Password!"
      );

    }
  };
  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h2 className="title">Welcome Back</h2>
        <p className="subtitle">Login to continue</p>

        <form onSubmit={handleSubmit}>
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

          <button type="submit">Login</button>
        </form>

        <p className="switch">
          Don’t have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
