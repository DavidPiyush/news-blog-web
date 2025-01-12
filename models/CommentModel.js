import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, "Comment cannot be empty!"],
    trim: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article", // Assuming you're linking to the Article model
    required: true, // Ensures every comment is linked to a post
  },
  website: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  name: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  parentCommentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment", // Links to the Comment model for replies
    default: null, // If null, it's a root comment
  },
  saveInfo: {
    type: Boolean,
    default: false,
  },
});

// Add a pre-save hook to update the `updatedAt` field whenever a comment is updated
CommentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Comment =
  mongoose.models?.Comment || mongoose.model("Comment", CommentSchema);
export default Comment;
