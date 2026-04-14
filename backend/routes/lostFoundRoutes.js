const express = require("express");
const router = express.Router();

const multer = require("multer");

const { verifyToken } = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");

const {
  createItem,
  getMyItems,
  getAllItems,
  updateStatus,
} = require("../controllers/lostFounfController");

// ================= MULTER =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// ================= USER =================
router.post("/", verifyToken, upload.single("image"), createItem);

router.get("/my", verifyToken, getMyItems);

// ================= ADMIN =================
router.get("/all", verifyAdmin, getAllItems);

router.patch("/update/:id/status", verifyAdmin, updateStatus);

module.exports = router;