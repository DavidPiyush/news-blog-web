import { connectToDB } from "@/app/_lib/connectDB";
import User from "@/models/UserModel";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { email } = await params; // Correctly destructuring `params`

  try {
    await connectToDB();

    // Fetch the user and populate related fields
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "No User exists with the given ID :) " },
        { status: 404 } // 404 is more appropriate for "not found"
      );
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Failed to get user" }, { status: 500 });
  }
};
