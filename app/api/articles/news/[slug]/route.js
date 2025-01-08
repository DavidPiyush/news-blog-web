import { connectToDB } from "@/app/_lib/connectDB";
import Article from "@/models/ArticleModel";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    await connectToDB();

    // Find the article by slug
    const article = await Article.findOne({ slug });

    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }

    // Increment views
    article.views += 1;
    await article.save();

    return NextResponse.json({ article }, { status: 200 });
  } catch (error) {
    console.error("Error updating views:", error);
    return NextResponse.json(
      { error: "An error occurred while updating views" },
      { status: 500 }
    );
  }
};
