import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import LostFound from "./pages/LostFound"
import PrivateRoute from "./components/PrivateRoute"
import Dashboard from "./pages/Dashboard";
import Complaint from "./pages/Complaint";
import Volunteer from "./pages/Volunteer";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./pages/AdminRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <>
     <ToastContainer position="top-center" autoClose={2000} />
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="/lostfound" element={<PrivateRoute><LostFound /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/complaint" element={<PrivateRoute><Complaint /></PrivateRoute>} />
          <Route path="/volunteer" element={<PrivateRoute><Volunteer /></PrivateRoute>} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>}/>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
