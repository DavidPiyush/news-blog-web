import { connectToDB } from "@/app/_lib/connectDB";
import Comment from "@/models/CommentModel";
import { NextResponse } from "next/server";

export const PATCH = async (req, context) => {
  try {
    await connectToDB();

    const { id } = await context.params;
    const updateData = await req.json();

    // Find the comment by ID first
    const comment = await Comment.findById(id);

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // Update fields that are allowed to be changed
    if (updateData.content) comment.content = updateData.content;

    if (updateData.approved !== undefined)
      comment.approved = updateData.approved;

    if (updateData.likes !== undefined) comment.likes = updateData.likes;

    if (updateData.isDeleted !== undefined)
      comment.isDeleted = updateData.isDeleted;

    // Save the updated comment
    await comment.save();

    return NextResponse.json(
      { message: "Comment updated successfully", comment },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while updating the comment" },
      { status: 500 }
    );
  }
};
