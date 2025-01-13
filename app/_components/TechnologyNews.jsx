"use client";
import Link from "next/link";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import HeaderLevelFour from "./HeaderLevelFour";
import Image from "next/image";

function TechnologyNews({ articles, categories }) {
  const techArticles = articles
    .filter((article) => {
      // Find the category object that matches the name "Tech"
      const techCategory = categories.find(
        (category) => category.slug === "tech-news"
      );

      // Check if the article's category matches the found category's _id
      return techCategory && article.categories === techCategory._id;
    })
    .map((article) => {
      // Find the matching category again to append the name
      const matchedCategory = categories.find(
        (category) => category._id === article.categories
      );

      // Return a new object with the category name appended
      return {
        ...article,
        categoryName: matchedCategory ? matchedCategory.name : "Unknown",
      };
    });

  // show recent tech article
  const getRecentArticle = techArticles
    ?.filter((article) => article.createdAt)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // show popular tech article
  const getPopularArticles = techArticles
    ?.filter((item) => item.views)
    .sort((a, b) => b.views - a.views);

  return (
    <section className="mt-14 space-y-10">
      <div className="max-w-6xl mx-auto">
        <h3 className="flex gap-4 text-2xl py-4 items-center">
          <span className="text-[#F80759]">
            <Link href="#">
              <FaBarsStaggered size={24} />
            </Link>
          </span>
          <strong className="text-2xl">Technology Post</strong>
        </h3>
        <article className="grid grid-cols-3 justify-between items-center gap-8 ">
          {getPopularArticles.map((post) => (
            <div
              className="shadow-lg rounded-md overflow-hidden"
              key={post._id}
            >
              <div className="relative aspect-square h-[190px] w-full">
                <Link href={`news/${post.slug}`}>
                  <Image
                    src={post.coverImage || ""}
                    alt="card image"
                    fill
                    className="rounded-md hover:scale-105 overflow-hidden duration-300 ease-in-out transition-all w-full"
                  />
                </Link>
              </div>

              <div className="px-4 py-6">
                <HeaderLevelFour
                  title={post.title}
                  href={`news/${post.slug}`}
                />
                {/* <HeaderLevelSix author={post.author} date={post.date} /> */}
                <div className="flex items-center  text-gray-400 mt-2 gap-2 text-xs ">
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <FaClock />
                  <span>{post.readingTime} Mins Read</span>
                </div>
              </div>
            </div>
          ))}
        </article>
      </div>

      {/* Second row without the "Mins Read" and date section */}
      <div className="max-w-6xl mx-auto ">
        <article className="grid grid-cols-4 justify-between items-center gap-8 ">
          {getRecentArticle.map((post) => (
            <div
              className="shadow-lg rounded-md overflow-hidden"
              key={post._id}
            >
              <div className="relative aspect-square h-[140px] w-full">
                <Link href={`news/${post.slug}`}>
                  <Image
                    src={post.coverImage || ""}
                    alt="card image"
                    fill
                    className="rounded-md hover:scale-105 overflow-hidden duration-300 ease-in-out transition-all w-full"
                  />
                </Link>
              </div>

              <div className="px-4 py-6">
                <HeaderLevelFour
                  title={
                    post.title.length > 40
                      ? post.title.substring(0, 40) + "..."
                      : post.title
                  }
                  href={`news/${post.slug}`}
                />
              </div>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}

export default TechnologyNews;
