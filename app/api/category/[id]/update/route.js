import { connectToDB } from "@/app/_lib/connectDB";
import Category from "@/models/CategoryModel";
import { NextResponse } from "next/server";

// PATCH (Update) category by ID
export const PATCH = async (req, { params }) => {
  const { id } = params;

  try {
    // Connect to the database
    await connectToDB();

    // Parse the request body
    const updatedCategoryData = await req.json();

    // Validate that required fields are present
    if (!updatedCategoryData || Object.keys(updatedCategoryData).length === 0) {
      return NextResponse.json(
        { error: "No data provided to update the category" },
        { status: 400 }
      );
    }

    // Remove fields that shouldn't be updated
    delete updatedCategoryData.isDeleted;

    // Update the category by ID
    const category = await Category.findByIdAndUpdate(id, updatedCategoryData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure schema validators are applied
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Respond with the updated category
    return NextResponse.json(
      { message: "Category updated successfully", category },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the category" },
      { status: 500 }
    );
  }
};

// DELETE category by ID (soft delete)
