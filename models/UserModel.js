import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email validation regex
    },
    profilePicture: {
      type: String,
      default: "/default.png",
    },
    profession: {
      type: String,
      trim: true,
      minlength: 3,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"], // Only these values allowed
      required: true, // Make gender a required field
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 500, // Fixed typo
      default: "This author has not yet written a bio",
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phoneNumber: {
      type: String,
      unique: true,
      validate: {
        validator: function (v) {
          return /\d{10}/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    address: {
      type: String,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["admin", "author", "reader", "contributor", "manager", "editor"],
      default: "reader",
    },

    socialLinks: {
      type: Map, // Flexible map for key-value pairs
      of: String,
      default: {}, // Default value to prevent undefined
    },

    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Model Creation
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
