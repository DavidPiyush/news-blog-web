"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

function SportsTrendMain({ articles = [] }) {
  // State for current slide
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change slide every 5 seconds
  useEffect(() => {
    if (articles.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length); // Loop through articles
      }, 5000); // Change slide every 5000ms (5 seconds)

      return () => clearInterval(timer); // Cleanup interval on component unmount
    }
  }, [articles]);

  // Function to change slide on indicator click
  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  // If no articles available, return early
  if (articles.length === 0) {
    return <div>No articles available</div>;
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Current Slide */}
      <div className="relative w-full h-[500px] overflow-hidden rounded-lg shadow-lg">
        {/* Wrap Image with Link */}
        <Link
          href={`news/${articles[currentIndex]?.slug}`}
          className="relative block w-full h-full"
        >
          <Image
            src={articles[currentIndex]?.coverImage || ""}
            alt={articles[currentIndex]?.title || ""}
            layout="fill"
            className="object-cover rounded-lg"
          />
        </Link>
        {/* Title and Text with Stronger Shaded Background */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black to-transparent p-6 text-white">
          <Link
            href={`news/${articles[currentIndex]?.slug}`}
            className="relative block w-full h-full"
          >
            <h2 className="text-3xl font-bold text-white hover:text-blue-500 transition-colors">
              {articles[currentIndex]?.title || "Title not available"}
            </h2>
            <p className="mt-2 text-sm">
              By {articles[currentIndex]?.author.name || "Author not available"} |{" "}
              {articles[currentIndex]?.published || "Date not available"}
            </p>
          </Link>
        </div>
      </div>

      {/* Pagination Indicators */}
      <div className="flex justify-center space-x-2 mt-4">
        {articles.map((_, index) => (
          <div
            key={index}
            onClick={() => handleIndicatorClick(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              currentIndex === index ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default SportsTrendMain;
