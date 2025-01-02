import Link from "next/link";
import React from "react";

function RelatedPosts({ articles = [] }) {
  return (
    <div className="related-posts mt-10">
      <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-6">
        {articles?.slice(0, 3)?.map((post) => (
          <div
            key={post._id}
            className="rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            {/* Image Hyperlink */}
            <Link
              href={`/${post.categorySlug}/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="post-image">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-[150px] object-cover"
                />
              </div>
            </Link>

            {/* Post Content */}
            <div className="p-4">
              {/* Title Hyperlink */}
              <Link
                href={`/${post.categorySlug}/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-gray-800 hover:text-blue-600 cursor-pointer"
              >
                {post.title}
              </Link>
              {/* Post Date */}
              <p className="text-sm text-gray-500 mt-2">
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "Unknown Date"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelatedPosts;
