function page() {
  return (
    <div className=" mx-auto  shadow-lg rounded-lg p-6 mt-6 min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-6">General Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Website Name */}
        <div>
          <label className="block text-gray-300 font-semibold mb-2">
            Website Name
          </label>
          <input
            type="text"
            name="websiteName"
            className="w-full border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-700 text-gray-300"
            placeholder="Enter website name"
          />
        </div>

        {/* Contact Phone */}
        <div>
          <label className="block text-gray-300 font-semibold mb-2">
            Contact Phone
          </label>
          <input
            type="tel"
            name="contactPhone"
            className="w-full border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-700 text-gray-300"
            placeholder="Enter contact phone"
          />
        </div>

        {/* Footer Text */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-300 font-semibold mb-2">
            Footer Text
          </label>
          <textarea
            name="footerText"
            className="w-full border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-700 text-gray-300"
            placeholder="Enter footer text"
          />
        </div>

        {/* Language */}
        <div>
          <label className="block text-gray-300 font-semibold mb-2">
            Default Language
          </label>
          <select
            name="defaultLanguage"
            className="w-full border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-700 text-gray-300"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </div>

        {/* Time Zone */}
        <div>
          <label className="block text-gray-300 font-semibold mb-2">
            Time Zone
          </label>
          <select
            name="timeZone"
            className="w-full border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-700 text-gray-300"
          >
            <option value="UTC">UTC</option>
            <option value="Asia/Kolkata">Asia/Kolkata</option>
            <option value="America/New_York">America/New_York</option>
            <option value="Europe/London">Europe/London</option>
          </select>
        </div>

        {/* Social Media Links */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-300 font-semibold mb-2">
            Social Media Links
          </label>
          <div className="space-y-2">
            {/* {Object.keys(socialMediaLinks).map((platform) => (
              <div key={platform}>
                <label className="block text-gray-400 mb-1 capitalize">
                  {platform}
                </label>
                <input
                  type="url"
                  className="w-full border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-700 text-gray-300"
                  value={socialMediaLinks[platform]}
                  onChange={(e) =>
                    setSocialMediaLinks({
                      ...socialMediaLinks,
                      [platform]: e.target.value,
                    })
                  }
                  placeholder={`Enter ${platform} URL`}
                />
              </div>
            ))} */}
          </div>
        </div>

        {/* Save Button */}
        <div className="col-span-1 md:col-span-2 mt-6">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default page;
