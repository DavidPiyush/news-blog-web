import { Suspense } from "react";
import ArticleMainPage from "../_components/ArticleMainPage";
import Spinner from "../_components/Spinner";
import NotFound from "../not-found";
import Article from "@/models/ArticleModel";
import Category from "@/models/CategoryModel";
import { connectToDB } from "../_lib/connectDB";

export const dynamic = "force-dynamic"; // Mark the page as dynamic

export const metadata = {
  title: "World News",
};

async function Page() {
  try {
    await connectToDB(); // Ensure the database connection is established

    // Fetch articles and categories
    const articlesData = await Article.find().populate("author").lean();
    const categories = await Category.find().lean();

    // Filter articles by status and approval
    const status = "published";
    
    const articles = articlesData?.filter(
      (article) => article.status === status && article.isApproved
    );

    if (!articles || articles.length === 0) {
      console.warn("No articles found.");
      return (
        <section className="bg-primary-950 text-primary-100 min-h-screen flex flex-col relative">
          <NotFound />
        </section>
      );
    }

    // Filter and map world news articles
    const worldCategory = categories.find(
      (category) => category.slug === "world-news"
    );

    if (!worldCategory) {
      console.warn("World category not found.");
      return null; // Exit early if the category doesn't exist
    }

    // Filter articles related to the world news category
    const worldArticles = articles
      .filter(
        (article) =>
          article.categories?.toString() === worldCategory._id.toString()
      )
      .map((article) => ({
        ...article,
        categoryName: worldCategory.name,
      }));

    // Render the page
    return (
      <div>
        {worldArticles.length > 0 ? (
          <Suspense fallback={<Spinner />}>
            <ArticleMainPage articles={worldArticles} />
          </Suspense>
        ) : (
          <NotFound />
        )}
      </div>
    );
  } catch (error) {
    console.error("Error rendering World News page:", error);
    return (
      <section className="bg-primary-950 text-primary-100 min-h-screen flex flex-col relative">
        <NotFound />
      </section>
    );
  }
}

export default Page;
