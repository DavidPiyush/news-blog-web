import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "Comment can not be empty!"],
    trim: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  likes: {
    type: Number,
    default: 0,
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
    ref: "Comment",
    default: null,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
export default Comment;
