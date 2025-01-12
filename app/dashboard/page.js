import { FaNewspaper, FaTag, FaUsers } from "react-icons/fa6";
import PostList from "../_components/PostList";
import { connectToDB } from "../_lib/connectDB";
import Article from "@/models/ArticleModel";
import Category from "@/models/CategoryModel";
import User from "@/models/UserModel";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard",
};

async function Page() {
  try {
    // first connect to mongodb
    await connectToDB();

    // Fetch articles and categories
    const articles = await Article.find().lean(); // Limit populated fields
    const categories = await Category.find().lean();

    // Handle the articles and categories logic
    const status = "draft";
    const totalDrafts = articles?.filter(
      (article) => article.status === status
    );

    const articleDataWithAuthor = await Promise.all(
      articles.map(async (article) => {
        const author = await User.findById(article.author);
        // Delete unnecessary fields
        const {
          status,
          likes,
          content,
          categories,
          isFeatured,
          isApproved,
          summary,
          tags,
          updatedAt,
          isCommentAllowed,
          _id,
          subTitle,
          readingTime,
          isDeleted,

          ...cleanArticle
        } = article;

        // Add the author's name to the cleaned article data
        return { ...cleanArticle, author: author?.name || "Unknown" }; // Default 'Unknown' if no author found
      })
    );

   
    const getRecentArticle = articleDataWithAuthor
      ?.filter((article) => article.createdAt)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const getPopularArticles = articleDataWithAuthor
      ?.filter((item) => item.views)
      .sort((a, b) => b.views - a.views);

    return (
      <div className="p-8 min-h-screen">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h2>

        {/* Metrics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Posts */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Total Posts
            </h3>
            <div className="text-3xl font-bold text-indigo-600">
              {articles?.length || 0}
            </div>
            <FaNewspaper className="w-8 h-8 text-indigo-600 mt-4" />
          </div>

          {/* Total Drafts */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Total Drafts
            </h3>
            <div className="text-3xl font-bold text-yellow-500">
              {totalDrafts?.length || 0}
            </div>
            <FaNewspaper className="w-8 h-8 text-yellow-500 mt-4" />
          </div>

          {/* Categories */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Categories
            </h3>
            {categories?.length > 0 ? (
              <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                {categories?.map((category) => (
                  <li key={category._id}>{category.name}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No categories available</p>
            )}
            <FaTag className="w-8 h-8 text-green-500 mt-4" />
          </div>

          {/* Total Reach */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Total Reach
            </h3>
            <div className="text-3xl font-bold text-blue-500">120 Reach</div>
            <FaUsers className="w-8 h-8 text-blue-500 mt-4" />
          </div>
        </div>

        {/* Recent and Popular Posts */}
        <PostList articles={getRecentArticle} header={"Recent Posts"} />
        <PostList articles={getPopularArticles} header={"Popular Posts"} />
      </div>
    );
  } catch (error) {
    console.error("Error:", error);
    return <div>Error fetching data</div>;
  }
}

export default Page;
