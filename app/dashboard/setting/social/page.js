import SubmitButton from "@/app/_components/SubmitButton";
import { updateUserSocialLinks } from "@/app/_lib/actions";
import { getUser } from "@/app/_lib/data-service";
import { getServerSession } from "next-auth";


async function Page() {
  const session = await getServerSession();
  const { user } = await getUser(session?.user?.email);

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <form
        className="max-w-4xl mx-auto shadow-lg rounded-lg p-6 mt-6 bg-white"
        action={updateUserSocialLinks}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Social Media Settings
        </h1>

        <input
          className="hidden"
          defaultValue={user._id.toString()}
          name="id"
        />
        {/* Social Media Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Facebook
            </label>
            <input
              type="url"
              placeholder="https://facebook.com/yourpage"
              name="facebook"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={user?.socialLinks?.facebook}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Twitter
            </label>
            <input
              type="url"
              placeholder="https://twitter.com/yourpage"
              name="twitter"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={user?.socialLinks?.twitter}
            />
          </div>{" "}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Instagram
            </label>
            <input
              type="url"
              placeholder="https://instagram.com/yourpage"
              name="instagram"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={user?.socialLinks?.instagram}
            />
          </div>{" "}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              LinkedIn
            </label>
            <input
              type="url"
              placeholder="https://linkedin.com/yourpage"
              name="linkedin"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={user?.socialLinks?.linkedin}
            />
          </div>{" "}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              YouTube
            </label>
            <input
              type="url"
              placeholder="https://youtube.com/yourpage"
              name="youtube"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={user?.socialLinks?.youtube}
            />
          </div>
        </div>

        {/* Auto-Posting */}
        <div className="flex items-center space-x-4 mt-6">
          <label className="text-gray-700 font-semibold">
            Enable Auto-Posting
          </label>
          <input
            type="checkbox"
            className="w-5 h-5 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
          />
        </div>

        {/* Analytics Integration */}
        <div className="flex items-center space-x-4 mt-4">
          <label className="text-gray-700 font-semibold">
            Enable Social Media Analytics Integration
          </label>
          <input
            type="checkbox"
            className="w-5 h-5 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
          />
        </div>

        {/* Save Button */}
        <div className="mt-6">
          <SubmitButton pendingLabel="saving setting...">
            Save Settings
          </SubmitButton>
          {/* <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Save Settings
          </button> */}
        </div>
      </form>
    </div>
  );
}

export default Page;
