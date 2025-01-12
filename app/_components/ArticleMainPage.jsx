'use client'
import Link from "next/link";
import DoNotMiss from "./DoNotMiss";
import NewsHeader from "./NewsHeader";
import SocailLinkBox from "./SocailLinkBox";
import SportsTrendMain from "./SportsTrendMain";
import SportTrendList from "./SportTrendList";
import TopViewNews from "./TopViewNews";
import VerticalCard from "./VerticalCard";
import { useState } from "react";

function ArticleMainPage({articles=[]}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3; // Adjust this value based on the total number of pages

 const handlePageChange = (page) => {
   setCurrentPage(page);
   // Logic to fetch or update the content for the selected page
 };
  return (
    <section className="mt-12 max-w-6xl mx-auto">
      <div className="  grid grid-cols-2 gap-4">
        <SportsTrendMain articles={articles} />
        <div className="grid grid-cols-2">
          <SportTrendList articles={articles} />
        </div>
      </div>

      <div className="grid grid-cols-8 mt-24 gap-6">
        <div className="col-span-6">
          <NewsHeader newType="Browsing: Technology" view="" />
          <div className="grid grid-cols-2 gap-12 mt-6">
            {articles.map((article) => (
              <VerticalCard
                key={article._id}
                title={article.title}
                subtile={article.subTitle} // Fixed the typo: subtile -> subtitle
                views={article.views}
                image={article.coverImage}
                read={article.readingTime}
                url={`${article.url}`}
                date={article.published}
              />
            ))}
          </div>

          <div className="flex  items-center space-x-4 my-10">
            {/* Previous Button */}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-md ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            {/* Next Button */}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>

        <div className="col-span-2 space-y-6">
          <div className="w-[300px] h-[250px] bg-gray-200 border border-gray-300 rounded-lg shadow-lg flex flex-col items-center justify-start overflow-hidden">
            {/* Sponsored label */}
            <div className="w-full bg-yellow-500 text-white text-center py-1 font-bold text-sm">
              Sponsored Ad
            </div>

            {/* Ad content */}
            <Link
              href="https://www.example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-full flex items-center justify-center"
            >
              <img
                src="https://via.placeholder.com/300x250"
                alt="Ad"
                className="w-full h-full object-cover rounded-b-lg"
              />
            </Link>
          </div>

          <div className="w-[300px] space-y-8">
            <h5 className="bg-gray-900 text-white text-xl font-semibold px-4 py-2 rounded-md">
              Most Viewed
            </h5>
            <TopViewNews />
          </div>

          <div className=" space-y-8">
            <h5 className="bg-gray-900 text-white text-xl font-semibold px-4 py-2 rounded-md">
              Stay In Touch
            </h5>
            <SocailLinkBox />
          </div>

          <DoNotMiss />
          {/* <NewsLetter /> */}
        </div>
      </div>
    </section>
  );
}

export default ArticleMainPage;
