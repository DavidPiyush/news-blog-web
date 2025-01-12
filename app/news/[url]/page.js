import NewsPage from "@/app/_components/NewsPage";
import Spinner from "@/app/_components/Spinner";
import {
  commentBasedOnPost,
  getAllCategory,
  getArticlesBasedOnSlug,
  getFilteredArticles,
  getUserById,
} from "@/app/_lib/data-service";
import NotFound from "@/app/not-found";
import { Suspense } from "react";

export const dynamic = "force-dynamic"; // Mark the page as dynamic
export const revalidate = 0;

async function page({ params }) {
  const { url } = params;

  try {
    // Fetch data in parallel
    const [articleData, categoriesData, filteredArticles] = await Promise.all([
      getArticlesBasedOnSlug(url),
      getAllCategory(),
      getFilteredArticles(),
    ]);

    const { article } = articleData;
    const { categories } = categoriesData;

    if (!article) {
      console.error("Article not found for URL:", url);
      return <NotFound />;
    }

    const matchedCategory = categories.find(
      (cat) => cat._id === article.categories
    );

    const articleWithCategory = {
      ...article,
      categoryName: matchedCategory ? matchedCategory.name : "unknown",
    };

    const { user } = await getUserById(article?.author);
    const comments = await commentBasedOnPost(article?._id);

    return (
      <div>
        <Suspense fallback={<Spinner />}>
          <NewsPage
            article={articleWithCategory}
            user={user || null}
            articles={filteredArticles || []}
            comments={comments}
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
