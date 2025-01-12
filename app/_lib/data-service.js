// Get all users from the database

import WebsiteSetting from "@/models/WebsiteModel";
import { connectToDB } from "./connectDB";
import Comment from "@/models/CommentModel";

// const baseUrl = process.env.NEXTAUTH_URL || "https://news-blog-web.vercel.app";
const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

// Get user from database

export async function getAllUser() {
  try {
    const response = await fetch(`${baseUrl}/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch user: ${response.status} ${response.statusText}`
      );
    }

    const user = await response.json();

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export async function getUserById(id) {
  try {
    const response = await fetch(`${baseUrl}/api/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch user: ${response.status} ${response.statusText}`
      );
    }

    const user = await response.json();

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}
export async function getUser(email) {
  try {
    const response = await fetch(`${baseUrl}/api/users/user/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch user: ${response.status} ${response.statusText}`
      );
    }

    const user = await response.json();

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export async function createUser(data) {
  try {
    const response = await fetch("/api/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to create user: ${response.status} ${response.statusText}`
      );
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function updateUser(id, data) {
  try {
    const response = await fetch(`${baseUrl}/api/users/${id}/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update user: ${response.status} ${response.statusText}`
      );
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

export async function deleteUser(id) {
  try {
    const response = await fetch(`${baseUrl}/api/users/${id}/delete`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to delete user: ${response.status} ${response.statusText}`
      );
    }

    return { message: "User deleted successfully" };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

// fetch all articles from database
export async function getAllArticle() {
  try {
    const response = await fetch(`${baseUrl}/api/articles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["posts"] },
    });

    if (!response) {
      throw new Error(
        `Failed to fetch user: ${response.status} ${response.statusText}`
      );
    }

    const articles = await response.json();

    return articles;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export async function getFilteredArticles() {
  try {
    const response = await fetch(`${baseUrl}/api/articles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["posts"] },
    });

    if (!response) {
      throw new Error(
        `Failed to fetch user: ${response.status} ${response.statusText}`
      );
    }

    const { articles } = await response.json();

    // Filter articles based on the specified conditions
    const filteredArticles = articles?.filter(
      (article) => article.status === "published" && article.isApproved === true
    );

    return filteredArticles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
}

export async function getArticlesBasedOnSlug(slug) {
  try {
    const response = await fetch(`${baseUrl}/api/articles/news/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch article: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching article:", error);
    throw new Error("An error occurred while fetching the article.");
  }
}

export async function CreateArticle(data) {
  try {
    const response = await fetch(`${baseUrl}/api/articles/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to create article: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error creating article:", error);
    throw error;
  }
}

export async function UpdateArticle(articleId, data) {
  try {
    const response = await fetch(
      `${baseUrl}/api/articles/${articleId}/update`,
      {
        method: "PATCH", // You can also use PATCH if partial updates are allowed
        headers: {
          "Content-Type": "application/json",
        },
        next: { tags: ["updateArticle"] },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to update article: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
}

export async function deleteArticle(id) {
  try {
    const response = await fetch(`${baseUrl}/api/articles/${id}/delete`, {
      method: "DELETE",
      next: { tags: ["DeleteArticle"] },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to delete article: ${response.status} ${response.statusText}`
      );
    }

    return { message: "Article deleted successfully" };
  } catch (error) {
    console.error("Error deleting article:", error);
    throw error;
  }
}

// fetch all categories

export async function getAllCategory() {
  try {
    const response = await fetch(`${baseUrl}/api/category`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch user: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export async function CreateCategory(data) {
  try {
    const response = await fetch(`${baseUrl}/api/category/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to create category: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
}

export async function UpdateCategory(catId, data) {
  try {
    const response = await fetch(`${baseUrl}/api/category/${catId}/update`, {
      method: "PATCH", // You can also use PATCH if partial updates are allowed
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update category: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
}

export async function deleteCategory(id) {
  try {
    const response = await fetch(`${baseUrl}/api/category/${id}/delete`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to delete category: ${response.status} ${response.statusText}`
      );
    }

    return { message: "category deleted successfully" };
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
}

export async function websiteSettingData() {
  try {
    await connectToDB();
    const settings = await WebsiteSetting.findOne();

    // Return the settings as an array
    return settings;
  } catch (error) {
    console.error("Error fetching website settings:", error);
    throw new Error("Failed to fetch website settings!");
  }
}

// function to fetch comment based on article post

export async function commentBasedOnPost(postId) {
  try {
    // Connect to the database
    await connectToDB();

    // Fetch comments for the given postId
    const comments = await Comment.find({ postId })
      .sort({ createdAt: -1 })
      .lean(); // Sorting by newest first

    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw new Error("Unable to fetch comments.");
  }
}
