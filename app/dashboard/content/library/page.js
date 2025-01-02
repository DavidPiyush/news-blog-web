"use client"
import { useState } from "react";

// Example media data (you can replace with dynamic data from an API or database)
const mediaData = [
  {
    id: 1,
    title: "Tech Article Image",
    type: "image",
    src: "/images/tech.jpg",
  },
  { id: 2, title: "Health Video", type: "video", src: "/videos/health.mp4" },
  {
    id: 3,
    title: "Sports Highlight Image",
    type: "image",
    src: "/images/sports.jpg",
  },
  {
    id: 4,
    title: "Education Video",
    type: "video",
    src: "/videos/education.mp4",
  },
];

const MediaLibrary = () => {
  const [media, setMedia] = useState(mediaData);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [mediaToDelete, setMediaToDelete] = useState(null);

  // Handle Delete Media
  const deleteMedia = (id) => {
    const updatedMedia = media.filter((item) => item.id !== id);
    setMedia(updatedMedia);
    setIsConfirmDelete(false);
  };

  // Filter media based on type (image, video, or all)
  const filteredMedia = media
    .filter((item) => {
      if (filter === "all") return true;
      return item.type === filter;
    })
    .filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-white mb-6">Media Library</h1>

      {/* Search and Filter Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="w-1/3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search media..."
            className="w-full p-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <div className="flex items-center space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-3 rounded-lg bg-white text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="all">All Types</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
          </select>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition">
            Upload Media
          </button>
        </div>
      </div>

      {/* Media Display Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMedia.length > 0 ? (
          filteredMedia.map((mediaItem) => (
            <div
              key={mediaItem.id}
              className="relative bg-white rounded-lg shadow-lg overflow-hidden group hover:scale-105 transition-all duration-300 ease-in-out"
            >
              {/* Media Thumbnail */}
              <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 overflow-hidden group-hover:opacity-80 transition-all">
                {mediaItem.type === "image" ? (
                  <img
                    src={mediaItem.src}
                    alt={mediaItem.title}
                    className="w-full h-full object-cover rounded-lg transition-all"
                  />
                ) : (
                  <video
                    className="w-full h-full object-cover rounded-lg"
                    controls
                  >
                    <source src={mediaItem.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>

              {/* Media Title */}
              <h3 className="text-md font-medium text-gray-800 group-hover:text-blue-600">
                {mediaItem.title}
              </h3>

              {/* Delete Button */}
              <button
                onClick={() => {
                  setIsConfirmDelete(true);
                  setMediaToDelete(mediaItem.id);
                }}
                className="absolute top-2 right-2 text-red-600 group-hover:text-red-800 text-xs font-semibold"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No media found</p>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {isConfirmDelete && mediaToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-all">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Confirm Deletion
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this media item?
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => deleteMedia(mediaToDelete)}
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setIsConfirmDelete(false)}
                className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;

