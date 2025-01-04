import { Suspense } from "react";
import ArticleMainPage from "../_components/ArticleMainPage";
import { getAllCategory, getFilteredArticles } from "../_lib/data-service";
import Spinner from "../_components/Spinner";
import NotFound from "../not-found";
export const dynamic = 'force-dynamic'; // Mark the page as dynamic

export const revalidate = 3600;  // Cache expires after 1 hour


export const metadata = {
  title: "World News",
};

async function Page() {
  let articles = [];
  let categories = [];

  try {
    // Fetch data from the database
    articles = await getFilteredArticles();
    categories = await getAllCategory();
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <section className="bg-primary-950 text-primary-100 min-h-screen flex flex-col relative">
        <p>Error fetching data. Please try again later.</p>
      </section>
    );
  }

  // Handle case where no articles are found
  if (!articles || articles.length === 0) {
    return (
      <section className="bg-primary-950 text-primary-100 min-h-screen flex flex-col relative">
        <p>No articles found.</p>
      </section>
    );
  }

  // Filter and map world-news articles
  const worldArticles = articles
    ?.filter((article) => {
      const worldCategory = categories.find(
        (category) => category?.slug === "world-news"
      );
      return worldCategory && article.categories === worldCategory._id;
    })
    .map((article) => {
      const matchedCategory = categories.find(
        (category) => category._id === article.categories
      );
      return {
        ...article,
        categoryName: matchedCategory ? matchedCategory.name : "Unknown",
      };
    });

  return (
    <div>
      {worldArticles && worldArticles.length > 0 ? (
        <Suspense fallback={<Spinner />}>
          <ArticleMainPage articles={worldArticles} />
        </Suspense>
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export default Page;
