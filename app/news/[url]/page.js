import NewsPage from "@/app/_components/NewsPage";
import Spinner from "@/app/_components/Spinner";
import { connectToDB } from "@/app/_lib/connectDB";
import {
  commentBasedOnPost,
  getAllCategory,
  getUserById,
} from "@/app/_lib/data-service";
import NotFound from "@/app/not-found";
import Article from "@/models/ArticleModel";
import Category from "@/models/CategoryModel";
import { Suspense } from "react";

export const dynamic = "force-dynamic"; // Mark the page as dynamic

async function page({ params }) {
  const { url } = params;

  try {
    await connectToDB();

    // Fetch all articles and categories
    const articlesData = await Article.find().populate("author").lean();
    const categories = await Category.find().lean();

    // Find the article by slug (URL parameter)
    const currentArticle = await Article.find({ slug: url })
      .populate("author")
      .lean();

      if (!currentArticle || currentArticle.length === 0) {
        console.error("Article not found for URL:", url);
        return <NotFound />;
      }
      
     
    const article = currentArticle[0];

    // Filter articles by status and approval
    const status = "published";

    const filteredArticles = articlesData?.filter(
      (article) => article.status === status && article.isApproved
    );

    // Find the category associated with the article
    const matchedCategory = categories.find(
      (cat) => cat._id.toString() == article.categories.toString()
    );

    
    const articleWithCategory = {
      ...article,
      categoryName: matchedCategory ? matchedCategory.name : "Unknown",
    };

    

    // Fetch user and comments associated with the article
    const { user } = await getUserById(article?.author?._id);
    const comments = await commentBasedOnPost(article?._id);

    // Return the page with article, user, comments, and filtered articles
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
