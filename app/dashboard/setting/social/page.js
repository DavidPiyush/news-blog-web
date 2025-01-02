function page() {
  return (
    <div className="p-8 min-h-screen ">
      <div className="max-w-4xl mx-auto  shadow-lg rounded-lg p-6 mt-6">
        <h1 className="text-2xl font-bold text-white mb-6">
          Social Media Settings
        </h1>

        {/* Social Media Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              platform: "Facebook",
              placeholder: "https://facebook.com/yourpage",
            },
            {
              platform: "Twitter",
              placeholder: "https://twitter.com/yourprofile",
            },
            {
              platform: "Instagram",
              placeholder: "https://instagram.com/yourhandle",
            },
            {
              platform: "LinkedIn",
              placeholder: "https://linkedin.com/in/yourprofile",
            },
            {
              platform: "YouTube",
              placeholder: "https://youtube.com/yourchannel",
            },
          ].map(({ platform, placeholder }) => (
            <div key={platform}>
              <label className="block text-gray-300 font-medium mb-1">
                {platform}
              </label>
              <input
                type="url"
                placeholder={placeholder}
                className="w-full border border-gray-500 bg-slate-600 text-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                // value={socialLinks[platform.toLowerCase()] || ""}
                // onChange={(e) =>
                //   handleChange(platform.toLowerCase(), e.target.value)
                // }
              />
            </div>
          ))}
        </div>

        {/* Auto-Posting */}
        <div className="flex items-center space-x-4 mt-6">
          <label className="text-gray-300 font-semibold">
            Enable Auto-Posting
          </label>
          <input
            type="checkbox"
            // checked={autoPost}
            // onChange={() => setAutoPost(!autoPost)}
            className="w-5 h-5 rounded border-gray-500 focus:ring-blue-400 focus:ring-2 bg-slate-600"
          />
        </div>

        {/* Analytics Integration */}
        <div className="flex items-center space-x-4 mt-4">
          <label className="text-gray-300 font-semibold">
            Enable Social Media Analytics Integration
          </label>
          <input
            type="checkbox"
            // checked={analyticsIntegration}
            // onChange={() => setAnalyticsIntegration(!analyticsIntegration)}
            className="w-5 h-5 rounded border-gray-500 focus:ring-blue-400 focus:ring-2 bg-slate-600"
          />
        </div>

        {/* Save Button */}
        <div className="mt-6">
          <button
            // onClick={handleSave}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default page;
