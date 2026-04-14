import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Complaint = ({ onSubmitted }) => {

  const [form, setForm] = useState({ title: "", description: "" });
  const token = localStorage.getItem("token");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/complaint`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success( "Complaint Submit Successfully!");


      console.log(res.data.message);
      setForm({ title: "", description: "" });

      if (onSubmitted) onSubmitted();
    } catch (err) {
      console.log(err);
      toast.error(err , "Error Submitting Complaint!");
    }
  };

  return (
    <div className="glass-section" style={{ maxWidth: "600px", margin: "30px auto" }}>
      <h2 className="mb-3">Submit Complaint</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter complaint title"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe your issue..."
          required
        ></textarea>

        <button type="submit" className="btn btn-primary w-100 mt-2">
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default Complaint;