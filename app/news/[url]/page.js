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

// Metadata generation (called during build time)
// export async function generateMetadata({ params }) {
//   try {
//     const { article } = await getArticlesBasedOnSlug(params.url);

//     if (!article) {
//       return { title: "Article Not Found" };
//     }

//     return { title: `Article: ${article.title}` };
//   } catch (error) {
//     console.error("Error generating metadata:", error);
//     return { title: "Error" };
//   }
// }

// Static Params generation for dynamic routes (called during build time)
// export async function generateStaticParams() {
//   try {
//     const articles = await getFilteredArticles();

//     // Ensure `articles` is valid and contains data
//     if (!articles || articles.length === 0) {
//       console.warn("No articles found for static params generation.");
//       return [];
//     }

//     // Return the expected format for static params
//     return articles.map((article) => ({ url: article.slug })); // Assuming `slug` is the correct property
//   } catch (error) {
//     console.error("Error generating static params:", error);
//     return []; // Return an empty array to prevent build failure
//   }
// }

// Page rendering (fetches article, user, and related articles)
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

    // Fetch related articles (filtered articles)
    const articles = await getFilteredArticles();

    return (
      <div>
        {/* Suspense for async loading of the NewsPage component */}
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
