"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaBarsStaggered } from "react-icons/fa6";
import HeaderLevelFour from "./HeaderLevelFour";

import Image from "next/image";

function Trending({ articles }) {
  const [popularArticlePage, setPopularArticlePage] = useState(1);
  const [articlesPerPage] = useState(4); // Set articles per page

  // Sort the articles by views
  const sortedPopularArticles = articles
    .filter((post) => post.views)
    .sort((a, b) => b.views - a.views);

  // Get articles for the current page
  const currentPopularArticles = sortedPopularArticles.slice(
    (popularArticlePage - 1) * articlesPerPage,
    popularArticlePage * articlesPerPage
  );

  return (
    <section className="mt-24">
      <div className="max-w-6xl mx-auto">
        <h3 className="flex gap-4 text-2xl py-4 items-center">
          <span className="text-[#F80759]">
            <Link href="#">
              <FaBarsStaggered size={24} />
            </Link>
          </span>
          <strong className="text-2xl">Trending Post</strong>
        </h3>

        {/* Display popular articles */}
        <article className="grid grid-cols-4 gap-8">
          {currentPopularArticles.length > 0 ? (
            currentPopularArticles.map((post,i) => (
              <div
                className="shadow-lg rounded-md overflow-hidden"
                key={i*9}
              >
                <div className="w-[270px] h-[170px] relative">
                  <Link href={`/${post.categorySlug}/${post.slug}`}>
                    <Image
                      src={post.coverImage ||''}
                      alt={post.title}
                      fill
                      className="rounded-md hover:scale-105 overflow-hidden duration-300 ease-in-out transition-all object-cover"
                    />
                  </Link>
                </div>
                <div>
                  <HeaderLevelFour
                    title={post.title}
                    paddingPx="px-4"
                    paddingPy="py-6"
                    href={`news/${post.slug}`}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No trending posts available</p>
          )}
        </article>
      </div>
    </section>
  );
}

export default Trending;
