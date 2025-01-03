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
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.statusText}`);
    }

    const articles = await response.json();

    return articles;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export async function getFilteredArticles(filter) {
  try {
    const response = await fetch(`${baseUrl}/api/articles?${filter}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.statusText}`);
    }

    const { articles } = await response.json();

    // Filter articles based on the specified conditions
    const filteredArticles = articles.filter(
      (article) => article.status === "published"
      //&& article.isApproved === true
      // article.isDeleted === false
    );

    return filteredArticles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
}

export async function getArticlesBasedOnSlug(slug) {
  const response = await fetch(`${baseUrl}/api/articles/${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch article: " + response.statusText);
  }

  return await response.json();
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

const fetchAllComments = async () => {
  const response = await fetch(`${baseUrl}/api/comments`);
  const data = await response.json();
  return data;
};

const fetchComments = async (articleId) => {
  const response = await fetch(`${baseUrl}/api/comments/${articleId}`);
  const data = await response.json();
  return data;
};

const postComment = async (articleId, author, content) => {
  const response = await fetch("/api/comments/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ articleId, author, content }),
  });
  const data = await response.json();
  return data;
};
