import SubmitButton from "@/app/_components/SubmitButton";
import { postApproval } from "@/app/_lib/actions";
import { getAllArticle } from "@/app/_lib/data-service";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0;

async function page({ searchParams }) {
  const { isApproved = "all", author = "", search = "" } = searchParams || {};

  // Fetch articles with filters applied
  const { articles } = await getAllArticle({
    isApproved,
    author,
    search,
  });

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
        <section className="space-y-4">
          {articles.map((article) => (
            <article
              key={article._id}
              className={`flex justify-between items-center p-4 rounded-lg shadow-sm ${
                article.isApproved ? "bg-white" : "bg-slate-100"
              } `}
            >
              <div className="flex items-center space-x-4">
                <Link
                  href={`/news/${article.slug}`}
                  className="flex space-x-4 cursor-pointer"
                >
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded-lg transition-transform transform hover:scale-105"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600  ">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 ">
                      By {article.author.name} | Submitted on{" "}
                      {new Date(article.publishedAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </Link>
              </div>
              <div className="flex space-x-4">
                {article.isApproved ? (
                  <span className="px-4 py-2 rounded-lg text-white bg-green-500">
                    Approved
                  </span>
                ) : (
                  <form action={postApproval}>
                    <input type="hidden" name="Id" value={article._id} />
                    <input type="hidden" name="isApproved" value="true" />
                    <SubmitButton
                      pendingLabel={"Approving..."}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Approve
                    </SubmitButton>
                  </form>
                )}
                {!article.isApproved && (
                  <form action={postApproval}>
                    <input type="hidden" name="Id" value={article._id} />
                    <input type="hidden" name="isApproved" value="false" />
                    <SubmitButton
                      pendingLabel={"Rejecting..."}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Reject
                    </SubmitButton>
                  </form>
                )}
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

export default page;
