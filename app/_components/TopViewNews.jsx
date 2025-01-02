import Link from "next/link";
import { getFilteredArticles } from "../_lib/data-service";

async function TopViewNews() {
  const articles = await getFilteredArticles(); // Fetch your articles

  // Filter articles with views greater than 100
  const filteredArticles = articles.filter((article) => article.views > 50);

  return (
    <div className="space-y-4">
      {filteredArticles.map((item) => (
        <div
          key={item._id}
          className="grid grid-cols-3 gap-4 border border-gray-300 rounded-md shadow-sm overflow-hidden hover:shadow-lg transition-all transform hover:scale-105 bg-white"
        >
          {/* Article Image */}
          <Link href={`/${item.slug}`} className="col-span-1">
            <img
              src={item.coverImage || "https://via.placeholder.com/100"}
              alt="Article"
              className="w-full h-full object-cover cursor-pointer"
            />
          </Link>

          {/* Article Content */}
          <div className="col-span-2 p-2 flex flex-col justify-center">
            <h4 className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition">
              <Link
                href={`/${item.categorySlug}/${item.slug}`}
                className="cursor-pointer"
              >
                {item.title} {/* Dynamically setting title */}
              </Link>
            </h4>
            <p className="text-xs text-gray-500 mt-1">
              {/* Displaying article date and read time dynamically */}
              {item.publishedAt
                ? new Date(item.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "Unknown Date"}{" "}
              • {item.readingTime || "Unknown Read Time"} Mins Read
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopViewNews;
