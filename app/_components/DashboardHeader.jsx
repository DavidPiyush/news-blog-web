import {
  FaSearch,
  FaBell,
  FaUserCircle,
  FaPowerOff,
  FaBars,
} from "react-icons/fa";
import { getUser } from "../_lib/data-service";
import Image from "next/image";
import { getGreeting, getRandomEmoji } from "../_lib/helper";
import ProfileDialogBox from "./ProfileDialogBox";
import NotificationDropdown from "./NotificationDropDown";
import { getServerSession } from "next-auth";

async function DashboardHeader() {
  const session = await getServerSession();
  const { user } = await getUser(session?.user?.email);

  return (
    <div className="bg-slate-800 h-16 flex items-center justify-between px-6 text-white z-50 sticky top-0 ">
      <div className="flex items-center space-x-4">
        <div className="text-xl font-semibold">
          <span className="text-indigo-500 capitalize">{user.role}</span> Panel
        </div>
        <div className="hidden lg:flex text-sm text-gray-300 px-4">
          <span className="text-lg font-medium capitalize ">
            {getGreeting()},{getRandomEmoji()}
            {user.role}
          </span>
        </div>
      </div>

      <div className="lg:hidden">
        <FaBars
          className="w-6 h-6 text-white cursor-pointer"
          //   onClick={toggleMenu}
        />
      </div>

      <div className="flex items-center space-x-6">
        <div className="hidden lg:flex items-center space-x-3 bg-slate-700 p-2 rounded-lg max-w-md">
          <span>
            <FaSearch className="text-gray-300" />
          </span>
          <input
            type="text"
            placeholder="Search..."
            name="search"
            className="bg-transparent text-white outline-none placeholder-gray-400"
          />
        </div>

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
