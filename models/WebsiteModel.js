// const mongoose = require("mongoose");

// const generalSettingsSchema = new mongoose.Schema(
//   {
//     websiteName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     contactPhone: {
//       type: String,
//       required: true,
//       validate: {
//         validator: function (v) {
//           return /^[0-9]{10,15}$/.test(v); // Validates phone number (10-15 digits)
//         },
//         message: (props) => `${props.value} is not a valid phone number!`,
//       },
//     },
//     footerText: {
//       type: String,
//       trim: true,
//     },
//     defaultLanguage: {
//       type: String,
//       enum: ["English", "Hindi", "Spanish", "French"], // Restricts to allowed languages
//       default: "English",
//     },
//     timeZone: {
//       type: String,
//       enum: ["UTC", "Asia/Kolkata", "America/New_York", "Europe/London"], // Restricts to allowed time zones
//       default: "UTC",
//     },
//     socialMediaLinks: {
//       type: Map,
//       of: String, // A map where keys are platform names and values are URLs
//       validate: {
//         validator: function (links) {
//           for (let value of links.values()) {
//             if (!/^https?:\/\/[^\s$.?#].[^\s]*$/.test(value)) {
//               return false; // Validates URL format
//             }
//           }
//           return true;
//         },
//         message: (props) => `One or more social media links are invalid!`,
//       },
//     },
//   },
//   {
//     timestamps: true, // Adds createdAt and updatedAt fields
//   }
// );

// const User = mongoose.models.User || mongoose.model("User", userSchema);
// export default User;
