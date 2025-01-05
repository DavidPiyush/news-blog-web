import { FaNewspaper, FaTag, FaUsers } from "react-icons/fa6";
import { getAllCategory, getFilteredArticles } from "../_lib/data-service";
import PostList from "../_components/PostList";

export const dynamic = "force-dynamic"; // Mark the page as dynamic

export const metadata = {
  title: "Dashboard",
};

async function Page() {
  const articles = await getFilteredArticles();
  const categories = await getAllCategory();

  const status = "draft";
  const totalDrafts = articles?.filter((article) => article.status === status);

  const getRecentArticle = articles
    ?.filter((article) => article.createdAt)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const getPopularArticles = articles
    ?.filter((item) => item.views)
    .sort((a, b) => b.views - a.views);

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h2>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Total Posts */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Total Posts
          </h3>
          <div className="text-3xl font-bold text-indigo-600">
            {articles?.length}
          </div>
          <FaNewspaper className="w-8 h-8 text-indigo-600 mt-4" />
        </div>

        {/* Total Drafts */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Total Drafts
          </h3>
          <div className="text-3xl font-bold text-yellow-500">
            {totalDrafts.length}
          </div>
          <FaNewspaper className="w-8 h-8 text-yellow-500 mt-4" />
        </div>

        {/* Categories */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Categories
          </h3>
          <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            {categories?.categories?.map((category) => (
              <li key={category._id}>{category.name}</li>
            ))}
          </ul>
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
}

export default Page;
