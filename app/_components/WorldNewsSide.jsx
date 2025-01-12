import Link from "next/link";
import HeaderLevelSix from "./HeaderLevelSix";
import HeaderLevelFour from "./HeaderLevelFour";

function WorldNewsSide({ articles }) {

  const getRecentArticle = articles
    ?.filter((article) => article.createdAt)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
  return (
    <>
      {getRecentArticle?.map((post) => (
        <div
          className="shadow-md hover:shadow-lg rounded-lg overflow-hidden bg-white transition-all duration-300"
          key={post._id}
        >
          <Link href={`news/${post.slug}`}>
            <img
              src={post.coverImage}
              alt="side card image"
              className="w-full h-32 object-cover rounded-t-lg hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <div className="px-4 py-3 space-y-2">
            <HeaderLevelFour title={post.title} href={`news/${post.slug}`} />
            <HeaderLevelSix
              author={post.author.name}
              date={new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            />
          </div>
        </div>
      ))}
    </>
  );
}

export default WorldNewsSide;
