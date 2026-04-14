const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");

const Complaint = require("../models/complaint");
const Notification = require("../models/notification");
const User = require("../models/user");

// ================= USER: CREATE =================
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "All fields required" });
    }

    const complaint = await Complaint.create({
      userId: req.user._id,
      title,
      description,
      status: "Pending"
    });

    // ================= NOTIFICATION (ADMIN) =================
    const admins = await User.find({ role: "admin" });

    for (let admin of admins) {
      await Notification.create({
        user: admin._id,
        message: `New complaint received: ${title}`,
        type: "complaint"
      });
    }

    res.status(201).json({
      message: "Complaint submitted",
      complaint,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= USER: OWN =================
router.get("/my", verifyToken, async (req, res) => {
  try {
    const complaints = await Complaint.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= ADMIN: ALL =================
router.get("/all", verifyAdmin, async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= ADMIN: UPDATE STATUS =================
router.patch("/:id/status", verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = status;
    await complaint.save();

    // ================= NOTIFICATION (USER) =================
    await Notification.create({
      user: complaint.userId,
      message: `Your complaint has been ${status}`,
      type: "complaint"
    });

    res.json({
      message: "Status updated",
      complaint,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;