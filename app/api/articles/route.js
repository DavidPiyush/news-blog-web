import { connectToDB } from "@/app/_lib/connectDB";
import Article from "@/models/ArticleModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const GET = async (req) => {
  try {
    await connectToDB();

    // Extract query parameters from the URL
    const { searchParams } = new URL(req.url);
    const isDeletedParam = searchParams.get("isDeleted");
    const isApprovedParam = searchParams.get("isApproved");

    // Add other filters
    const category = searchParams.get("category");
    const author = searchParams.get("author");
    const status = searchParams.get("status"); // Filter by status enum

    const minViews = parseInt(searchParams.get("minViews")) || 0;
    const minLikes = parseInt(searchParams.get("minLikes")) || 0;

    // Pagination parameters
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    // Convert isDeleted query parameter to boolean
    const isDeleted =
      isDeletedParam === "true"
        ? true
        : isDeletedParam === "false"
        ? false
        : undefined;

    // Convert isApproved query parameter to boolean
    const isApproved =
      isApprovedParam === "true"
        ? true
        : isApprovedParam === "false"
        ? false
        : undefined;

    // Build the query condition
    let query = {};
    if (isDeleted !== undefined) {
      query.isDeleted = isDeleted;
    }
    if (category) {
      query.category = category; // Filter by category if provided
    }
    if (author) {
      // Ensure the author is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(author)) {
        return NextResponse.json(
          { message: "Invalid author ID" },
          { status: 400 }
        );
      }
      query.author = new mongoose.Types.ObjectId(author); // Convert to ObjectId
    }
    if (isApproved !== undefined) {
      query.isApproved = isApproved; // Filter by approval status if provided
    }
    if (status) {
      const validStatuses = ["draft", "published", "archived"];
      if (!validStatuses.includes(status)) {
        return NextResponse.json(
          { message: "Invalid status value" },
          { status: 400 }
        );
      }
      query.status = status; // Filter by status enum
    }

    // Filter by views and likes
    if (minViews > 0) {
      query.views = { $gte: minViews };
    }
    if (minLikes > 0) {
      query.likes = { $gte: minLikes };
    }

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Fetch articles based on the query with pagination
    const articles = await Article.find(query)
      .skip(skip)
      .limit(limit)
      .populate("author");

    // Get the total count of articles matching the filter
    const totalArticles = await Article.countDocuments(query);

    if (articles.length === 0) {
      return NextResponse.json(
        { message: "No articles found" },
        { status: 404 }
      );
    }

    // Return articles with pagination info
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
    console.log(error);
    return NextResponse.json(
      { error: "Failed to get articles" },
      { status: 500 }
    );
  }
};
