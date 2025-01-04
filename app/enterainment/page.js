import { Suspense } from "react";
import ArticleMainPage from "../_components/ArticleMainPage";
import { getAllCategory, getFilteredArticles } from "../_lib/data-service";
import NotFound from "../not-found";
import Spinner from "../_components/Spinner";

export const metadata = {
  title: "Entertainment",
};

async function Page() {
  try {
    // Fetch articles and categories
    const articles = await getFilteredArticles();
    const { categories } = await getAllCategory();

    // Handle case where no articles or categories are found
    if (!articles || articles.length === 0) {
      console.warn("No articles found.");
      return (
        <section className="bg-primary-950 text-primary-100 min-h-screen flex flex-col relative">
          <NotFound />
        </section>
      );
    }

    // Filter and map entertainment articles
    const entertainmentArticles = articles
      .filter((article) => {
        // Find the category object that matches the slug "entertainment"
        const entertainmentCategory = categories?.find(
          (category) => category.slug === "entertainment"
        );

        // Check if the article's category matches the entertainment category's ID
        return (
          entertainmentCategory &&
          article.categories === entertainmentCategory._id
        );
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
        {entertainmentArticles.length > 0 ? (
          <Suspense fallback={<Spinner />}>
            <ArticleMainPage articles={entertainmentArticles} />
          </Suspense>
        ) : (
          <NotFound />
        )}
      </div>
    );
  } catch (error) {
    console.error("Error rendering Entertainment page:", error);
    return (
      <section className="bg-primary-950 text-primary-100 min-h-screen flex flex-col relative">
        <NotFound />
      </section>
    );
  }
}

export default Page;
