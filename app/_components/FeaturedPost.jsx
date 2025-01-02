"use client";
import { useState, useEffect } from "react";

import HeaderLevelSix from "./HeaderLevelSix";
import TextDescription from "./TextDescription";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function FeaturedPost({articles}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle manual previous button click
  const handleClickPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? articles.length - 1 : prevIndex - 1
    );
  };

  // Handle manual next button click
  const handleClickNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= articles.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Automated sliding using useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex >= articles.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h5 className="bg-gray-900 text-white text-xl font-semibold px-4 py-2 rounded-md">
        Featured Content
      </h5>
      <div className="relative shadow-md hover:shadow-lg rounded-md overflow-hidden bg-white transition-all duration-300 group">
        <div
          className="relative w-full h-60 flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {articles.map((item, index) => (
            <img
              key={index}
              src={item.coverImage}
              alt={`Slide ${index}`}
              className="w-full h-60 object-cover flex-shrink-0"
            />
          ))}
        </div>
        <span
          className="absolute left-0 top-[25%] bg-white h-10 w-10 rounded-full flex justify-center items-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={handleClickPrevious}
        >
          <FaAngleLeft size={24} />
        </span>
        <span
          className="absolute right-0 top-[25%] bg-white h-10 w-10 rounded-full flex justify-center items-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={handleClickNext}
        >
          <FaAngleRight size={24} />
        </span>
        <div className="p-5 space-y-4">
          <button className="bg-red-600 text-white px-3 py-1 rounded-md text-sm font-semibold">
            {articles[currentIndex].tags[0]}
          </button>
          <h4 className="text-md font-semibold text-gray-800 hover:text-red-600 transition-colors duration-300">
            {articles[currentIndex].title}
          </h4>
          <HeaderLevelSix
            author={articles[currentIndex]?.author?.name}
            // date={worldNewsFeature[currentIndex].date}
          />

          <TextDescription text={articles[currentIndex].subTitle} />
        </div>
      </div>
    </>
  );
}

export default FeaturedPost;
