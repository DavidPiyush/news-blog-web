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
  const { article } = await getArticlesBasedOnSlug(params.url);
  return { title: `Article ${article?.title}` };
}

export async function generateStaticParams() {
  const articles = await getFilteredArticles();

  const ids = articles.map((article) => ({ articleId: String(article._id) }));

  return ids;
}

async function page({ params }) {
  const { url } = params;

  console.log(url);
  const { article } = await getArticlesBasedOnSlug(url);

  const { user } = await getUserById(article?.author);

  console.log(article, "this aritlec");
  const articles = await getFilteredArticles();

  return (
    <div>
      {article ? (
        <Suspense fallback={<Spinner />}>
          <NewsPage article={article} user={user} articles={articles} />
        </Suspense>
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export default page;
