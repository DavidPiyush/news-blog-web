"use server";
const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
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
import { connectToDB } from "./connectDB";
import Article from "@/models/ArticleModel";
import User from "@/models/UserModel";
import { calculateReadingTimeFromHTML } from "./helper";

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

// {id,role,categoryId,publishedDate,title,content,subTitle,isFeatured,isApproved,summary ,slug,readingTime,tags,coverImage}
export async function createPost(articleData, formData) {
  try {
    const { title, subTitle, summary, categories, tags, status, isFeatured } =
      Object.fromEntries(formData.entries());

    const newArticle = {
      ...articleData,
      title,
      slug: slugify(title.trim()),
      subTitle,
      summary,
      categories: new Types.ObjectId(categories).toString(), // Convert ObjectId to string
      tags: tags.split(",").map((tag) => tag.trim()) || [],
      status: status || "draft",
      isFeatured: isFeatured || false,
      views: 0,
      likes: 0,
    };

    connectToDB();

    const article = await new Article(newArticle);

    await article.save();
    console.log(article);

    // const response = await fetch(`${baseUrl}/api/articles/create`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newD),
    // });

    // if (!response.ok) {
    //   throw new Error(
    //     `Failed to create article: ${response.status} ${response.statusText}`
    //   );
    // }

    revalidatePath("/");
    revalidatePath("/dashboard");

    return {
      message: "Article created successfully",
      statusCode: 201,
    };
  } catch (error) {
    throw new Error(error.message || "Failed to create the article.");
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

    revalidatePath("/dashboard");
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

    revalidatePath("/dashboard/content/manage");
  } catch (error) {
    console.error("Error in postDelete:", error);
    throw new Error("Failed to delete article");
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

    // await Article.findByIdAndUpdate(id, updateData, {
    //   new: true,
    //   runValidators: true,
    // });

    revalidatePath("/dashboard");

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

  revalidatePath("/dashboard");
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

    revalidatePath("/dashboard");

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

    revalidatePath("/dashboard");
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

  revalidatePath("/dashboard");
}
export async function deleteUserByAdmin(formData) {
  const id = formData.get("id");
  console.log(id);
  if (!id) {
    throw new Error("Article ID is missing in the form data.");
  }

  await deleteUser(id);

  revalidatePath("/dashboard");
}
