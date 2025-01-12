"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllArticle, getAllCategory } from "@/app/_lib/data-service"; // Fetch articles and categories
import {
  FaTrashAlt,
  FaEdit,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import SpinnerMini from "@/app/_components/SpinnerMini";
import toast from "react-hot-toast";
import { postDelete, postPublished } from "@/app/_lib/actions"; // Handle deletion and publishing logic
import Link from "next/link"; // Import Link component

function ManagePage() {
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [pendingAction, setPendingAction] = useState(null); // Track pending action for specific articles
  const [loadingArticle, setLoadingArticle] = useState(null); // Track the article being loaded

  // Fetch articles and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { articles } = await getAllArticle();
        const { categories } = await getAllCategory();

        const enrichedArticles = articles.map((article) => {
          const matchedCategory = categories.find(
            (category) => category._id === article.categories
          );
          return {
            ...article,
            category: matchedCategory ? matchedCategory.name : "Unknown",
          };
        });

        setArticles(enrichedArticles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle article deletion
  const handleDelete = async (articleId) => {
    if (confirm("Are you sure you want to delete this article?")) {
      setPendingAction({ id: articleId, type: "delete" });
      try {
        const formData = new FormData();
        formData.append("id", articleId);

        await postDelete(formData); // Handle deletion logic
        toast.success("Article deleted successfully.");
        refreshData();
      } catch (error) {
        toast.error("Failed to delete the article. Please try again.");
      } finally {
        setPendingAction(null);
      }
    }
  };

  // Handle article publish/unpublish
  const handlePublish = async (articleId, currentStatus) => {
    setPendingAction({ id: articleId, type: "publish" });
    try {
      let newStatus;

      // Determine the next status based on the current status
      switch (currentStatus) {
        case "draft":
          newStatus = "published";
          break;
        case "published":
          newStatus = "draft";
          break;
        case "archived":
          newStatus = "draft";
          break;
        default:
          throw new Error("Invalid status");
      }

      const formData = new FormData();
      formData.append("id", articleId);
      formData.append("status", newStatus);

      await postPublished(formData); // Update status in the backend
      toast.success(`Article status updated to ${newStatus}.`);
      refreshData(); // Refresh the articles list
    } catch (error) {
      toast.error("Failed to update article status. Please try again.");
    } finally {
      setPendingAction(null);
    }
  };

  // Refresh data after deletion or status update
  const refreshData = async () => {
    try {
      const { articles } = await getAllArticle();
      const { categories } = await getAllCategory();

      const enrichedArticles = articles.map((article) => {
        const matchedCategory = categories.find(
          (category) => category._id === article.categories
        );
        return {
          ...article,
          category: matchedCategory ? matchedCategory.name : "Unknown",
        };
      });

      setArticles(enrichedArticles);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  // Filter articles based on search and status
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || article.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Extract the first name of the author
  const getAuthorFirstName = (authorName) => {
    return authorName ? authorName.split(" ")[0] : "Unknown";
  };

  // Trim title to 6-7 words
  const trimTitle = (title) => {
    const words = title.split(" ");
    if (words.length > 7) {
      return words.slice(0, 7).join(" ") + "...";
    }
    return title;
  };

  // Handle article click
  const handleArticleClick = async (slug) => {
    setLoadingArticle(slug); // Set loading state
    try {
      // Navigate to the article page with the slug
      router.push(`/news/${slug}`);
    } catch (error) {
      console.error("Error navigating to article:", error);
    } finally {
      setLoadingArticle(null); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-screen-xl mx-auto px-6">
        <h1 className="text-4xl font-semibold text-gray-900 mb-6">
          Manage Posts
        </h1>

        {/* Search */}
        <div className="mb-6 flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Search posts..."
            className="flex-1 p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Posts Table */}
        <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 text-gray-900">
              <tr>
                <th className="px-6 py-3 text-left">Image</th>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Author</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Views</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.length > 0 ? (
                filteredArticles.map((post) => (
                  <tr
                    key={post._id}
                    className={`hover:bg-gray-200 ${
                      post.published ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/news/${post.slug}`} // Add link to the article's page
                        className="text-blue-500 hover:underline"
                      >
                        {trimTitle(post.title)}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      {getAuthorFirstName(post.author?.name)}
                    </td>
                    <td className="px-6 py-4">{post.category}</td>
                    <td className="px-6 py-4">{post.views}</td>
                    <td className="px-6 py-4 flex space-x-2 items-center">
                      {/* Edit Button */}
                      <button
                        className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white rounded-lg px-4 py-2 flex items-center gap-2 shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105 text-sm"
                        onClick={() =>
                          router.push(`/dashboard/content/editContent/${post._id}`)
                        }
                      >
                        <FaEdit />
                        <span>Edit</span>
                      </button>

                      {/* Publish/Unpublish Button */}
                      <button
                        onClick={() => handlePublish(post._id, post.status)}
                        disabled={pendingAction?.id === post._id}
                        className={`${
                          post.status === "published"
                            ? "bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800"
                            : post.status === "draft"
                            ? "bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800"
                            : "bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800"
                        } text-white rounded-lg px-4 py-2 flex items-center gap-2 shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105 text-sm ${
                          pendingAction?.id === post._id ? "opacity-50" : ""
                        }`}
                      >
                        {pendingAction?.id === post._id &&
                        pendingAction?.type === "publish" ? (
                          <SpinnerMini />
                        ) : post.status === "published" ? (
                          <FaCheckCircle />
                        ) : (
                          <FaTimesCircle />
                        )}
                        <span>
                          {post.status === "published"
                            ? "Unpublish"
                            : post.status === "draft"
                            ? "Publish"
                            : "Archived"}
                        </span>
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(post._id)}
                        disabled={pendingAction?.id === post._id}
                        className={`bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white rounded-lg px-4 py-2 flex items-center gap-2 shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105 text-sm ${
                          pendingAction?.id === post._id ? "opacity-50" : ""
                        }`}
                      >
                        {pendingAction?.id === post._id &&
                        pendingAction?.type === "delete" ? (
                          <SpinnerMini />
                        ) : (
                          <>
                            <FaTrashAlt />
                            <span>Delete</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No posts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManagePage;
