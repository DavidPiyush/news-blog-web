"use server";
const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
import { revalidatePath, revalidateTag } from "next/cache";
import {
  CreateCategory,
  deleteCategory,
  deleteUser,
  UpdateCategory,
  updateUser,
} from "./data-service";
import slugify from "slugify";
import { Types } from "mongoose";
import { connectToDB } from "./connectDB";
import Article from "@/models/ArticleModel";
import Notification from "@/models/NotificationModel";
import User from "@/models/UserModel";

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
    await connectToDB();

    await updateUser(id, updateData);

    const newNotification = new Notification({
      userId: new Types.ObjectId(id), // Store as ObjectId (no need to call .toString() unless you need a string)
      message: "Your profile is successfully updated",
      time: new Date(), // This will store the current date and time
    });

    await newNotification.save();
    revalidatePath("/dashboard/profile/setting", "page");

    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: error.message };
  }
}

export async function updateUserSocialLinks(formData) {
  // Destructure form data
  const { id, facebook, instagram, twitter, linkedin, youtube } =
    Object.fromEntries(formData.entries());

  // Create the socialLinks object
  const socialLinks = {
    facebook,
    instagram,
    twitter,
    linkedin,
    youtube,
  };


  try {
    // Connect to the database
    await connectToDB();

    // Update the user with the new socialLinks
    const updatedUser = await User.findByIdAndUpdate(
      id, // User ID
      { $set: { socialLinks } }, // Update the socialLinks field
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    const newNotification = new Notification({
      userId: new Types.ObjectId(id),
      message: "Social media links are added in your profile",
      time: new Date(),
    });

    await newNotification.save();

    revalidatePath('dashboard/setting/social')
    return { success: true, message: "update is sucessfull" };
  } catch (error) {
    console.error("Error updating social links:", error);
    return { success: false, error: error.message };
  }
}
// {id,role,categoryId,publishedDate,title,content,subTitle,isFeatured,isApproved,summary ,slug,readingTime,tags,coverImage}
export async function createPost(articleData, formData) {
  try {
    const {
      title,
      subTitle,
      summary,
      categories,
      tags,
      status,
      isFeatured,
      relatedPosts,
    } = Object.fromEntries(formData.entries());

    const newArticle = {
      ...articleData,
      title,

      slug: slugify(title.trim().toLowerCase()),
      subTitle,
      summary,
      categories: new Types.ObjectId(categories).toString(), // Convert ObjectId to string
      tags: tags.split(",").map((tag) => tag.trim()) || [],
      status: status || "draft",
      isFeatured: isFeatured || false,
      views: 0,
      likes: 0,
      relatedPosts: relatedPosts.split(",").map((post) => post.trim()) || [],
    };

    await connectToDB();

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

   revalidateTag("posts");

    return {
      message: "Article created successfully",
      statusCode: 201,
    };
  } catch (error) {
    throw new Error(error.message || "Failed to create the article.");
  }
}

// update full post

export async function updatePost(articleData, formData) {
  try {
    // Extract and process form data
    const { title, subTitle, categories, tags, isFeatured, relatedPosts } =
      Object.fromEntries(formData.entries());

    const newArticle = {
      ...articleData,
      title: title.trim(),
      slug: slugify(title.trim(), { lower: true }), // Generate a slug
      subTitle: subTitle.trim(),
      categories: new Types.ObjectId(categories).toString(), // Convert ObjectId to string
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [], // Split and trim tags
      isFeatured: isFeatured === "true", // Convert to boolean
      relatedPosts: relatedPosts
        ? relatedPosts.split(",").map((post) => post.trim())
        : [], // Split and trim related posts
    };

    // Connect to the database
    await connectToDB();

    // Update the article in the database
    const updatedArticle = await Article.findByIdAndUpdate(
      newArticle.id,
      {
        coverImage: newArticle.coverImage,
        readingTime: newArticle.readingTime,
        content: newArticle.content,
        title: newArticle.title,
        slug: newArticle.slug,
        subTitle: newArticle.subTitle,
        categories: newArticle.categories,
        tags: newArticle.tags,
        isFeatured: newArticle.isFeatured,
        relatedPosts: newArticle.relatedPosts,
      },
      { new: true } // Return the updated document
    );

    if (!updatedArticle) {
      throw new Error("Article not found or update failed.");
    }

    revalidateTag("posts");
    return { success: true }; // Return the updated article
  } catch (error) {
    console.error("Error updating article:", error);
    throw new Error("Failed to update the article.");
  }
}

export async function postApproval(formData) {
  try {
    const id = formData.get("Id");
    const isApproved = formData.get("isApproved");

    if (!id || !isApproved) {
      throw new Error("Missing required fields: articleId or isApproved");
    }

    const approvalStatus = isApproved === "true";

    await connectToDB();

    await Article.findByIdAndUpdate(
      id,
      { isApproved: approvalStatus },
      { new: true, runValidators: true }
    );

   revalidateTag("posts");
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

    await connectToDB();

    await Article.findByIdAndDelete(id);

    revalidateTag("DeleteArticle");
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

    await connectToDB();
    // Update the article

    await Article.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    revalidateTag('posts')

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

  revalidatePath("/dashboard", "page");
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

    await UpdateCategory(id, updatedData);

    revalidatePath("/dashboard", "page");

    return { success: true, message: "Category updated successfully." };
  } catch (error) {
    throw new Error("Failed to update category. Please try again.");
  }
}
export async function categoryDelete(formData) {
  try {
    const id = formData.get("id");

    if (!id) {
      throw new Error("Article ID is missing in the form data.");
    }

    await deleteCategory(id);

    // Revalidate paths to update the UI

    revalidatePath("/dashboard", "page");
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

  revalidatePath("/dashboard", "page");
}
export async function deleteUserByAdmin(formData) {
  const id = formData.get("id");

  if (!id) {
    throw new Error("Article ID is missing in the form data.");
  }

  await deleteUser(id);

  revalidatePath("/dashboard", "page");
}
