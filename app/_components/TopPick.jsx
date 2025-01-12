import HeaderLevelSix from "./HeaderLevelSix";
import TextDescription from "./TextDescription";
import Image from "next/image";
import Link from "next/link";

async function TopPick({ articles }) {
  const getPopularArticles = articles
    ?.filter((item) => item.views)
    .sort((a, b) => b.views - a.views);

  return (
    <>
      <h5 className="bg-gray-900 text-white text-xl font-semibold px-4 py-2 rounded-md">
        Our Picks
      </h5>

      {/* Ensure getArticle is an array before attempting to slice */}
      {getPopularArticles?.slice(0, 1)?.map((item, index) => (
        <div
          key={item._id}
          className="relative shadow-md hover:shadow-lg rounded-md overflow-hidden bg-white transition-all duration-300 group mt-10"
        >
          {/* Image */}
          <Link href={`${item.slug}`}>
            <Image
              src={item.coverImage || ""}
              alt={`Slide ${index}`}
              width={100}
              height={240}
              className="w-full h-60 object-cover flex-shrink-0"
            />
          </Link>
          {/* Content */}
          <div className="p-5 space-y-4">
            {/* Status Button */}
            <button className="bg-red-600 text-white px-3 py-1 rounded-md text-sm font-semibold">
              {item.tags[0]}
            </button>

            {/* Title */}
            <h4 className="text-md font-semibold text-gray-800 hover:text-red-600 transition-colors duration-300">
              {item.title}
            </h4>

            {/* Author and Date */}
            <HeaderLevelSix
              author={item.author.name}
              date={
                item.publishedAt
                  ? new Date(item.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "Unknown Date"
              }
            />

            {/* Description */}
            <TextDescription text={item.summary} />
          </div>
        </div>
      ))}
    </>
  );
}

export default TopPick;
