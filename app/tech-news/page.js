import { Suspense } from "react";
import ArticleMainPage from "../_components/ArticleMainPage";
import { getAllCategory, getFilteredArticles } from "../_lib/data-service";
import Spinner from "../_components/Spinner";
import NotFound from "../not-found";
import Article from "@/models/ArticleModel";
import Category from "@/models/CategoryModel";
import { connectToDB } from "../_lib/connectDB";

export const dynamic = "force-dynamic"; // Mark the page as dynamic

export const metadata = {
  title: "Tech News",
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

    // Filter and map tech articles
    const techCategory = categories.find(
      (category) => category.slug === "tech-news"
    );

    if (!techCategory) {
      console.warn("Tech category not found.");
      return null; // Exit early if the category doesn't exist
    }

    // Filter articles related to the tech category
    const techArticles = articles
      .filter(
        (article) =>
          article.categories?.toString() === techCategory._id.toString()
      )
      .map((article) => ({
        ...article,
        categoryName: techCategory.name,
      }));

    // Render the page
    return (
      <div>
        {techArticles.length > 0 ? (
          <Suspense fallback={<Spinner />}>
            <ArticleMainPage articles={techArticles} />
          </Suspense>
        ) : (
          <NotFound />
        )}
      </div>
    );
  } catch (error) {
    console.error("Error rendering Tech News page:", error);
    return (
      <section className="bg-primary-950 text-primary-100 min-h-screen flex flex-col relative">
        <NotFound />
      </section>
    );
  }
}

export default Page;
