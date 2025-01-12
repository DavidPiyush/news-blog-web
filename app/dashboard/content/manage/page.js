import { connectToDB } from "@/app/_lib/connectDB";
import SubmitButton from "@/app/_components/SubmitButton";
import { postPublished } from "@/app/_lib/actions";
import DeleteArticle from "@/app/_components/DeleteArticle";
import Link from "next/link";
import { FaCheckCircle, FaEdit, FaRegEyeSlash } from "react-icons/fa";
import Article from "@/models/ArticleModel";
import Category from "@/models/CategoryModel";

export const metadata = {
  title: "Manage Content",
};

async function page() {
  // first connect to database
  await connectToDB();

  const articles = await Article.find().populate("author");
  const categories = await Category.find();

  // Create a map for categories by their _id for faster lookup
  const categoryMap = categories.reduce((acc, category) => {
    acc[category._id.toString()] = category.name;
    return acc;
  }, {});

  // Enrich the articles with category information
  const enrichedArticles = articles.map((article) => {
    const categoryName =
      categoryMap[article.categories.toString()] || "Unknown";

    return {
      ...article.toObject(), // Convert article to a plain object (if it's a Mongoose document)
      category: categoryName,
    };
  });

  return (
    <div className=" min-h-screen py-8">
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
                        {post?.author?.name.split(" ").at(0)}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{post.category}</td>
                    <td className="px-6 py-4 text-gray-900">{post.views}</td>
                    <td className="px-6 py-4 flex space-x-2 items-center">
                      <Link
                        href={`/dashboard/content/editContent/${post._id}`}
                        className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:bg-blue-700 focus:outline-none flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:bg-blue-300 disabled:text-gray-500 
      sm:px-8 md:px-6 sm:py-4 md:py-2  text-sm gap-1"
                      >
                        <span>
                          <FaEdit />
                        </span>
                        <span> Edit</span>
                      </Link>

                      <DeleteArticle articleId={post._id} />

                      <form action={postPublished}>
                        <input
                          name="id"
                          defaultValue={post._id}
                          className="hidden"
                        />
                        <input
                          name="status"
                          defaultValue={post.status.toString()}
                          className="hidden"
                        />

                        {post.status == "draft" ? (
                          <SubmitButton
                            pendingLabel="Publishing..."
                            className="bg-green-600 hover:bg-green-700 "
                          >
                            <FaCheckCircle className="inline mr-1" />
                            {post.status}
                          </SubmitButton>
                        ) : (
                          <SubmitButton
                            pendingLabel="Unpublishing..."
                            className="bg-yellow-600 hover:bg-yellow-700 "
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
