import { connectToDB } from "@/app/_lib/connectDB";
import User from "@/models/UserModel";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectToDB();

    // Extract pagination parameters from the query
    const { searchParams } = new URL(req.url);
    const isDeletedParam = searchParams.get("isDeleted");

    const page = parseInt(searchParams.get("page")) || 1; // Default page is 1
    const limit = parseInt(searchParams.get("limit")) || 10; // Default limit is 10

    // Convert isDeleted query parameter to boolean
    const isDeleted =
      isDeletedParam === "true"
        ? true
        : isDeletedParam === "false"
        ? false
        : undefined;

    // Build the query based on isDeleted
    let query = {};
    if (isDeleted !== undefined) {
      query.isDeleted = isDeleted;
    }

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Query users based on isDeleted and apply pagination
    const users = await User.find(query).skip(skip).limit(limit);

    // Adjust the count query based on isDeleted
    const totalUsers = await User.countDocuments(
      isDeleted !== undefined ? { isDeleted } : {}
    );

    if (!users.length) {
      return NextResponse.json(
        { message: `No users found with isDeleted: ${isDeleted}` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Users retrieved successfully",
        users,
        pagination: {
          page,
          limit,
          totalUsers,
          totalPages: Math.ceil(totalUsers / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while retrieving users" },
      { status: 500 }
    );
  }
};
