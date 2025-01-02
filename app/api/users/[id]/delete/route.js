import { connectToDB } from "@/app/_lib/connectDB";
import User from "@/models/UserModel";
import { NextResponse } from "next/server";

export const DELETE = async (req, context) => {
  try {
    const { params } = context;
    const { id } = params;

    await connectToDB();

    // Find the user by ID
    const user = await User.findByIdAndDelete(id);

    // if (!user) {
    //   return NextResponse.json({ error: "User not found" }, { status: 404 });
    // }

    // // Mark the user as deleted (soft delete)
    // const deletedUser = await User.findByIdAndUpdate(
    //   id,
    //   { isDeleted: true },
    //   { new: true }
    // );

    return NextResponse.json(
      { message: "User marked as deleted successfully", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while deleting the user" },
      { status: 500 }
    );
  }
};
