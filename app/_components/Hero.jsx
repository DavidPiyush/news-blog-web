"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import TextDescription from "./TextDescription";
import HeaderLevelFour from "./HeaderLevelFour";

function Hero({ articles, categories }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3); // Assuming 3 images
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

 const featuredArticles = articles?.filter((post) => post.isFeatured);

  

  return (
    <div className="relative ">
      {/* Background Image Slider */}
      <div className="h-[569px] relative z-0">
        {featuredArticles?.map((imgSrc, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={imgSrc.coverImage || ""}
              alt="Hero background image"
              fill
              className="object-cover"
              quality={90}
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/30"></div>

            <div className="text-white overflow-hidden absolute bottom-[150px] py-4 flex justify-center items-start flex-col ml-24 px-6 space-y-4">
              <Link href={`news/${imgSrc.slug}`}>
                <span className="bg-blue-400 px-2 py-2 text-white rounded-lg cursor-pointer text-sm font-bold uppercase -tracking-tight">
                  {imgSrc.categories.includes(categories._id).name ||
                    "Technology"}
                </span>
                <h2 className="text-4xl font-bold leading-tight">
                  {imgSrc.title}
                </h2>
                <p className="text-sm text-gray-300 ">
                  {imgSrc?.author?.name} -{" "}
                  {new Date(imgSrc.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Card Content */}
      <div className="bg-white h-[190px] max-w-6xl absolute z-10 bottom-[-70px] w-full ml-24 rounded-lg shadow-lg">
        <div className="flex gap-12 px-6">
          {articles.slice(0, 2).map((post) => (
            <article
              className="flex gap-8 items-center h-[200px]"
              key={post._id}
            >
              <Link href={`news/${post.slug}`}>
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-[153px] h-[102px] rounded-lg"
                />
              </Link>
              <div className="space-y-4">
                <Link
                  href={`news/${post.slug}`}
                  className="text-gray-600 font-semibold"
                >
                  {post.categories.includes(categories._id).name ||
                    "Technology"}
                </Link>
                <HeaderLevelFour title={post.subTitle} fontSize="text-base" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
