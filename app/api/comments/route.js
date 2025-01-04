import { connectToDB } from "@/app/_lib/connectDB";
import Comment from "@/models/CommentModel";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // Connect to the database
    await connectToDB();

    // Fetch all comments and populate author and post fields
    const comments = await Comment.find()
    // If no comments are found, return a 404 response
    if (!comments || comments.length === 0) {
      return NextResponse.json(
        { message: "No comments found" },
        { status: 404 }
      );
    }

    // Return the comments with a success message
    return NextResponse.json(
      { message: "Comments retrieved successfully", comments },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    // Handle errors and return a 500 response
    return NextResponse.json(
      { error: "An error occurred while retrieving comments" },
      { status: 500 }
    );
  }
};
