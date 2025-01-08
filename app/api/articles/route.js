import { connectToDB } from "@/app/_lib/connectDB";
import Article from "@/models/ArticleModel";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // Connect to the database
    await connectToDB();

    // Fetch all articles and populate author details
    const articles = await Article.find().populate("author");


    

    // Return articles or an empty array if none found
    return NextResponse.json(
      {
        message: articles.length
          ? "Articles retrieved successfully"
          : "No articles found",
        articles,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to retrieve articles" },
      { status: 500 }
    );
  }
};
