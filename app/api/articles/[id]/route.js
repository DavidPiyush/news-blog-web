import { connectToDB } from "@/app/_lib/connectDB";
import Article from "@/models/ArticleModel";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = await params;
  try {
    await connectToDB();

    const article = await Article.findById(id).populate("categories")
      .populate("author")
      .populate("comments")

    if (!article)
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );

    return NextResponse.json({ article }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while retrieving article" },
      { status: 500 }
    );
  }
};
