import SubmitButton from "@/app/_components/SubmitButton";
import { postDelete, postPublished } from "@/app/_lib/actions";
import { getAllArticle, getAllCategory } from "@/app/_lib/data-service";
import Link from "next/link";
import {
  FaCheckCircle,
  FaEdit,
  FaRegEyeSlash,
  FaTrashAlt,
} from "react-icons/fa";

export const dynamic = "force-dynamic"; // Mark the page as dynamic

export const revalidate = 0;

export const metadata = {
  title: "Manage Content",
};

async function page() {
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

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-screen-xl mx-auto px-6">
        <h1 className="text-4xl font-semibold text-gray-900 mb-6">
          Manage Posts
        </h1>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Search posts..."
            className="flex-1 p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="py-3 px-4 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">All Posts</option>
            <option value="recent">Recent Posts</option>
            <option value="old">Old Posts</option>
            <option value="published">Published Posts</option>
            <option value="unpublished">Unpublished Posts</option>
          </select>
          <select className="py-3 px-4 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
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
              {enrichedArticles.length > 0 ? (
                enrichedArticles.map((post) => (
                  <tr
                    key={post._id}
                    className={`hover:bg-gray-200 ${
                      post.published ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <Link href={`/news/${post.slug}`}>
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/news/${post.slug}`}
                        className="text-gray-900 hover:underline"
                      >
                        {post.title}
                      </Link>
                      <div className="text-sm text-gray-500">
                        {post.publishedAt
                          ? new Intl.DateTimeFormat("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            }).format(new Date(post.publishedAt))
                          : "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/author/${post?.author?.name}`}
                        className="text-gray-900 hover:underline"
                      >
                        {post?.author?.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{post.category}</td>
                    <td className="px-6 py-4 text-gray-900">{post.views}</td>
                    <td className="px-6 py-4 flex space-x-2 items-center">
                      <SubmitButton pendingLabel="Updating...">
                        <FaEdit className="inline mr-1" />
                        Edit
                      </SubmitButton>
                      <form action={postDelete}>
                        <input
                          name="id"
                          defaultValue={post._id}
                          className="hidden"
                        />
                        <SubmitButton
                          pendingLabel="Deleting..."
                          className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-3 py-2 text-sm"
                        >
                          <FaTrashAlt className="inline mr-1" />
                          Delete
                        </SubmitButton>
                      </form>

                      <form action={postPublished}>
                        <input
                          name="id"
                          defaultValue={post._id}
                          className="hidden"
                        />
                        <input
                          name="status"
                          defaultValue={post.status}
                          className="hidden"
                        />

                        {post.status == "draft" ? (
                          <SubmitButton
                            pendingLabel="Publishing..."
                            className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-3 py-2 text-sm"
                          >
                            <FaCheckCircle className="inline mr-1" />
                            {post.status}
                          </SubmitButton>
                        ) : (
                          <SubmitButton
                            pendingLabel="Unpublishing..."
                            className="bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg px-3 py-2 text-sm"
                          >
                            <FaRegEyeSlash className="inline mr-1" />
                            {post.status}
                          </SubmitButton>
                        )}
                      </form>
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

export default page;
