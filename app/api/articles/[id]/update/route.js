import { connectToDB } from "@/app/_lib/connectDB";
import Article from "@/models/ArticleModel";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
  const { id } = await params; // Directly access the id from params

  try {
    await connectToDB();

    const updatedArticleData = await req.json(); // Parse the request body

    delete updatedArticleData.isDeleted;
    
    const article = await Article.findByIdAndUpdate(id, updatedArticleData, {
      new: true,
      runValidators: true,
    });

    if (!article) {
      // Return 404 if the article is not found
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }

    // Return 200 OK with updated article
    return NextResponse.json(
      { message: "Article updated successfully", article },
      { status: 200 }
    );
  } catch (error) {
    // Return 500 for internal server error
    return NextResponse.json(
      { error: "An error occurred while updating article" },
      { status: 500 }
    );
  }
};
