import Link from "next/link";
async function TopViewNews({ articles }) {
  const articlesData = articles
    ?.filter((article) => article.status === status && article.isApproved) // Step 1: Filter articles
    .sort((a, b) => b.views - a.views); // Step 2: Sort

  return (
    <div className="space-y-4">
      {articlesData?.map((item) => (
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
