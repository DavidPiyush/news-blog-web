import { connectToDB } from "@/app/_lib/connectDB";
import Article from "@/models/ArticleModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const GET = async (req) => {
  try {
    // Connect to the database
    await connectToDB();

    // Extract query parameters from the URL
    const { searchParams } = new URL(req.url);

    // Utility function to parse boolean values
    const parseBoolean = (value) =>
      value === "true" ? true : value === "false" ? false : undefined;

    // Parse query parameters
    const isDeleted = parseBoolean(searchParams.get("isDeleted"));
    const isApproved = parseBoolean(searchParams.get("isApproved"));
    const category = searchParams.get("category");
    const author = searchParams.get("author");
    const status = searchParams.get("status");
    const minViews = parseInt(searchParams.get("minViews")) || 0;
    const minLikes = parseInt(searchParams.get("minLikes")) || 0;

    // Parse pagination parameters with default values
    const page = Math.max(1, parseInt(searchParams.get("page")) || 1);
    const limit = Math.max(1, parseInt(searchParams.get("limit")) || 10);

    // Build the query object
    let query = {};
    if (isDeleted !== undefined) query.isDeleted = isDeleted;
    if (category) query.category = category;
    if (author) {
      if (!mongoose.Types.ObjectId.isValid(author)) {
        return NextResponse.json(
          { message: `Invalid author ID: ${author}` },
          { status: 400 }
        );
      }
      query.author = new mongoose.Types.ObjectId(author);
    }
    if (isApproved !== undefined) query.isApproved = isApproved;
    if (status) {
      const validStatuses = ["draft", "published", "archived"];
      if (!validStatuses.includes(status)) {
        return NextResponse.json(
          { message: `Invalid status value: ${status}` },
          { status: 400 }
        );
      }
      query.status = status;
    }
    if (minViews > 0) query.views = { $gte: minViews };
    if (minLikes > 0) query.likes = { $gte: minLikes };

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Fetch articles with pagination and sorting
    const articles = await Article.find(query)
      .sort({ createdAt: -1 }) // Sort by creation date (most recent first)
      .skip(skip)
      .limit(limit)
      .populate("author") // Populate author details
      .lean(); // Return plain JavaScript objects for better performance

    // Get the total count of articles matching the query
    const totalArticles = await Article.countDocuments(query);

    // Handle case where no articles are found
    if (articles.length === 0) {
      return NextResponse.json(
        {
          message: "No articles found",
          articles: [],
          pagination: { page, limit, totalArticles: 0, totalPages: 0 },
        },
        { status: 200 }
      );
    }

    // Return the articles with pagination metadata
    return NextResponse.json(
      {
        articles,
        pagination: {
          page,
          limit,
          totalArticles,
          totalPages: Math.ceil(totalArticles / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    // Log and return error response
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to get articles" },
      { status: 500 }
    );
  }
};
