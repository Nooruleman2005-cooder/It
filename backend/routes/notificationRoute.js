const express = require("express");
const router = express.Router();

const Notification = require("../models/notification");
const { verifyToken } = require("../middlewares/verifyToken");

router.get("/my", verifyToken , async (req, res) => {
  try {
    console.log("Logged in:", req.user._id);

    const notifications = await Notification.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    console.log("Found notifications:", notifications.length);

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id/read", verifyToken, async (req, res) => {
  const notif = await Notification.findById(req.params.id);

  if (!notif) return res.status(404).json({ message: "Not found" });

  notif.isRead = true;
  await notif.save();

  res.json({ message: "Marked as read" });
});

module.exports = router;