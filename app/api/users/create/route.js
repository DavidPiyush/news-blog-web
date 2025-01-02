import { connectToDB } from "@/app/_lib/connectDB";
import User from "@/models/UserModel";
import bcrypt from "bcryptjs"; // To hash the password
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await connectToDB();

    // Parse the request body
    const createNewUser = await req.json();

    // Validate the required fields
    if (!createNewUser || !createNewUser.email || !createNewUser.password) {
      return NextResponse.json(
        {
          error:
            "Request body must contain 'email', 'username', and 'password'",
        },
        { status: 400 }
      );
    }

    const { name, email, password, gender } = createNewUser;

    // Check if the user already exists by email
    const existUser = await User.findOne({ email });

    if (existUser) {
      return NextResponse.json(
        { message: "User already exists", user: existUser },
        { status: 200 }
      );
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      gender,
    });

    // Save the new user to the database
    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully", newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while creating the user" },
      { status: 500 }
    );
  }
};
