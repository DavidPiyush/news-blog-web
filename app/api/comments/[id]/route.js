import { connectToDB } from "@/app/_lib/connectDB";
import Comment from "@/models/CommentModel";
import { NextResponse } from "next/server";

export const GET = async (req, context) => {
  try {
    await connectToDB();

    const { id } = context.params;

    // Find the comment by ID
    const comment = await Comment.findById(id)

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Comment retrieved successfully", comment },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while retrieving the comment" },
      { status: 500 }
    );
  }
};
