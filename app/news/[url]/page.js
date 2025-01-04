import Header from "@/app/_components/Header";
import NewsPage from "@/app/_components/NewsPage";
import Spinner from "@/app/_components/Spinner";
import {
  getArticlesBasedOnSlug,
  getFilteredArticles,
  getUserById,
} from "@/app/_lib/data-service";
import NotFound from "@/app/not-found";
import { Suspense } from "react";

async function page({ params }) {
  const { url } = params;

  try {
    // Fetch article based on slug (url)
    const { article } = await getArticlesBasedOnSlug(url);

    if (!article) {
      console.error("Article not found for URL:", url);
      return <NotFound />;
    }

    // Fetch user based on article's author ID
    const { user } = await getUserById(article?.author);

    if (!user) {
      console.warn("Author not found for article:", article.title);
    }

    // Fetch related articles
    const articles = await getFilteredArticles();

    if (!articles || articles.length === 0) {
      console.warn("No related articles found.");
    }

    return (
      <div>
        {/* Suspense for async loading of the NewsPage component */}
        <Suspense fallback={<Spinner />}>
          <NewsPage
            article={article}
            user={user || null} // Pass `null` if user not found
            articles={articles || []} // Pass an empty array if no related articles
          />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error("Error rendering page:", error);
    return <NotFound />;
  }
}

export default page;
