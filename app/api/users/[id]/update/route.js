import { connectToDB } from "@/app/_lib/connectDB";
import User from "@/models/UserModel";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
  const { id } = await params;
  try {
    // Await the params object

    await connectToDB();
    const updatedUserData = await req.json();

    if (!updatedUserData) {
      return NextResponse.json(
        { error: "No data provided to update" },
        { status: 400 }
      );
    }

    // Prevent email field from being updated
    delete updatedUserData.email;

    const user = await User.findByIdAndUpdate(id, updatedUserData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User updated successfully", user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while updating the user" },
      { status: 500 }
    );
  }
};
