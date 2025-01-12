import Link from "next/link";
import HeaderLevelFour from "./HeaderLevelFour";
import Image from "next/image"; // Use Next.js Image component
import { getFilteredArticles } from "../_lib/data-service";
import Article from "@/models/ArticleModel";
import { connectToDB } from "../_lib/connectDB";

async function EveryDayPick() {
  // Establish a connection to the database
  await connectToDB();

  // Fetch articles from the database
  const articlesData = await Article.find().lean();

  const status = "published";

  const articles = articlesData
    ?.filter((article) => article.status === status && article.isApproved) // Step 1: Filter articles
    .sort((a, b) => b.views - a.views); // Step 2: Sort articles by views in descending order
  return (
    <div className="mb-12 space-y-6">
      {/* News Items */}
      {articles.slice(2, 6).map((post) => (
        <div key={post.id} className="flex gap-6 items-center  ">
          <Link
            href={`news/${post.slug}`}
            passHref
            className="relative aspect-square h-20"
          >
            <Image
              src={post.coverImage || ""}
              alt={post.title}
              fill
              className="  rounded-xl  hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <HeaderLevelFour
            title={post.title}
            fontSize="text-sm"
            href={`news/${post.slug}`}
          />
        </div>
      ))}
    </div>
  );
}

export default EveryDayPick;
