import { Suspense } from "react";
import ArticleMainPage from "../_components/ArticleMainPage";
import { getAllCategory, getFilteredArticles } from "../_lib/data-service";
import Spinner from "../_components/Spinner";
import NotFound from "../not-found";
export const dynamic = 'force-dynamic'; // Mark the page as dynamic

// export const revalidate = 0;  // Cache expires after 1 hour


export const metadata = {
  title: "Tech News",
};

async function Page() {
  try {
    // Fetch articles and categories
    const articles = await getFilteredArticles();
    const { categories } = await getAllCategory();

    // Filter articles for the "Tech News" category
    const techArticles = articles
      .filter((article) => {
        const techCategory = categories.find(
          (category) => category.slug === "tech-news"
        );
        return techCategory && article.categories === techCategory._id;
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

    // If no tech articles are found, show NotFound
    if (techArticles.length === 0) {
      return (
        <section className="bg-primary-950 text-primary-100 min-h-screen flex flex-col relative">
          <NotFound />
        </section>
      );
    }

    // Render Tech Articles
    return (
      <div>
        <Suspense fallback={<Spinner />}>
          <ArticleMainPage articles={techArticles} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error("Error loading Tech News Page:", error);
    return (
      <section className="bg-primary-950 text-primary-100 min-h-screen flex flex-col relative">
        <NotFound />
      </section>
    );
  }
}

export default Page;
