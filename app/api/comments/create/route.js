import { connectToDB } from "@/app/_lib/connectDB";
import Comment from "@/models/CommentModel";
import User from "@/models/UserModel";
import Article from "@/models/ArticleModel";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await connectToDB();

    // Destructure required fields from the request body
    const { comment, email, postId, parentCommentId, website, saveInfo, name } =
      await req.json();

    // if (!comment || !email || !postId) {
    //   return NextResponse.json(
    //     { error: "Comment, email, and postId are required" },
    //     { status: 400 }
    //   );
    // }

    // Check if the user exists
    // const user = await User.findOne({ email });
    // if (!user) {
    //   return NextResponse.json(
    //     { error: "User not found. Please register first." },
    //     { status: 404 }
    //   );
    // }

    // Check if the article exists
    const article = await Article.findById(postId);
    if (!article) {
      return NextResponse.json(
        { error: "Article not found." },
        { status: 404 }
      );
    }

    // Create the new comment
    const newComment = new Comment({
      comment,
      email,
      postId,
      name,
      parentCommentId: parentCommentId || null,
      website: website || null,
      saveInfo: saveInfo || false,
      approved: false, // Default to false for moderation
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
