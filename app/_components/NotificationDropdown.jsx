"use client";
import { useState, useRef, useEffect } from "react";
import { FaBell } from "react-icons/fa";

function NotificationDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    "New message from John",
    "System update available",
    "Reminder: Meeting at 3 PM",
  ]);
  const notificationRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={notificationRef}>
      {/* Notification Icon */}
      <div
        className="relative cursor-pointer"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <FaBell className="w-6 h-6 text-white hover:text-indigo-400 transition-colors duration-300" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
            {notifications.length}
          </span>
        )}
      </div>

      {/* Notification Dropdown */}
      {isDropdownOpen && (
        <div className="absolute top-10 right-0 bg-slate-800 text-white rounded-lg shadow-lg w-72 py-2 px-4 z-50">
          <div className="font-medium mb-2">Notifications</div>
          <ul>
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <li
                  key={index}
                  className="text-sm py-1 px-2 hover:bg-slate-600 rounded-md cursor-pointer border-b border-slate-600"
                  onClick={() => setNotifications([])} // Clear notifications on click
                >
                  {notification}
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-400 py-2">
                No new notifications
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NotificationDropdown;
