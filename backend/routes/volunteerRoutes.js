const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");

const Volunteer = require("../models/volunteer");
const Notification = require("../models/notification");
const User = require("../models/user");


// ================== USER: CREATE VOLUNTEER REQUEST ==================
router.post("/register", verifyToken, async (req, res) => {
  try {
    const { event, availability } = req.body;

    if (!event || !availability) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Volunteer.findOne({ userId: req.user._id });

    if (existing) {
      return res.status(400).json({
        message: "You already submitted a volunteer request",
      });
    }

    const volunteer = await Volunteer.create({
      name: req.user.name,
      userId: req.user._id,
      event,
      availability,
      status: "Pending",
    });

    // ================= NOTIFICATION (ADMIN) =================
    const admins = await User.find({ role: "admin" });

    for (let admin of admins) {
      await Notification.create({
        user: admin._id,
        message: `New volunteer request for ${event}`,
        type: "volunteer"
      });
    }

    res.status(201).json({
      message: "Volunteer request submitted successfully",
      volunteer,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ================== USER: GET OWN REQUEST ==================
router.get("/my-request", verifyToken, async (req, res) => {
  try {
    const volunteer = await Volunteer.findOne({
      userId: req.user._id,
    }).populate("userId", "name email");

    if (!volunteer) {
      return res.status(404).json({ message: "No request found" });
    }

    res.json(volunteer);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ================== ADMIN: GET ALL REQUESTS ==================
router.get("/volunteers", verifyAdmin, async (req, res) => {
  try {
    const volunteers = await Volunteer.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(volunteers);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ================== ADMIN: UPDATE STATUS ==================
router.patch("/volunteer/:id/status", verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = ["Pending", "Approved", "Rejected"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const volunteer = await Volunteer.findById(req.params.id);

    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    volunteer.status = status;
    await volunteer.save();

    // ================= NOTIFICATION (USER) =================
    await Notification.create({
      user: volunteer.userId,
      message: `Your volunteer request has been ${status}`,
      type: "volunteer"
    });

    res.json({
      message: "Status updated successfully",
      volunteer,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;