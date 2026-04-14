const LostFound = require("../models/loast&Found");
const Notification = require("../models/notification");
const User = require("../models/user");

// ================= CREATE ITEM =================
exports.createItem = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title & description required" });
    }

    const item = new LostFound({
      title,
      description,
      img: req.file ? req.file.path : null,
      user: req.user._id,
      status: "Pending"
    });

    await item.save();

    // 🔥 ADMIN NOTIFICATION (IMPORTANT ADD)
    const admins = await User.find({ role: "admin" });

    for (let admin of admins) {
      await Notification.create({
        user: admin._id,
        message: `New Lost & Found Report: ${item.title}`,
        type: "report"
      });
    }

    res.status(201).json({
      message: "Item created successfully",
      item,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= USER ITEMS =================
exports.getMyItems = async (req, res) => {
  try {
    const items = await LostFound.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= ADMIN ALL ITEMS =================
exports.getAllItems = async (req, res) => {
  try {
    const items = await LostFound.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= UPDATE STATUS + NOTIFICATION =================
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const item = await LostFound.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.status = status;
    await item.save();

    // ================= NOTIFICATION =================
    await Notification.create({
      user: item.user,
      message: `Your lost item has been marked as ${status}`,
      type: "report"
    });

    res.json({
      message: "Status updated successfully",
      item,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};