"use client";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import Pagination from "./Pagination"; // Import the reusable Pagination component
import { useState } from "react";

const PostList = ({ articles = [], header }) => {
  // Set up the pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  // Calculate the posts to display based on current page
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = articles.slice(startIndex, startIndex + postsPerPage); // Slice the data for pagination

  const getCategoryBackgroundColor = (category) => {
    switch (category?.toLowerCase()) {
      case "tech-news":
        return "bg-blue-100";
      case "sports-news":
        return "bg-green-100";
      case "politics-news":
        return "bg-red-100";
      case "world-news":
        return "bg-yellow-100";
      case "entertainment":
        return "bg-purple-100";
      default:
        return "bg-gray-100";
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage); // Update the current page state
  };

  return (
    <div className="bg-white text-gray-800  p-6 rounded-lg shadow-lg mb-12">
      <h3 className="text-xl font-semibold mb-4">{header} Posts</h3>
      <ul className="space-y-6">
        {currentPosts.map((post) => (
          <li key={post._id} className="flex items-start border-b py-4">
            <Link href={post.slug} className="flex items-start w-full">
              <Image
                src={post.coverImage || "/default-image.jpg"} // Default image URL
                alt={post.title}
                width={96}
                height={96}
                className="w-24 h-24 object-cover rounded-lg mr-6"
              />
              <div className="flex flex-col w-full">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <div className="text-sm text-gray-400">
                  {post.publishedAt && !isNaN(new Date(post.publishedAt))
                    ? format(new Date(post.publishedAt), "MMMM dd, yyyy")
                    : "Date not available"}{" "}
                  | {post?.author?.name} | Views: {post.views}
                </div>
                <div
                  className={`mt-2 px-3 py-1 rounded-lg ${getCategoryBackgroundColor(
                    post.category || "Unknown Category"
                  )}`}
                >
                  {post.category}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={articles.length}
        itemsPerPage={postsPerPage}
        onPageChange={handlePageChange} // Pass the function to handle page change
      />
    </div>
  );
};

export default PostList;
