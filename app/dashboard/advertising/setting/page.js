"use client"
import React, { useState } from "react";
import { FaSave, FaChartBar } from "react-icons/fa";

const AdsSettings = () => {
  const [settings, setSettings] = useState({
    enableImageAds: true,
    enableVideoAds: true,
    enableBannerAds: false,
    frequencyCap: 3, // Default frequency cap
    adPlacement: ["Homepage", "Sidebar"],
    dailyBudget: 10,
    totalBudget: 100,
    customAudience: null,
    selectedAudience: [],
  });

  const adPlacementOptions = ["Homepage", "Sidebar", "Articles"];
  const audienceOptions = ["Below 18", "18-24", "25-34", "35-44", "45+"];

  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    setSettings((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSliderChange = (e, key) => {
    setSettings((prev) => ({ ...prev, [key]: parseInt(e.target.value) }));
  };

  const handlePlacementChange = (e) => {
    const { value, checked } = e.target;
    setSettings((prev) => {
      const newPlacement = checked
        ? [...prev.adPlacement, value]
        : prev.adPlacement.filter((placement) => placement !== value);
      return { ...prev, adPlacement: newPlacement };
    });
  };

  const handleAudienceChange = (e) => {
    const { value, checked } = e.target;
    setSettings((prev) => {
      const newAudience = checked
        ? [...prev.selectedAudience, value]
        : prev.selectedAudience.filter((aud) => aud !== value);
      return { ...prev, selectedAudience: newAudience };
    });
  };

  const handleCustomAudienceUpload = (e) => {
    const file = e.target.files[0];
    setSettings((prev) => ({ ...prev, customAudience: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Ad Settings Saved:", settings);
  };

  return (
    <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-8 rounded-lg shadow-lg max-w-screen-lg mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">Ads Settings</h2>
        <p className="text-lg text-gray-600 mb-5">
          Customize your ad preferences and manage campaigns effectively.
        </p>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* General Settings */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            General Settings
          </h3>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="enableImageAds"
              checked={settings.enableImageAds}
              onChange={handleToggleChange}
              className="mr-3"
            />
            <label className="text-lg text-gray-800">Enable Image Ads</label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="enableVideoAds"
              checked={settings.enableVideoAds}
              onChange={handleToggleChange}
              className="mr-3"
            />
            <label className="text-lg text-gray-800">Enable Video Ads</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="enableBannerAds"
              checked={settings.enableBannerAds}
              onChange={handleToggleChange}
              className="mr-3"
            />
            <label className="text-lg text-gray-800">Enable Banner Ads</label>
          </div>
        </div>

        {/* Frequency Cap */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Frequency Cap
          </h3>
          <input
            type="range"
            min="1"
            max="10"
            value={settings.frequencyCap}
            onChange={(e) => handleSliderChange(e, "frequencyCap")}
            className="w-full"
          />
          <p className="text-sm text-gray-600 mt-2">
            Current Frequency Cap: {settings.frequencyCap} times per user
          </p>
        </div>

        {/* Ad Placement */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Ad Placement
          </h3>
          <div className="flex space-x-4">
            {adPlacementOptions.map((placement) => (
              <label key={placement} className="flex items-center">
                <input
                  type="checkbox"
                  value={placement}
                  checked={settings.adPlacement.includes(placement)}
                  onChange={handlePlacementChange}
                  className="mr-2"
                />
                <span className="text-lg">{placement}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Target Audience */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Target Audience
          </h3>
          <div className="flex space-x-4 flex-wrap">
            {audienceOptions.map((aud) => (
              <label
                key={aud}
                className={`p-3 rounded-full border-2 ${
                  settings.selectedAudience.includes(aud)
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800 border-gray-300"
                } cursor-pointer transition-colors duration-300`}
              >
                <input
                  type="checkbox"
                  value={aud}
                  checked={settings.selectedAudience.includes(aud)}
                  onChange={handleAudienceChange}
                  className="hidden"
                />
                {aud}
              </label>
            ))}
          </div>
        </div>

        {/* Budget Settings */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Budget Settings
          </h3>
          <label className="block text-lg text-gray-800 mb-2">
            Daily Budget ($)
          </label>
          <input
            type="number"
            min="1"
            value={settings.dailyBudget}
            onChange={(e) => handleSliderChange(e, "dailyBudget")}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <label className="block text-lg text-gray-800 mt-4">
            Total Budget ($)
          </label>
          <input
            type="number"
            min="1"
            value={settings.totalBudget}
            onChange={(e) => handleSliderChange(e, "totalBudget")}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
        >
          <FaSave className="mr-2" /> Save Settings
        </button>
      </form>
    </div>
  );
};

export default AdsSettings;
