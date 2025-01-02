import { connectToDB } from "@/app/_lib/connectDB";
import Article from "@/models/ArticleModel";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { slug } = await params;
  try {
    await connectToDB();

    const article = await Article.findOne({ slug });

    if (!article)
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );

    return NextResponse.json({ article }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while retrieving article" },
      { status: 500 }
    );
  }
};
