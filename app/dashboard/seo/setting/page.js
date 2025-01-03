"use client"
import React, { useState } from "react";
import {
  FaSave,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaCog,
} from "react-icons/fa";

const SEOSettingsPage = () => {
  const [seoSettings, setSeoSettings] = useState({
    pageTitle: "",
    pageDescription: "",
    pageKeywords: "",
    twitterTitle: "",
    twitterDescription: "",
    facebookTitle: "",
    facebookDescription: "",
    linkedinTitle: "",
    linkedinDescription: "",
    ogImage: "",
    ogUrl: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSeoSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    alert("SEO & Metadata settings saved!");
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        SEO & Metadata Settings
      </h1>

      <div className="bg-white p-6 shadow-md rounded-lg">
        <form onSubmit={handleSaveSettings}>
          {/* SEO Settings Section */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              SEO Settings
            </h2>
            <div className="space-y-4">
              <div className="relative">
                <label
                  htmlFor="pageTitle"
                  className="block text-sm font-medium text-gray-700"
                  title="The title of your page that appears in search results"
                >
                  Page Title{" "}
                  <span className="text-gray-500">(max 60 characters)</span>
                </label>
                <input
                  type="text"
                  id="pageTitle"
                  name="pageTitle"
                  value={seoSettings.pageTitle}
                  onChange={handleInputChange}
                  className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter page title"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="pageDescription"
                  className="block text-sm font-medium text-gray-700"
                  title="A short description of your page content"
                >
                  Page Description{" "}
                  <span className="text-gray-500">(max 160 characters)</span>
                </label>
                <textarea
                  id="pageDescription"
                  name="pageDescription"
                  value={seoSettings.pageDescription}
                  onChange={handleInputChange}
                  className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  rows="4"
                  placeholder="Enter page description"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="pageKeywords"
                  className="block text-sm font-medium text-gray-700"
                  title="Keywords help search engines understand your page"
                >
                  Page Keywords{" "}
                  <span className="text-gray-500">(comma-separated)</span>
                </label>
                <input
                  type="text"
                  id="pageKeywords"
                  name="pageKeywords"
                  value={seoSettings.pageKeywords}
                  onChange={handleInputChange}
                  className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter keywords"
                />
              </div>
            </div>
          </section>

          {/* Social Media Metadata Section */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Social Media Metadata
            </h2>
            <div className="space-y-6">
              {/* Twitter */}
              <div className="relative">
                <label
                  htmlFor="twitterTitle"
                  className=" text-sm font-medium text-gray-700 flex items-center"
                  title="Set a custom title for Twitter sharing"
                >
                  <FaTwitter className="text-blue-400 mr-2" /> Twitter Title
                </label>
                <input
                  type="text"
                  id="twitterTitle"
                  name="twitterTitle"
                  value={seoSettings.twitterTitle}
                  onChange={handleInputChange}
                  className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter Twitter title"
                />
              </div>

              {/* Facebook */}
              <div className="relative">
                <label
                  htmlFor="facebookTitle"
                  className=" text-sm font-medium text-gray-700 flex items-center"
                  title="Set a custom title for Facebook sharing"
                >
                  <FaFacebook className="text-blue-600 mr-2" /> Facebook Title
                </label>
                <input
                  type="text"
                  id="facebookTitle"
                  name="facebookTitle"
                  value={seoSettings.facebookTitle}
                  onChange={handleInputChange}
                  className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter Facebook title"
                />
              </div>

              {/* LinkedIn */}
              <div className="relative">
                <label
                  htmlFor="linkedinTitle"
                  className=" text-sm font-medium text-gray-700 flex items-center"
                  title="Set a custom title for LinkedIn sharing"
                >
                  <FaLinkedin className="text-blue-500 mr-2" /> LinkedIn Title
                </label>
                <input
                  type="text"
                  id="linkedinTitle"
                  name="linkedinTitle"
                  value={seoSettings.linkedinTitle}
                  onChange={handleInputChange}
                  className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter LinkedIn title"
                />
              </div>
            </div>
          </section>

          {/* Open Graph Metadata Section */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Open Graph Metadata
            </h2>
            <div className="space-y-4">
              <div className="relative">
                <label
                  htmlFor="ogImage"
                  className="block text-sm font-medium text-gray-700"
                  title="URL of the image to display when shared"
                >
                  Open Graph Image URL
                </label>
                <input
                  type="text"
                  id="ogImage"
                  name="ogImage"
                  value={seoSettings.ogImage}
                  onChange={handleInputChange}
                  className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter image URL"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="ogUrl"
                  className="block text-sm font-medium text-gray-700"
                  title="URL of the page being shared"
                >
                  Open Graph URL
                </label>
                <input
                  type="text"
                  id="ogUrl"
                  name="ogUrl"
                  value={seoSettings.ogUrl}
                  onChange={handleInputChange}
                  className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter Open Graph URL"
                />
              </div>
            </div>
          </section>

          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-700 flex items-center shadow-lg"
            >
              <FaSave className="mr-2" />
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SEOSettingsPage;
