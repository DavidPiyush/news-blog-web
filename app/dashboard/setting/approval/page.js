import ArticleApproved from "@/app/_components/ArticleApproved";
import { getAllArticle } from "@/app/_lib/data-service";
export const dynamic = "force-dynamic"; // Mark the page as dynamic
export const revalidate = 0;

async function page({ searchParams }) {
  const { isApproved = "all", author = "", search = "" } = searchParams || {};

  // Fetch articles with filters applied
  const { articles } = await getAllArticle();

  return (
    <div className="p-8 min-h-screen bg-white text-black ">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6 ">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 ">
          Content Approval
        </h1>

        {/* Filter Section */}
        <section className="mb-6">
          <form method="GET" className="flex items-center space-x-4 flex-wrap">
            <fieldset className="flex items-center">
              <label htmlFor="statusFilter" className="text-gray-900 ">
                Filter by Status:
              </label>
              <select
                name="isApproved"
                id="statusFilter"
                defaultValue={isApproved}
                className="border border-gray-300 p-2 rounded-lg ml-2  "
              >
                <option value="all">All</option>
                <option value="true">Approved</option>
                <option value="false">Rejected</option>
              </select>
            </fieldset>

            <fieldset className="flex items-center">
              <label htmlFor="authorFilter" className="text-gray-900 ">
                Filter by Author:
              </label>
              <input
                type="text"
                name="author"
                id="authorFilter"
                placeholder="Enter author's name"
                defaultValue={author}
                className="border border-gray-300 p-2 rounded-lg ml-2  "
              />
            </fieldset>

            <fieldset className="flex items-center">
              <label htmlFor="search" className="text-gray-900 ">
                Search:
              </label>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search articles..."
                defaultValue={search}
                className="border border-gray-300 p-2 rounded-lg ml-2  "
              />
            </fieldset>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Apply Filters
            </button>
          </form>
        </section>

        {/* Articles List */}
        <ArticleApproved articles={articles} />
      </div>
    </div>
  );
}

export default page;
