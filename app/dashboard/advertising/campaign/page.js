"use client"
import React, { useState } from "react";
import { FaSave } from "react-icons/fa";

const CampaignBuilder = () => {
  const [campaign, setCampaign] = useState({
    name: "",
    description: "",
    targetAudience: [],
    budget: 1, // Budget starts from $1
    startDate: "",
    endDate: "",
    adCreative: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCampaign((prev) => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (e) => {
    const value = e.target.value;
    setCampaign((prev) => ({ ...prev, budget: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCampaign((prev) => ({ ...prev, adCreative: file }));
  };

  const handleAudienceChange = (e) => {
    const { value, checked } = e.target;
    setCampaign((prev) => {
      const newAudience = checked
        ? [...prev.targetAudience, value]
        : prev.targetAudience.filter((audience) => audience !== value);
      return { ...prev, targetAudience: newAudience };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle campaign submission logic here (e.g., save to database)
    console.log("Campaign Submitted", campaign);
  };

  const audienceOptions = [
    { label: "Below 18", value: "Below 18" },
    { label: "18-24", value: "18-24" },
    { label: "25-34", value: "25-34" },
    { label: "35-44", value: "35-44" },
    { label: "45+", value: "45+" },
  ];

  return (
    <div className="bg-gradient-to-r from-gray-100 to-blue-100 p-8 rounded-lg shadow-lg max-w-screen-xl mx-auto">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">
          Create Your Campaign
        </h2>
        <p className="text-lg text-gray-600 mb-5">
          Please fill out all the details carefully to ensure the best results.
        </p>
      </div>

      {/* Campaign Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Campaign Name */}
        <div className="flex flex-col">
          <label className="text-lg text-gray-800 font-semibold">
            Campaign Name
          </label>
          <input
            type="text"
            name="name"
            value={campaign.name}
            onChange={handleInputChange}
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your campaign name"
            required
          />
        </div>

        {/* Campaign Description */}
        <div className="flex flex-col">
          <label className="text-lg text-gray-800 font-semibold">
            Campaign Description
          </label>
          <textarea
            name="description"
            value={campaign.description}
            onChange={handleInputChange}
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your campaign goal, message, and offer"
            rows="4"
            required
          />
        </div>

        {/* Target Audience (Age Options) */}
        <div className="flex flex-col">
          <label className="text-lg text-gray-800 font-semibold">
            Target Audience (Age)
          </label>
          <div className="flex space-x-4 mt-4 flex-wrap">
            {audienceOptions.map((option) => (
              <label
                key={option.value}
                className={`cursor-pointer p-4 rounded-full border-2 ${
                  campaign.targetAudience.includes(option.value)
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800 border-gray-300"
                } hover:bg-blue-500 hover:text-white transition-colors duration-300`}
              >
                <input
                  type="checkbox"
                  value={option.value}
                  checked={campaign.targetAudience.includes(option.value)}
                  onChange={handleAudienceChange}
                  className="hidden"
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>

        {/* Budget with Slider */}
        <div className="flex flex-col">
          <label className="text-lg text-gray-800 font-semibold">
            Campaign Budget
          </label>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Min: $1</span>
            <span>Max: $10,000</span>
          </div>
          <input
            type="range"
            min="1"
            max="10000"
            value={campaign.budget}
            onChange={handleSliderChange}
            className="w-full mt-4"
            step="1"
          />
          <div className="flex justify-between">
            <span className="font-medium text-gray-800">
              ${campaign.budget}
            </span>
          </div>
        </div>

        {/* Campaign Duration */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="text-lg text-gray-800 font-semibold">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={campaign.startDate}
              onChange={handleInputChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex-1">
            <label className="text-lg text-gray-800 font-semibold">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={campaign.endDate}
              onChange={handleInputChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Ad Creative Upload */}
        <div className="flex flex-col">
          <label className="text-lg text-gray-800 font-semibold">
            Upload Ad Creative
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept="image/*,video/*"
          />
          {campaign.adCreative && (
            <div className="mt-2 text-gray-600">
              <p>File uploaded: {campaign.adCreative.name}</p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
        >
          <FaSave className="mr-2" /> Save Campaign
        </button>
      </form>
    </div>
  );
};

export default CampaignBuilder;

