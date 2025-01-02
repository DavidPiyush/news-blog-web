import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category must belong to name!"],
      unique: true,
      trim: true,
      maxlength: 100,
    },
    slug: String,

    description: {
      type: String,
      maxlength: 500,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Model Creation
const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
export default Category;
