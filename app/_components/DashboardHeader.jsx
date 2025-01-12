import {
  FaSearch,
  FaBars,
} from "react-icons/fa";
import { getUser } from "../_lib/data-service";
import { getGreeting, getRandomEmoji } from "../_lib/helper";
import ProfileDialogBox from "./ProfileDialogBox";

import { getServerSession } from "next-auth";
import NotificationDropdown from "./NotificationDropdown";
import Link from "next/link";

async function DashboardHeader() {
  const session = await getServerSession();
  const { user } = await getUser(session?.user?.email);

  return (
    <div className="h-16 flex items-center justify-between px-6  text-gray-800 shadow-md z-50 bg-gradient-to-r from-blue-100 to-purple-100   sticky top-0">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <Link href={"/dashboard"} className="text-xl font-semibold">
          <span className="text-indigo-500 capitalize">{user.role}</span> Panel
        </Link>
        <div className="hidden lg:flex text-sm text-gray-600 px-4">
          <span className="text-lg font-medium capitalize">
            {getGreeting()},{getRandomEmoji()} {user.role}
          </span>
        </div>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="lg:hidden">
        <FaBars className="w-6 h-6 text-gray-800 cursor-pointer" />
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        {/* Search Bar (Hidden on Mobile) */}
        <div className="hidden lg:flex items-center space-x-3 bg-gray-100 p-2 rounded-lg max-w-md">
          <span>
            <FaSearch className="text-gray-500" />
          </span>
          <input
            type="text"
            placeholder="Search..."
            name="search"
            className="bg-transparent text-gray-800 outline-none placeholder-gray-500"
          />
        </div>

        {/* Notifications */}
        <NotificationDropdown />

        {/* User Profile */}
        <div className="relative flex items-center space-x-2 cursor-pointer">
          <ProfileDialogBox user={user} />
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
