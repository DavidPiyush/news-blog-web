"use server";

import { revalidatePath } from "next/cache";
import {
  CreateArticle,
  CreateCategory,
  deleteArticle,
  deleteCategory,
  deleteUser,
  getUser,
  UpdateArticle,
  UpdateCategory,
  updateUser,
} from "./data-service";
import slugify from "slugify";
import { parse } from "date-fns";
import { Types } from "mongoose";

export async function updateProfile(formData) {
  try {
    const id = formData.get("_id");
    if (!id) throw new Error("User ID is required.");

    const updateData = {};
    formData.forEach((value, key) => {
      if (value && key !== "_id") {
        updateData[key] = value;
      }
    });

    if (Object.keys(updateData).length === 0) {
      throw new Error("No valid fields to update.");
    }

    await updateUser(id, updateData);

    revalidatePath("/");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/profile");
    revalidatePath("/dashboard/profile/setting");

    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: error.message };
  }
}

export async function createPost(formData) {
  const id = formData.get("userID").trim();
  const category = formData.get("category");
  const year = formData.get("publishedYear");
  const publishTime = formData.get("publishTime");

  if (!id) throw new Error("User ID is required.");
  if (!category) throw new Error("Category is required.");
  const combinedDateTime = `${year || new Date().toISOString().split("T")[0]}T${
    publishTime || new Date().toTimeString().split(" ")[0]
  }`;
  const mongoDate = parse(
    combinedDateTime,
    "yyyy-MM-dd'T'HH:mm:ss",
    new Date()
  );

  // Validate if the date is correct
  if (isNaN(mongoDate)) {
    throw new Error("Invalid date or time format.");
  }

  // Prepare the data for update
  const updateData = {};

  formData.forEach((value, key) => {
    // Exclude certain fields from the update
    if (
      value &&
      key !== "userID" &&
      key !== "category" &&
      key !== "publishedYear" &&
      key !== "publishTime"
    ) {
      updateData[key] = value;
    }
  });

  // Check if there's any valid data to update
  if (Object.keys(updateData).length === 0) {
    throw new Error("No valid fields to update.");
  }

  // Process the category and slug
  const categoryParts = category.split("%");
  const categoryId = categoryParts[0].trim();

  if (!Types.ObjectId.isValid(categoryId)) {
    throw new Error("Invalid category ID.");
  }

  updateData.categories = new Types.ObjectId(categoryId);

  updateData.slug = slugify(updateData.title.trim());

  // Add additional fields
  updateData.author = new Types.ObjectId(id);
  updateData.publishedAt = mongoDate;
  // Call the CreateArticle function to insert the post into the database
  try {
    await CreateArticle(updateData);

    revalidatePath("/");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/content");
    revalidatePath("/dashboard/content/article");

    return { success: true };
  } catch (error) {
    console.error("Error creating the article:", error);
    throw new Error("Failed to create the article.");
  }
}

export async function postApproval(formData) {
  try {
    const id = formData.get("Id");
    const isApproved = formData.get("isApproved");

    console.log(formData, id, isApproved);
    if (!id || !isApproved) {
      throw new Error("Missing required fields: articleId or isApproved");
    }

    const approvalStatus = isApproved === "true";

    await UpdateArticle(id, {
      isApproved: approvalStatus,
    });

    revalidatePath("/");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/setting");
    revalidatePath("/dashboard/setting/approval");
    return { success: true };
  } catch (error) {
    console.error("Error during approval:", error);
    throw new Error("Failed to update article approval status");
  }
}

export async function postDelete(formData) {
  try {
    const id = formData.get("id");
    if (!id) {
      throw new Error("Article ID is missing in the form data.");
    }

    await deleteArticle(id);

    // Revalidate paths to update the UI
    revalidatePath("/");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/content");
    revalidatePath("/dashboard/content/manage");
  } catch (error) {
    console.error("Error in postDelete:", error);
    // Optionally, handle the error (e.g., show a toast notification)
  }
}

export async function postPublished(formData) {
  try {
    // Ensure the correct key names are used
    const id = formData.get("id"); // Assuming the form field name is 'id'
    const status = formData.get("status");

    // Validate inputs
    if (!id || !status) {
      throw new Error("Missing required fields: id or status.");
    }

    // Determine the new status
    const updateData = {
      status: status === "draft" ? "published" : "draft",
    };

    // Update the article
    await UpdateArticle(id, updateData);

    revalidatePath("/");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/content");
    revalidatePath("/dashboard/content/manage");

    return { success: true };
  } catch (error) {
    throw new Error("Failed to update article approval status.");
  }
}

export async function categoryCreate(formData) {
  const name = formData.get("name")?.trim();
  const description = formData.get("description")?.trim() || "";

  if (!name) {
    throw new Error("Category name is required.");
  }

  const slug = slugify(name, { lower: true, strict: true });

  const categoryData = {
    name,
    description,
    slug,
  };

  await CreateCategory(categoryData);

  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/content");
  revalidatePath("/dashboard/content/categories");
}

export async function categoryEdit(formData) {
  try {
    const id = formData.get("categoryId");
    const name = formData.get("name")?.trim();
    const description = formData.get("description")?.trim();

    if (!id) {
      throw new Error("Category ID is required.");
    }
    if (!name) {
      throw new Error("Category name is required.");
    }

    const slug = slugify(name, {
      lower: true,
      strict: true,
    });

    const updatedData = {
      name,
      description: description || "",
      slug,
    };

    console.log(updatedData);
    await UpdateCategory(id, updatedData);

    revalidatePath("/");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/content");
    revalidatePath("/dashboard/content/categories");

    return { success: true, message: "Category updated successfully." };
  } catch (error) {
    throw new Error("Failed to update category. Please try again.");
  }
}
export async function categoryDelete(formData) {
  try {
    const id = formData.get("id");
    console.log(id);
    if (!id) {
      throw new Error("Article ID is missing in the form data.");
    }

    await deleteCategory(id);

    // Revalidate paths to update the UI
    revalidatePath("/");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/content");
    revalidatePath("/dashboard/content/categories");
  } catch (error) {
    console.error("Error in postDelete:", error);
    // Optionally, handle the error (e.g., show a toast notification)
  }
}

export async function updateRoleByAdmin(formData) {
  const id = formData.get("id"); // Assuming the form field name is 'id'
  const role = formData.get("role");

  // Validate inputs
  if (!id || !role) {
    throw new Error("Missing required fields: id or status.");
  }

  // Determine the new status
  const updateData = {
    role: role,
  };

  // Update the article
  await updateUser(id, updateData);

  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/user");
}
export async function deleteUserByAdmin(formData) {
  const id = formData.get("id");
  console.log(id);
  if (!id) {
    throw new Error("Article ID is missing in the form data.");
  }

  await deleteUser(id);

  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/user");
}
