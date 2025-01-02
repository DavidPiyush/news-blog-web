'use client'
import { FaEnvelope, FaRotateRight } from "react-icons/fa6";
import HorizontalCard from "./HorizontalCard";

import NewsHeader from "./NewsHeader";
import NewsLetter from "./NewsLetter";
import TopViewNews from "./TopViewNews";
import { useEffect, useState } from "react";
import { getAllArticles, getUserData } from "../utils/api";

function EveryDayNew() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentArticles = async () => {
      setLoading(true);
      setError(null);

      try {
        const currenArticles = await getAllArticles(); // Corrected the variable name

        if (!currenArticles?.data?.articles?.length) {
          // No articles to fetch
          setArticles([]);
          setLoading(false);
          return;
        }

        // Filter articles for categorySlug === 'world-news'
        const articlesWithAuthors = await Promise.all(
          currenArticles.data.articles
            .filter((item) => item.categorySlug === "everyday-news") // Filter for 'world-news'
            .map(async (item) => {
              const authorData = await getUserData(item.author);
              return {
                id: item._id,
                url: `/${item.categorySlug}/${item.slug}`,
                image: item.coverImage,
                title: item.title,
                author: authorData.data.name,
                date: new Date(item.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }),
                category: item.categorySlug,
                read: item.readingTime,
                views: item.views,
                subtitle: item.subTitle,
                tag: item.tags[0],
              };
            })
        );
        setArticles(articlesWithAuthors);
      } catch (error) {
        console.error("Error fetching author data:", error);
        setError("Failed to load articles");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentArticles();
  }, []); // The effect runs on component mount

  if (loading) {
    return <div>Loading articles...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <section className="mt-24">
      <div className="  grid grid-cols-8 max-w-6xl mx-auto gap-6">
        <div className="col-span-6  space-y-10">
          <NewsHeader newType="EveryDay News" />
          <HorizontalCard articles={articles}/>
          
          <div className="flex items-center justify-center w-full">
            <button className="border-2 px-16 py-1 text-black text-lg font-medium hover:bg-black hover:text-white rounded-sm text-center transition-all duration-300 ease-linear flex items-center gap-2">
              Load More
              <span>
                <FaRotateRight size={16} />
              </span>
            </button>
          </div>
        </div>
        <div className="col-span-2 space-y-6 ">
          <NewsLetter />
          <div className=" w-[300px] space-y-8">
            <h5 className="bg-gray-900 text-white text-xl font-semibold px-4 py-2 rounded-md">
              Most Viewed
            </h5>
            <TopViewNews />
          </div>
        </div>
      </div>
    </section>
  );
}

export default EveryDayNew;
