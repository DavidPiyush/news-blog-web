import { connectToDB } from "@/app/_lib/connectDB";
import Category from "@/models/CategoryModel";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    // Connect to the database
    await connectToDB();

    // Parse the request body
    const createNewCategory = await req.json();

    // Validate the request body
    if (
      !createNewCategory ||
      !createNewCategory.name ||
      !createNewCategory.description
    ) {
      return NextResponse.json(
        { error: "Request body must contain 'name' and 'description'" },
        { status: 400 }
      );
    }

    const { name, slug, description } = createNewCategory;

    // Check if the category already exists by name
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return NextResponse.json(
        { message: "Category already exists", category: existingCategory },
        { status: 200 }
      );
    }

    // Create a new category
    const newCategory = new Category({
      name,
      slug,
      description,
    });

    // Save the new category to the database
    await newCategory.save();

    return NextResponse.json(
      { message: "Category created successfully", category: newCategory },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while creating the category" },
      { status: 500 }
    );
  }
};
