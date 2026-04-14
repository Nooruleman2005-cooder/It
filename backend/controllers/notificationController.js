import Volunteer from "../models/volunteer.js";
import Notification from "../models/notification.js";
import User from "../models/user.js";

// ================= UPDATE VOLUNTEER STATUS =================
export const updateVolunteerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const volunteer = await Volunteer.findById(id).populate("userId");

    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer request not found" });
    }

    volunteer.status = status;
    await volunteer.save();

    // ================= NOTIFICATION =================

    await Notification.create({
      user: volunteer.userId._id,
      message: `Your volunteer request has been ${status}`,
      type: "volunteer",
    });

    return res.status(200).json({
      message: "Volunteer status updated successfully",
      volunteer,
    });

  } catch (error) {
    console.log("Update Volunteer Error:", error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};