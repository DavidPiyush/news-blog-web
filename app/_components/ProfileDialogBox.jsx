"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import SignOutButton from "./SignOutButton";

function ProfileDialogBox({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Close the dialog box when the URL changes
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  return (
    <div className="relative">
      {/* Profile Picture Button */}
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={toggleMenu}
      >
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt={`Profile picture of ${user.name}`}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <FaUserCircle className="w-8 h-8 text-gray-600" />
        )}
        <span className="text-sm text-gray-800 font-medium">{user.name}</span>
      </div>

      {/* Dialog Box */}
      {isOpen && (
        <div className="fixed inset-0 bg-transparent z-40" onClick={closeMenu}>
          <div
            className="absolute top-[45px] right-0 mt-2 bg-white rounded-lg shadow-lg w-48 py-4 px-6 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col space-y-2">
              <Link
                href="/dashboard/profile"
                className="px-4 py-2 text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-md"
              >
                Profile
              </Link>
              <Link
                href="/dashboard/profile/setting"
                className="px-4 py-2 text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-md"
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
