"use client";

import React, { useState } from "react";

const PopularArticles = () => {
  // Example data for popular articles
  const articles = [
    {
      title: "How to Build a Website",
      thumbnail: "/images/article1.jpg",
      views: 1200,
      description: "Learn the basics of building a modern website.",
      author: "John Doe",
      date: "2024-12-20",
    },
    {
      title: "Understanding SEO",
      thumbnail: "/images/article2.jpg",
      views: 900,
      description:
        "An introduction to SEO and why it’s important for your website.",
      author: "Jane Smith",
      date: "2024-12-19",
    },
    {
      title: "The Future of Web Development",
      thumbnail: "/images/article3.jpg",
      views: 1500,
      description:
        "Explore the emerging technologies shaping the future of web development.",
      author: "Michael Lee",
      date: "2024-12-18",
    },
    {
      title: "10 Tips for Designing UX",
      thumbnail: "/images/article4.jpg",
      views: 1300,
      description: "Best practices for designing user-friendly interfaces.",
      author: "Emily Clark",
      date: "2024-12-17",
    },
  ];

  // Sorting by views and recent date
  const [selectedSort, setSelectedSort] = useState("Most Views");

  const sortArticles = (articles, sortBy) => {
    switch (sortBy) {
      case "Most Views":
        return [...articles].sort((a, b) => b.views - a.views);
      case "Most Recent":
        return [...articles].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      default:
        return articles;
    }
  };

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
  };

  // Filter by category (Example)
  const categories = ["Web Development", "UI/UX Design", "SEO", "Marketing"];
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredArticles = sortArticles(
    articles.filter((article) =>
      selectedCategory
        ? article.title.toLowerCase().includes(selectedCategory.toLowerCase())
        : true
    ),
    selectedSort
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          Popular Articles
        </h1>
        <p className="text-lg text-gray-600">
          Explore the most popular articles on our website. Stay updated with
          the latest trends.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <label className="text-lg font-semibold text-gray-700">
            Sort by:
          </label>
          <select
            value={selectedSort}
            onChange={handleSortChange}
            className="border border-gray-300 rounded-md p-2 text-gray-700"
          >
            <option value="Most Views">Most Views</option>
            <option value="Most Recent">Most Recent</option>
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <label className="text-lg font-semibold text-gray-700">
            Filter by Category:
          </label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border border-gray-300 rounded-md p-2 text-gray-700"
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Articles List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 duration-300 hover:shadow-xl"
          >
            <img
              src={article.thumbnail}
              alt={article.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {article.title}
            </h2>
            <p className="text-sm text-gray-600 mb-2">{article.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>By {article.author}</span>
              <span>{article.date}</span>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-gray-700">
                {article.views} Views
              </span>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300 mx-2">
          Previous
        </button>
        <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300 mx-2">
          Next
        </button>
      </div>
    </div>
  );
};

export default PopularArticles;
