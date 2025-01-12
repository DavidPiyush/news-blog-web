import Image from "next/image";
import HeaderLevelFour from "./HeaderLevelFour";
import Link from "next/link";

function SportTrendList({ articles }) {
  const getRecentArticle = articles
    ?.filter((article) => article.createdAt)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      {/* Increased the gap between items */}
      {getRecentArticle?.map((post) => (
        <div
          key={"sports" + post.id}
          className="flex flex-col items-center bg-white rounded-lg shadow-md overflow-hidden flex-auto mb-6"
        >
          {/* Clickable Container */}
          <div className="relative w-full h-[150px] overflow-hidden rounded-t-lg">
            <Link href={`news/${post.slug}`} className="w-full">
              <Image
                src={post.coverImage || ""}
                alt={post.title}
                layout="fill" // Use layout="fill" for responsiveness
                objectFit="cover" // Ensure the image covers the container without stretching
                className="w-full h-full" // Ensure proper aspect ratio with object-cover
              />
            </Link>
          </div>

          {/* Text */}
          <div className="flex items-center justify-center py-3 w-full rounded-b-lg pl-4 pt-6">
            <HeaderLevelFour title={post.title} href={`/news/${post.slug}`} />
          </div>
        </div>
      ))}
    </>
  );
}

export default SportTrendList;
