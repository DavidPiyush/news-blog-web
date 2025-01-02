"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation"; // Import hooks from next/navigation
import { FaUserCircle } from "react-icons/fa";
import SignOutButton from "./SignOutButton";

function ProfileDialogBox({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Get the current path

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Close the dialog box when the URL changes
  useEffect(() => {
    closeMenu();
  }, [pathname]); // Trigger whenever the path changes

  return (
    <div className="relative">
      {/* Profile Picture Button */}
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={toggleMenu}
      >
        <img
          src={user.profilePicture || ""} // Replace with dynamic image source
          alt={`profile picture ${user.name}`}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="text-sm text-white ">{user.name}</span>
      </div>

      {/* Dialog Box */}
      {isOpen && (
        <div
          className="absolute right-0 top-12 bg-black bg-opacity-50 inset-0 z-40"
          onClick={closeMenu}
        >
          <div
            className="absolute right-0 top-0 bg-slate-700 rounded-lg shadow-lg w-40 py-4 px-6 z-50"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <div className="flex flex-col space-y-2">
              <Link
                href="/dashboard/profile"
                className="px-4 py-2 text-sm text-white cursor-pointer hover:bg-slate-600 block"
              >
                Profile
              </Link>
              <Link
                href="/dashboard/profile/setting"
                className="px-4 py-2 text-sm text-white cursor-pointer hover:bg-slate-600 block"
              >
                Settings
              </Link>
              <SignOutButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileDialogBox;
