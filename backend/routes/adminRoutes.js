const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");

// Create Admin
router.post("/create-admin", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    res.json({ message: "Admin created", admin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;