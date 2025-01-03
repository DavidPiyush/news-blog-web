import { FaNewspaper, FaTag, FaUsers } from "react-icons/fa6";
import { getAllCategory, getFilteredArticles } from "../_lib/data-service";
import PostList from "../_components/PostList";

export const dynamic = 'force-dynamic'; // Mark the page as dynamic

export const metadata = {
  title: "Dashboard",
};


export async function generateStaticParams() {
  const articles = await getFilteredArticles();
  const ids = articles.map((article) => ({ id: article._id }));

  return ids;
}
// export const revalidate = 3600;
async function Page() {

  const articles = await getFilteredArticles();
  const categories = await getAllCategory();

  const status = "draft";
  const totalDrafts = articles?.filter(
    (article) => article.status === status
  );

  const getRecentArticle = articles
    ?.filter((article) => article.createdAt)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const getPopularArticles = articles
    ?.filter((item) => item.views)
    .sort((a, b) => b.views - a.views);

  return (
    <div className="p-8 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-200 mb-8 text-left">
        Dashboard
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 text-slate-400">
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer">
          <h3 className="text-xl font-semibold mb-2">Total Posts</h3>
          <div className="text-3xl font-bold text-indigo-600">
            {articles?.length}
          </div>
          <FaNewspaper className="w-8 h-8 text-indigo-600 mt-4" />
        </div>

        <div className="bg-slate-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer">
          <h3 className="text-xl font-semibold mb-2">Total Drafts</h3>
          <div className="text-3xl font-bold text-yellow-500">
            {totalDrafts.length}
          </div>
          <FaNewspaper className="w-8 h-8 text-yellow-500 mt-4" />
        </div>
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer">
          <h3 className="text-xl font-semibold mb-2">Categories</h3>
          <ul className="grid grid-cols-2 gap-2">
            {categories?.categories?.map((category, index) => (
              <li key={category._id} className="text-sm text-slate-4500">
                {category.name}
              </li>
            ))}
          </ul>
          <FaTag className="w-8 h-8 text-green-500 mt-4" />
        </div>

        <div className="bg-slate-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer">
          <h3 className="text-xl font-semibold mb-2">Total Reach</h3>
          <div className="text-3xl font-bold text-blue-500">120 Reach</div>
          <FaUsers className="w-8 h-8 text-blue-500 mt-4" />
        </div>
      </div>

      {/* Recent Posts */}
      <PostList
        articles={getRecentArticle}
        header={"Recent"}
      />
      <PostList
        articles={getPopularArticles}
        header={"Popular"}
      />
    </div>
  );
}

export default Page;
