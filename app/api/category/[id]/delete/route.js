import { connectToDB } from "@/app/_lib/connectDB";
import Category from "@/models/CategoryModel";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  const { id } = params;

  try {
    await connectToDB();

    // Find the category by ID
    const category = await Category.findByIdAndDelete(id);

    // if (!category) {
    //   return NextResponse.json(
    //     { error: "Category not found" },
    //     { status: 404 }
    //   );
    // }

    // Soft delete the category (mark as deleted)
    // const deletedCategory = await Category.findByIdAndUpdate(
    //   id,
    //   { isDeleted: true },
    //   { new: true }
    // );

    return NextResponse.json(
      { message: "Category marked as deleted successfully", category },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while deleting the category" },
      { status: 500 }
    );
  }
};
