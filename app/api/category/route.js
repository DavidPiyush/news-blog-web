import { connectToDB } from "@/app/_lib/connectDB";
import Category from "@/models/CategoryModel";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectToDB();

    // Extract query parameters from the URL
    const { searchParams } = new URL(req.url);
    const isDeletedParam = searchParams.get("isDeleted");
    const isActiveParam = searchParams.get("isActive");

    // Pagination parameters
    const page = parseInt(searchParams.get("page")) || 1; // Default to page 1 if not provided
    const limit = parseInt(searchParams.get("limit")) || 10; // Default to 10 items per page if not provided

    // Convert isDeleted and isActive query parameters to boolean
    const isDeleted =
      isDeletedParam === "true"
        ? true
        : isDeletedParam === "false"
        ? false
        : undefined;

    const isActive =
      isActiveParam === "true"
        ? true
        : isActiveParam === "false"
        ? false
        : undefined;

    // Build the query condition
    let query = {};
    if (isDeleted !== undefined) {
      query.isDeleted = isDeleted; // Filter by isDeleted if provided
    }
    if (isActive !== undefined) {
      query.isActive = isActive; // Filter by isActive if provided
    }

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Fetch categories based on the query with pagination
    const categories = await Category.find(query)
      .skip(skip)
      .limit(limit)
      

    // Get the total count of categories matching the filter
    const totalCategories = await Category.countDocuments(query);

    if (categories.length === 0) {
      return NextResponse.json(
        { message: "No category found" },
        { status: 404 }
      );
    }

    // Return categories with pagination info
    return NextResponse.json(
      {
        message: "Category retrieved successfully",
        categories,
        pagination: {
          page,
          limit,
          totalCategories,
          totalPages: Math.ceil(totalCategories / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while retrieving category" },
      { status: 500 }
    );
  }
};
