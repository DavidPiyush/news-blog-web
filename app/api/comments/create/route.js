import { connectToDB } from "@/app/_lib/connectDB";
import Comment from "@/models/CommentModel";
import User from "@/models/UserModel";
import Article from "@/models/ArticleModel";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await connectToDB();

    const { content, author, post, parentCommentId, approved } =
      await req.json();

    if (!content || !author || !post) {
      return NextResponse.json(
        { error: "Content, author, and post are required" },
        { status: 400 }
      );
    }

    // Check if the user exists
    const user = await User.findById(author);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the article exists
    const article = await Article.findById(post);
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Create the new comment
    const newComment = new Comment({
      content,
      author,
      post,
      parentCommentId: parentCommentId || null,
      approved: approved || false, // Default to false
    });

    await newComment.save();

    return NextResponse.json(
      { message: "Comment created successfully", comment: newComment },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while creating the comment" },
      { status: 500 }
    );
  }
};
