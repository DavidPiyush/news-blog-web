import Link from "next/link";

import { FaBell } from "react-icons/fa";

function NotificationDropdown() {
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [notifications, setNotifications] = useState([
  //   "New message from John",
  //   "System update available",
  //   "Reminder: Meeting at 3 PM",
  // ]);
  // const notificationRef = useRef(null);

  // // Close dropdown when clicking outside
  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (
  //       notificationRef.current &&
  //       !notificationRef.current.contains(event.target)
  //     ) {
  //       setIsDropdownOpen(false);
  //     }
  //   }
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <Link href={"/dashboard/profile/notification"} className="relative">
      {/* Notification Icon */}

      <FaBell className="w-6 h-6 text-gray-800 hover:text-indigo-500 transition-colors duration-300" />

      {/* Notification Dropdown
      {isDropdownOpen && (
        <div className="absolute top-10 right-0 bg-white text-gray-800 rounded-lg shadow-lg w-72 py-2 px-4 z-50">
          <div className="font-medium mb-2">Notifications</div>
          <ul>
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <li
                  key={index}
                  className="text-sm py-1 px-2 hover:bg-gray-100 rounded-md cursor-pointer border-b last:border-0 border-gray-200"
                  onClick={() => setNotifications([])} // Clear notifications on click
                >
                  {notification}
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-500 py-2">
                No new notifications
              </li>
            )}
          </ul>
        </div>
      )} */}
    </Link>
  );
}

export default NotificationDropdown;
