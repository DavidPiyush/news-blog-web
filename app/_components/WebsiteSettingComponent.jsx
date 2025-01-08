"use client";

import toast from "react-hot-toast";
import { createWebsiteSittings, updateWebsiteSittings } from "../_lib/websiteActions";

function WebsiteSettingComponent({
  id,
  websiteName,
  contactPhone,
  footerText,
  defaultLanguage,
  timeZone,
  socialLinks,
}) 

{
 
  return (
    <div className="mx-auto shadow-lg rounded-lg p-6 mt-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        General Settings
      </h1>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        action={async (formData) => {
          let response;

          try {
            if (id) {
              response = await updateWebsiteSittings(formData);
            } else {
              response = await createWebsiteSittings(formData);
            }

            if (response.success) {
              toast.success(response.message || "Settings saved successfully.");
            } else {
              toast.error(response.message || "Failed to save settings.");
            }
          } catch (error) {
            console.error("Error saving settings:", error);
            toast.error("An unexpected error occurred.");
          }
        }}
      >
        {/* <input className="hidden" defaultValue={id} name="id" /> */}

        {/* Website Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Website Name
          </label>
          <input
            type="text"
            name="websiteName"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            placeholder="Enter website name"
            defaultValue={websiteName}
          />
        </div>

        {/* Contact Phone */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Contact Phone
          </label>
          <input
            type="tel"
            name="contactPhone"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            placeholder="Enter contact phone"
            defaultValue={contactPhone}
          />
        </div>

        {/* Footer Text */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-700 font-semibold mb-2">
            Footer Text
          </label>
          <textarea
            name="footerText"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            placeholder="Enter footer text"
            defaultValue={footerText}
          />
        </div>

        {/* Language */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Default Language
          </label>
          <select
            name="defaultLanguage"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            defaultValue={defaultLanguage}
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </div>

        {/* Time Zone */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Time Zone
          </label>
          <select
            name="timeZone"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            defaultValue={timeZone}
          >
            <option value="UTC">UTC</option>
            <option value="Asia/Kolkata">Asia/Kolkata</option>
            <option value="America/New_York">America/New_York</option>
            <option value="Europe/London">Europe/London</option>
          </select>
        </div>

        {/* Social Media Links */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-700 font-semibold mb-2">
            Social Media Links
          </label>
          <div className="space-y-2">
            {["facebook", "twitter", "instagram", "linkedin"].map(
              (platform) => (
                <div key={platform}>
                  <label className="block text-gray-600 mb-1 capitalize">
                    {platform}
                  </label>
                  <input
                    type="url"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                    placeholder={`Enter ${platform} URL`}
                    name={platform}
                    defaultValue={socialLinks[platform] || ""}
                  />
                </div>
              )
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="col-span-1 md:col-span-2 mt-6 text-center">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200">
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}

export default WebsiteSettingComponent;
