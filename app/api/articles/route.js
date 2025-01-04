import { connectToDB } from "@/app/_lib/connectDB";
import Article from "@/models/ArticleModel";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    // Connect to the database
    await connectToDB();

    // Parse pagination parameters with default values
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page")) || 1);
    const limit = Math.max(1, parseInt(searchParams.get("limit")) || 10);

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Fetch articles with pagination and sorting
    const articles = await Article.find()
      .sort({ createdAt: -1 }) // Sort by creation date (most recent first)
      .skip(skip)
      .limit(limit)
      .populate("author") // Populate author details
     
    // Get the total count of articles
    const totalArticles = await Article.countDocuments();

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
