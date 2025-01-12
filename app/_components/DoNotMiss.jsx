import Link from "next/link";
import HeaderLevelFour from "./HeaderLevelFour";
import Image from "next/image"; // Import Next.js Image component
import { connectToDB } from "../_lib/connectDB";
import Article from "@/models/ArticleModel";

async function DoNotMiss() {
  try {
    // Establish a connection to the database
    await connectToDB();

    // Fetch articles from the database
    const articlesData = await Article.find().lean();

    const status = "published";
    
    const articles = articlesData
      ?.filter((article) => article.status === status && article.isApproved) // Step 1: Filter articles
      .sort((a, b) => b.views - a.views); // Step 2: Sort articles by views in descending order

    // Handle case where no articles are available
    if (!articles || articles.length === 0) {
      console.warn("No articles found for 'Don't Miss' section.");
      return (
        <div className="text-gray-500 text-sm italic">
          No articles available at the moment.
        </div>
      );
    }

    return (
      <>
        {/* List Header */}
        <h5 className="bg-gray-900 text-white text-xl font-semibold px-4 py-2 rounded-md w-full">
          Don&apos;t Miss!
        </h5>

        {/* News Items */}
        {articles.slice(0, 5).map((post) => (
          <div
            key={post._id}
            className="grid grid-cols-2 gap-4 items-center justify-between mb-4"
          >
            <Link href={`/news/${post.slug}`} passHref>
              <Image
                src={post.coverImage || "/placeholder.jpg"} // Fallback image
                alt={post.title || "Article Image"}
                width={112}
                height={75}
                className="rounded-xl w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
              />
            </Link>

            <HeaderLevelFour
              title={post.title || "Untitled Article"}
              fontSize="text-sm"
              href={`/news/${post.slug}`}
            />
          </div>
        ))}
      </>
    );
  } catch (error) {
    console.error("Error fetching articles for 'Don't Miss' section:", error);

    return (
      <div className="text-red-500 text-sm italic">
        An error occurred while loading the articles. Please try again later.
      </div>
    );
  }
}

export default DoNotMiss;
