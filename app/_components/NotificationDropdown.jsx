"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaBell } from "react-icons/fa";

function NotificationDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const notificationRef = useRef(null);

  // Fetch notifications from the API route
  useEffect(() => {
    async function fetchNotifications() {
      try {
        const response = await fetch("/api/notifications");
        const data = await response.json();
        setNotifications(data.notifications); // Assuming the API returns a list of notifications
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNotifications();
  }, []);

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
    <div className="relative">
      {/* Notification Icon */}
      <FaBell
        className="w-6 h-6 text-gray-800 hover:text-indigo-500 transition-colors duration-300"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown on click
      />

      {/* Notification Dropdown */}
      <div ref={notificationRef}>
        {isDropdownOpen && (
          <div className="absolute top-10 right-0 bg-white text-gray-800 rounded-lg shadow-lg w-72 py-2 px-4 z-50">
            <div className="font-medium mb-2">Notifications</div>
            <ul>
              {loading ? (
                <li className="text-sm text-gray-500 py-2">Loading...</li>
              ) : notifications.length > 0 ? (
                notifications.slice(0, 6).map((notification, index) => (
                  <li
                    key={index}
                    className="text-sm py-1 px-2 hover:bg-gray-100 rounded-md cursor-pointer border-b last:border-0 border-gray-200"
                    onClick={() => setNotifications([])} // Clear notifications on click
                  >
                    {notification.message}{" "}
                    {/* Assuming the notification has a 'message' field */}
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-500 py-2">
                  No new notifications
                </li>
              )}
            </ul>

            {/* See All Notifications Link */}
            <div className="mt-2">
              <Link
                href="/dashboard/profile/notification"
                className="text-sm text-blue-600 hover:underline"
              >
                See all notifications
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationDropdown;
