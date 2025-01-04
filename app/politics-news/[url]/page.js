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
export const dynamic = 'force-dynamic'; // Mark the page as dynamic

export const revalidate = 3600;  // Cache expires after 1 hour


// Metadata generation
export async function generateMetadata({ params }) {
  try {
    const { article } = await getArticlesBasedOnSlug(params.url);

    if (!article) {
      return { title: "Article Not Found" };
    }

    return { title: `Article: ${article.title}` };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return { title: "Error" };
  }
}

// Page rendering
async function page({ params }) {
  const { url } = params;

  try {
    // Fetch the article based on the URL slug
    const { article } = await getArticlesBasedOnSlug(url);

    if (!article) {
      console.error("Article not found for URL:", url);
      return <NotFound />;
    }

    // Fetch the user who authored the article
    const { user } = await getUserById(article.author);

    // Fetch all filtered articles for the sidebar or other purposes
    const articles = await getFilteredArticles();

    return (
      <div>
        <Suspense fallback={<Spinner />}>
          <NewsPage article={article} user={user} articles={articles} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error("Error rendering page:", error);
    return <NotFound />;
  }
}

export default page;
