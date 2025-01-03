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

export async function generateMetadata({ params }) {
  try {
    const { article } = await getArticlesBasedOnSlug(params.url);

    if (!article) {
      return { title: "Article Not Found" };
    }

    return { title: `Article ${article.title}` };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return { title: "Error" };
  }
}

export async function generateStaticParams() {
  try {
    const articles = await getFilteredArticles();

    // Ensure the returned params match the dynamic route name
    return articles.map((article) => ({ url: article.slug })); // Assuming `slug` is the unique identifier
  } catch (error) {
    console.error("Error generating static params:", error);
    return []; // Return an empty array to prevent build failure
  }
}

async function page({ params }) {
  const { url } = params;

  try {
    const { article } = await getArticlesBasedOnSlug(url);

    if (!article) {
      console.error("Article not found for URL:", url);
      return <NotFound />;
    }

    const { user } = await getUserById(article.author);

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
