import { connectToDB } from "@/app/_lib/connectDB";
import Article from "@/models/ArticleModel";
import { NextResponse } from "next/server";

export const DELETE = async (req, context) => {
  try {
    const { params } = context;
    const { id } = params;

    await connectToDB();

    // Find the article by ID
    const article = await Article.findByIdAndDelete(id);

    // if (!article) {
    //   return NextResponse.json({ error: "Article not found" }, { status: 404 });
    // }

    // Mark the article as deleted (soft delete)
    // const deletedArticle = await Article.findByIdAndUpdate(
    //   id,
    //   { isDeleted: true },
    //   { new: true }
    // );

    return NextResponse.json(
      { message: "Article marked as deleted successfully", article },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while deleting the article" },
      { status: 500 }
    );
  }
};
