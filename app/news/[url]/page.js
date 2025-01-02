import Header from "@/app/_components/Header";
import NewsPage from "@/app/_components/NewsPage";
import {
  getArticlesBasedOnSlug,
  getFilteredArticles,
  getUserById,
} from "@/app/_lib/data-service";

async function page({ params }) {
  const { url } = params;

  const { article } = await getArticlesBasedOnSlug(url);
  const { user } = await getUserById(article.author);

  const articles  = await getFilteredArticles();

  return (
    <div>
      <NewsPage article={article} user={user} articles={articles} />
    </div>
  );
}

export default page;
