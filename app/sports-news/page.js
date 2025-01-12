import { Suspense } from "react";
import ArticleMainPage from "../_components/ArticleMainPage";
import { getAllCategory, getFilteredArticles } from "../_lib/data-service";
import NotFound from "../not-found";
import Spinner from "../_components/Spinner";
export const dynamic = 'force-dynamic'; // Mark the page as dynamic
// export const revalidate = 3600;  // Cache expires after 1 hour


export const metadata = {
  title: "Sports News",
};

async function Page() {
  try {
    // Fetch articles and categories
    const articles = await getFilteredArticles();
    const { categories } = await getAllCategory();

    // Handle case where no articles are found
    if (!articles || articles.length === 0) {
      console.warn("No articles found.");
      return (
        <section className="bg-primary-950 text-primary-100 min-h-screen flex flex-col relative">
          <NotFound />
        </section>
      );
    }

    // Filter and map sports articles
    const sportArticles = articles
      .filter((article) => {
        // Find the category object that matches the slug "sports-news"
        const sportsCategory = categories.find(
          (category) => category?.slug === "sports-news"
        );

        // Check if the article's category matches the sports category's ID
        return sportsCategory && article.categories === sportsCategory._id;
      })
      .map((article) => {
        // Append the category name to the article
        const matchedCategory = categories.find(
          (category) => category._id === article.categories
        );
        return {
          ...article,
          categoryName: matchedCategory ? matchedCategory.name : "Unknown",
        };
      });

    // Render the page
    return (
      <div>
        {sportArticles.length > 0 ? (
          <Suspense fallback={<Spinner />}>
            <ArticleMainPage articles={sportArticles} />
          </Suspense>
        ) : (
          <NotFound />
        )}
      </div>
    );
  } catch (error) {
    console.error("Error rendering Sports News page:", error);
    return (
      <section className="bg-primary-950 text-primary-100 min-h-screen flex flex-col relative">
        <NotFound />
      </section>
    );
  }
}

export default Page;
