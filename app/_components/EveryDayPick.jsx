import Link from "next/link";
import HeaderLevelFour from "./HeaderLevelFour";
import Image from "next/image"; // Use Next.js Image component
import { getFilteredArticles } from "../_lib/data-service";

async function EveryDayPick() {
  const articles = await getFilteredArticles();

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
