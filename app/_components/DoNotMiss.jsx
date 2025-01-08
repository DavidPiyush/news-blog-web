import Link from "next/link";
import HeaderLevelFour from "./HeaderLevelFour";
import Image from "next/image"; // Import Next.js Image component
import { getAllArticle, getFilteredArticles } from "../_lib/data-service";

async function DoNotMiss() {
  const articles = await getFilteredArticles();

  return (
    <>
      {/* List Header */}
      <h5 className="bg-gray-900 text-white text-xl font-semibold px-4 py-2 rounded-md w-full">
        Don&apos;t Miss!
      </h5>

      {/* News Items */}
      {articles?.slice(0, 5).map((post) => (
        <div
          key={post._id}
          className="grid grid-cols-2 gap-4 items-center justify-between mb-4"
        >
          <Link href={`/news/${post.slug}`} passHref>
            <Image
              src={post.coverImage|| ""}
              alt={post.title}
              width={112}
              height={75}
              className="rounded-xl w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
            />
          </Link>

          <HeaderLevelFour
            title={post.title}
            fontSize="text-sm"
            href={`/news/${post.slug}`}
          />
        </div>
      ))}
    </>
  );
}

export default DoNotMiss;
