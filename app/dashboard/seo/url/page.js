"use client"
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

const URLManagementPage = () => {
  const [contentTitle, setContentTitle] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [urlHistory, setUrlHistory] = useState([
    { url: "/news/latest-tech-updates", date: "2024-12-01", status: "active" },
    {
      url: "/news/new-product-launch",
      date: "2024-12-02",
      status: "redirected",
    },
    { url: "/news/holiday-gift-guide", date: "2024-12-05", status: "inactive" },
  ]);
  const [filter, setFilter] = useState("all");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [urlToDelete, setUrlToDelete] = useState(null);
  const [deleteAllInactive, setDeleteAllInactive] = useState(false);

  // Handle URL Creation
  const handleTitleChange = (e) => {
    const title = e.target.value;
    setContentTitle(title);
    const generated = `/news/${title.replace(/\s+/g, "-").toLowerCase()}`;
    setGeneratedUrl(generated);
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (generatedUrl) {
      const newUrl = {
        url: generatedUrl,
        date: new Date().toLocaleDateString(),
        status: "active",
      };
      setUrlHistory([...urlHistory, newUrl]);
      setGeneratedUrl("");
    }
  };

  // Handle URL Deletion
  const handleDeleteUrl = (url) => {
    setUrlToDelete(url);
    setDeleteAllInactive(false);
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    if (deleteAllInactive) {
      setUrlHistory(
        urlHistory.filter((urlItem) => urlItem.status !== "inactive")
      );
    } else {
      setUrlHistory(
        urlHistory.filter((urlItem) => urlItem.url !== urlToDelete)
      );
    }
    setShowConfirmation(false);
  };

  const cancelDelete = () => {
    setUrlToDelete(null);
    setDeleteAllInactive(false);
    setShowConfirmation(false);
  };

  const filteredUrls =
    filter === "all"
      ? urlHistory
      : urlHistory.filter((item) => item.status === filter);

  return (
    <div className="bg-gray-100 min-h-screen py-8 relative">
      <div className="max-w-screen-xl mx-auto px-6">
        <h1 className="text-4xl font-semibold text-gray-900 mb-6">
          URL Management
        </h1>

        {/* URL Creation Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">
            Create New URL
          </h2>
          <form onSubmit={handleUrlSubmit}>
            <div className="mb-4">
              <label htmlFor="contentTitle" className="text-lg text-gray-700">
                Content Title:
              </label>
              <input
                type="text"
                id="contentTitle"
                value={contentTitle}
                onChange={handleTitleChange}
                className="w-full py-2 px-4 border border-gray-300 rounded-lg mt-2"
                placeholder="Enter the content title"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="generatedUrl" className="text-lg text-gray-700">
                Generated URL:
              </label>
              <input
                type="text"
                id="generatedUrl"
                value={generatedUrl}
                readOnly
                className="w-full py-2 px-4 border border-gray-300 rounded-lg mt-2 bg-gray-200"
              />
            </div>

            <button
              type="submit"
              className="py-2 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Create URL
            </button>
          </form>
        </div>

        {/* Filter and URL History Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-medium text-gray-900">URL History</h2>
            <div className="flex items-center space-x-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="py-2 px-4 border border-gray-300 rounded-lg bg-white"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="redirected">Redirected</option>
                <option value="inactive">Inactive</option>
              </select>
              <button
                onClick={() => {
                  setDeleteAllInactive(true);
                  setShowConfirmation(true);
                }}
                className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
              >
                Delete All Inactive
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 text-left text-gray-700">URL</th>
                  <th className="py-2 px-4 text-left text-gray-700">Date</th>
                  <th className="py-2 px-4 text-left text-gray-700">Status</th>
                  <th className="py-2 px-4 text-left text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUrls.map((urlItem, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td
                      className={`py-2 px-4 ${
                        urlItem.status === "active"
                          ? "text-green-600"
                          : "text-red-600"
                      } cursor-pointer`}
                      onClick={() => (window.location.href = urlItem.url)}
                    >
                      {urlItem.url}
                    </td>
                    <td className="py-2 px-4">{urlItem.date}</td>
                    <td className="py-2 px-4 capitalize">{urlItem.status}</td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleDeleteUrl(urlItem.url)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg w-96">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Delete Confirmation
            </h2>
            <p className="text-gray-600 mb-6">
              {deleteAllInactive
                ? "Are you sure you want to delete all inactive URLs?"
                : `Are you sure you want to delete the URL "${urlToDelete}"?`}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={confirmDelete}
                className="py-2 px-6 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="py-2 px-6 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200"
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

export default URLManagementPage;

