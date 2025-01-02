import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A article must have a title"],
      trim: true,
      maxlength: 200, // Title limit to 200 characters
    },
    subTitle: {
      type: String,
      required: [true, "A article must have a title subtitle"],
      trim: true,
      maxlength: 200,
    },
    slug: { type: String, trim: true },

    content: {
      type: String,
      required: true, // Main content of the article
      required: [true, "A article must have a title content"],
    },
    summary: {
      type: String,
      trim: true,
    },
    coverImage: {
      type: String, // URL for the cover image
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    categories: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Reference to the Category schema
    },
    tags: [
      {
        type: String,
        trim: true, // Tags for categorization or search
        maxlength: 50, // Limit the tag length to 50 characters
      },
    ],
    views: {
      type: Number,
      default: 0, // Number of article views
      min: 0,
    },
    likes: {
      type: Number,
      default: 0, // Number of likes on the article
      min: 0,
    },
    comments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Comment",
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false, // Marks the article as featured
    },
    isApproved: {
      type: Boolean,
      default: false, // Approval status for the article
    },
    publishedAt: {
      type: Date, // Date when the article was published
      validate: {
        validator: function (value) {
          return this.status === "published" ? !!value : true;
        },
        message: "Published articles must have a publishedAt date.",
      },
    },
    relatedPosts: [{ type: String }],
    readingTime: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isCommentAllowed: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt timestamps
  }
);

// Model Creation
const Article =
  mongoose.models.Article || mongoose.model("Article", articleSchema);
export default Article;
