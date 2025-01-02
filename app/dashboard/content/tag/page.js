"use client"
import { useState } from "react";

// Example recent posts data with thumbnails
const recentPostsData = [
  {
    id: 1,
    title: "Technology Advancements in 2024",
    tags: ["Technology", "Innovation"],
    thumbnail: "/images/tech.jpg",
  },
  {
    id: 2,
    title: "Sports Highlights: January",
    tags: ["Sports", "News"],
    thumbnail: "/images/sports.jpg",
  },
  {
    id: 3,
    title: "Health Tips for the New Year",
    tags: ["Health", "Wellness"],
    thumbnail: "/images/health.jpg",
  },
];

const PostTagsManagement = () => {
  const [recentPosts, setRecentPosts] = useState(recentPostsData);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [newTag, setNewTag] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const addTag = (postId) => {
    if (!newTag) {
      alert("Please enter a tag");
      return;
    }

    // Add the new tag to the selected post
    const updatedPosts = recentPosts.map((post) => {
      if (post.id === postId) {
        if (!post.tags.includes(newTag)) {
          post.tags.push(newTag);
        }
      }
      return post;
    });
    setRecentPosts(updatedPosts);
    setNewTag("");
  };

  const editTag = (postId, tagIndex) => {
    setIsEditing(true);
    setCurrentPostId(postId);
    setNewTag(recentPosts.find((post) => post.id === postId).tags[tagIndex]);
  };

  const saveEditedTag = (tagIndex) => {
    const updatedPosts = recentPosts.map((post) => {
      if (post.id === currentPostId) {
        post.tags[tagIndex] = newTag;
      }
      return post;
    });
    setRecentPosts(updatedPosts);
    setNewTag("");
    setIsEditing(false);
    setCurrentPostId(null);
  };

  const deleteTag = (postId, tagIndex) => {
    if (window.confirm("Are you sure you want to delete this tag?")) {
      const updatedPosts = recentPosts.map((post) => {
        if (post.id === postId) {
          post.tags.splice(tagIndex, 1);
        }
        return post;
      });
      setRecentPosts(updatedPosts);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Recent Posts with Tag Management
      </h1>

      {/* Recent Posts List */}
      <div className="space-y-6">
        {recentPosts.map((post) => (
          <div
            key={post.id}
            className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            {/* Thumbnail Image */}
            <div className="flex-shrink-0 w-16 h-16 mr-6">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            {/* Post Title */}
            <div className="flex-grow">
              <a
                href={`/posts/${post.id}`}
                className="text-xl font-semibold text-gray-700 hover:text-blue-500 hover:underline"
              >
                {post.title}
              </a>
            </div>

            {/* Tags */}
            <div className="flex items-center space-x-3 ml-4">
              {post.tags.map((tag, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-sm text-white bg-blue-600 p-2 rounded-full">
                    {tag}
                  </span>
                  <button
                    onClick={() => editTag(post.id, index)}
                    className="text-blue-300 hover:text-blue-500 text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTag(post.id, index)}
                    className="text-red-600 hover:text-red-800 text-xs"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                onClick={() => setCurrentPostId(post.id)}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 text-xs"
              >
                Add Tag
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tag Management Modal */}
      {currentPostId && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Manage Tags
            </h2>
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg mb-4"
              placeholder="Enter a new tag"
            />
            <div className="flex justify-between mt-4">
              {isEditing ? (
                <button
                  onClick={() => saveEditedTag()}
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
                >
                  Save Tag
                </button>
              ) : (
                <button
                  onClick={() => addTag(currentPostId)}
                  className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700"
                >
                  Add Tag
                </button>
              )}
              <button
                onClick={() => setCurrentPostId(null)}
                className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostTagsManagement;


