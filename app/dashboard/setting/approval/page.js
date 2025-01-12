import ArticleApproved from "@/app/_components/ArticleApproved";
import { connectToDB } from "@/app/_lib/connectDB";
import { getAllArticle } from "@/app/_lib/data-service";
import Article from "@/models/ArticleModel";

async function page({ searchParams }) {
  // Connect to the database
  await connectToDB();

  // Destructure search parameters
  const { isApproved = "all", search = "" } = searchParams || {};

  // Build the filter object based on searchParams
  const filter = {};

  // Filter by approval status
  if (isApproved !== "all") {
    filter.isApproved = isApproved === "true" ? true : false;
  }

  // Filter by search term in title only
  if (search) {
    filter.title = new RegExp(search, "i"); // Search in title (case-insensitive)
  }

  // Find articles with the filter applied
  const articles = await Article.find(filter);
  console.log(articles.length);

  // If no articles are found, return an empty response
  if (!articles.length) {
    return (
      <div className="p-8 min-h-screen bg-white text-black">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Content Approval
          </h1>
          <p>No articles found based on your filters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen  text-black">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Content Approval
        </h1>

        {/* Filter Section */}
        <section className="mb-6">
          <form method="GET" className="flex items-center space-x-4 flex-wrap">
            <fieldset className="flex items-center">
              <label htmlFor="statusFilter" className="text-gray-900">
                Filter by Status:
              </label>
              <select
                name="isApproved"
                id="statusFilter"
                defaultValue={isApproved}
                className="border border-gray-300 p-2 rounded-lg ml-2"
              >
                <option value="all">All</option>
                <option value="true">Approved</option>
                <option value="false">Rejected</option>
              </select>
            </fieldset>

            <fieldset className="flex items-center">
              <label htmlFor="search" className="text-gray-900">
                Search by Title:
              </label>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search articles by title..."
                defaultValue={search}
                className="border border-gray-300 p-2 rounded-lg ml-2"
              />
            </fieldset>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Apply Filters
            </button>

            {/* Clear Filter Button */}
          </form>
        </section>

        {/* Articles List */}
        <ArticleApproved articles={articles} />
      </div>
    </div>
  );
}

export default page;
