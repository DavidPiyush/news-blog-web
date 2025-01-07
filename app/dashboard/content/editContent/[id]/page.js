import EditPostedArticle from "@/app/_components/EditPostedArticle";
import { connectToDB } from "@/app/_lib/connectDB";
import Article from "@/models/ArticleModel";
import Category from "@/models/CategoryModel";

async function page({ params }) {
  const { id } = params;

  try {
    await connectToDB();

    // Fetch the article
    const article = await Article.findById(id).lean();
    const categories = await Category.find();
    // console.log(categories);

    if (!article && categories) {
      return (
        <div>
          <h1>Article Not Found</h1>
          <p>The article you are looking for does not exist.</p>
        </div>
      );
    }

    // Pass the article to the component
    return <EditPostedArticle article={JSON.parse(JSON.stringify(article))}  category={JSON.parse(JSON.stringify(categories))}/>;
  } catch (error) {
    console.error("Error fetching article:", error);
    return (
      <div>
        <h1>Error</h1>
        <p>There was an error loading the article. Please try again later.</p>
      </div>
    );
  }
}

export default page;
