import { connectToDB } from "@/app/_lib/connectDB";
import Comment from "@/models/CommentModel";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const approvedParam = searchParams.get("approved");
    const isDeletedParam = searchParams.get("isDeleted");
    const likesParam = searchParams.get("likes");

    const approved = approvedParam ? approvedParam === "true" : undefined;
    const isDeleted = isDeletedParam ? isDeletedParam === "true" : undefined;
    const likes = likesParam ? parseInt(likesParam) : undefined;

    let query = {};

    if (approved !== undefined) {
      query.approved = approved;
    }

    if (isDeleted !== undefined) {
      query.isDeleted = isDeleted;
    }

    if (likes !== undefined) {
      query.likes = { $gte: likes }; // Filter comments with likes greater than or equal to the provided value
    }

    const comments = await Comment.find(query).populate("author post");

    if (comments.length === 0) {
      return NextResponse.json(
        { message: "No comments found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Comments retrieved successfully", comments },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while retrieving comments" },
      { status: 500 }
    );
  }
};
