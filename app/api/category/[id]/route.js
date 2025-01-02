import { connectToDB } from "@/app/_lib/connectDB";
import Category from "@/models/CategoryModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// GET individual category by ID
export const GET = async (req, { params }) => {
  const { id } = await params;
  try {
    await connectToDB();

    // Find the category by ID
    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Category retrieved successfully", category },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while retrieving the category" },
      { status: 500 }
    );
  }
};
