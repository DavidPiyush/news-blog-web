import mongoose from "mongoose";


const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["new", "seen"], // 'new' for unread notifications, 'seen' for read
      default: "new",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const Notification = mongoose.models?.Notification || mongoose.model("Notification", notificationSchema);

export default Notification;
