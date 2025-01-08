"use client";
import axios from "axios";
import React, { useState } from "react";

const CommentForm = ({ id }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    comment: "",
    saveInfo: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      postId: id, // Assuming `id` is defined elsewhere
    };

    try {
      const res = await axios.post("/api/comments/create", data); // Explicitly define POST method
      console.log("Response:", res.data);

      // Reset the form after successful submission
      setFormData({
        name: "",
        email: "",
        website: "",
        comment: "",
        saveInfo: false,
      });

      alert("Comment submitted successfully!"); // Optional feedback to the user
    } catch (error) {
      console.error(
        "Error submitting comment:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className=" p-6 bg-gray-100 rounded-lg shadow-sm mt-16">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Leave A Reply
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Comment Field */}
        <div>
          <label
            htmlFor="comment"
            className="block text-md font-medium text-gray-700 mb-2"
          >
            Your Comment
          </label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Write your comment here..."
            rows="5"
            className="w-full p-3 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 resize-none"
            required
          ></textarea>
        </div>

        {/* Name and Email Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-md font-medium text-gray-700 mb-2"
            >
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full p-3 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-md font-medium text-gray-700 mb-2"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              className="w-full p-3 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
              required
            />
          </div>
        </div>

        {/* Website Field */}
        <div>
          <label
            htmlFor="website"
            className="block text-md font-medium text-gray-700 mb-2"
          >
            Website (Optional)
          </label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Your website"
            className="w-full p-3 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
          />
        </div>

        {/* Save Info Checkbox */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="saveInfo"
            name="saveInfo"
            checked={formData.saveInfo}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-500 border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
          <label htmlFor="saveInfo" className="text-sm text-gray-600">
            Save my name, email, and website for the next time I comment.
          </label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3 text-white bg-indigo-600 font-semibold text-sm rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
          >
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
