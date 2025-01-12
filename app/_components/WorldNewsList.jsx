import Link from "next/link";

import HeaderLevelFour from "./HeaderLevelFour";
import HeaderLevelSix from "./HeaderLevelSix";
import TextDescription from "./TextDescription";

function WorldNewsList({ articles }) {
  return (
    <>
      {articles?.map((post) => (
        <div
          className="shadow-lg hover:shadow-lg rounded-lg overflow-hidden bg-white  transition-all duration-300 flex"
          key={post.id}
        >
          <Link href={`news/${post.slug}`} >
            <img
              src={post.coverImage}
              alt="card image"
              className="w-[300px] h-[200px] object-cover rounded-t-lg hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <div className="px-5 space-y-3">
            <button className="text-gray-600  mt-2 rounded-md text-sm font-semibold">
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

export default WorldNewsList;
