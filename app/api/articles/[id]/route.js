import { connectToDB } from "@/app/_lib/connectDB";
import Article from "@/models/ArticleModel";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = params; // Directly destructure id from params
  try {
    // Connect to the database
    await connectToDB();

    // Find the article by its ID and populate related fields
    const article = await Article.findById(id)
      .populate("categories") // Populate categories
      .populate("author") // Populate author
      .populate("comments"); // Populate comments

    // If article is not found, return a 404 response
    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }

    // Increment the views count
    article.views += 1;

    // Save the updated article with the new views count
    await article.save();

    // Return the article data with the updated views count
    return NextResponse.json({ article }, { status: 200 });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json(
      { error: "An error occurred while retrieving the article" },
      { status: 500 }
    );
  }
};
