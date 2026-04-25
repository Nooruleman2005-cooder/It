import { useState } from "react";
import axios from "axios";
import "../App.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LostFound = (props) => {

  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", image: null });
  const token = localStorage.getItem("token");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) =>
    setForm({ ...form, image: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (form.image) formData.append("image", form.image);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/lostfound`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(res.data.message);
      toast.success("Report Submit Successfully!");
       navigate("/dashboard");

      setForm({ title: "", description: "", image: null });
      if (props.onSubmitted) {
        props.onSubmitted();
      }
    } catch (err) {
      console.log(err);
      toast.error(err, "Error Submiting Report!")
    }
  };

  return (
    <div className="about-bg text-white">
    <div className="glass-section" style={{ maxWidth: "650px", margin: "30px auto" }}>
      <h2 className="mb-3">Report Lost Item</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Item Title"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
        ></textarea>

        <input type="file" onChange={handleFile} />

        <button type="submit" className="btn btn-primary w-100 mt-3">
          Submit Report
        </button>
      </form>
    </div>
    </div>
  );
};

export default LostFound;