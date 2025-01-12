import Link from "next/link";
import HeaderLevelSix from "./HeaderLevelSix";
import HeaderLevelFour from "./HeaderLevelFour";
import TextDescription from "./TextDescription";

function WorldNewsTop({ articles }) {
  const getPopularArticles = articles
    ?.filter((item) => item.views)
    .sort((a, b) => b.views - a.views);
    
  return (
    <>
      {getPopularArticles?.map((post) => (
        <div
          className="shadow-md hover:shadow-lg rounded-lg overflow-hidden bg-white transition-all duration-300"
          key={post.id}
        >
          <Link href={`news/${post.slug}`}>
            <img
              src={post.coverImage}
              alt="card image"
              className="w-full h-48 object-cover rounded-t-lg hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <div className="p-5 space-y-4">
            <button className="bg-red-600 text-white px-3 py-1 rounded-md text-sm font-semibold">
              {post.categoryName}
            </button>
            <HeaderLevelFour title={post.title} href={`news/${post.slug}`} />

            <HeaderLevelSix
              author={post.author.name}
              date={new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            />

            <TextDescription text={post.summary} />
          </div>
        </div>
      ))}
    </>
  );
}

export default WorldNewsTop;
