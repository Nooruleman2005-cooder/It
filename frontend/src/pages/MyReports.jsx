import { useState, useEffect } from "react";
import axios from "axios";

const MyReports = () => {

  const [items, setItems] = useState([]);
  const token = localStorage.getItem("token");

  const loadItems = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/lostfound/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data || []);
    } catch (err) {
      console.log(err);
      setItems([]);
    }
  };

  useEffect(() => {
  loadItems();

  window.addEventListener("focus", loadItems);

  return () => {
    window.removeEventListener("focus", loadItems);
  };
}, []);

  return (
    <div>
      <h3 className="mb-4">My Reports</h3>

      {items.length === 0 && <p>No reports submitted yet</p>}

      <div className="row">
        {items.map((item) => (
          <div key={item._id} className="col-md-4 mb-3">
            <div className="lf-card p-3 shadow-sm h-100">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="img-fluid mb-2"
                  style={{ maxHeight: "150px", objectFit: "cover", width: "100%" }}
                />
              )}
              <h5 className="mb-1">Title:</h5>
              <p className="mb-2">{item.title || "No Title"}</p>
              <h5 className="mb-1">Description:</h5>
              <p className="mb-3">{item.description || "No Description"}</p>
              <span
                className={`badge ${
                  item.status?.toLowerCase() === "pending"
                    ? "bg-warning"
                    : item.status?.toLowerCase() === "resolved"
                    ? "bg-success"
                    : "bg-primary"
                }`}
              >
                {item.status || "Unknown"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReports;