import { connectToDB } from "@/app/_lib/connectDB";
import Comment from "@/models/CommentModel";
import { NextResponse } from "next/server";

export const DELETE = async (req, context) => {
  try {
    await connectToDB();

    const { id } = context.params;

    const comment = await Comment.findById(id);

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // Soft delete the comment by setting isDeleted to true
    comment.isDeleted = true;
    await comment.save();

    return NextResponse.json(
      { message: "Comment deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while deleting the comment" },
      { status: 500 }
    );
  }
};
