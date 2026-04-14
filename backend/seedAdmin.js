const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/user");
require("dotenv").config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("MongoDB connected");
};

const seedAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({ email: "admin@gmail.com" });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();

    console.log("Admin created successfully");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedAdmin();