"use client"
import { useState } from "react";
import { FaSearch, FaFilter, FaEye } from "react-icons/fa";

const UserActivity = () => {
  const [activityLogs, setActivityLogs] = useState([
    {
      id: 1,
      username: "johndoe",
      action: "Login",
      status: "Success",
      timestamp: "2024-12-19 10:00 AM",
      ipAddress: "192.168.1.1",
      device: "Windows",
    },
    {
      id: 2,
      username: "janedoe",
      action: "Failed Login Attempt",
      status: "Failed",
      timestamp: "2024-12-19 10:05 AM",
      ipAddress: "192.168.1.2",
      device: "MacOS",
    },
    {
      id: 3,
      username: "marksmith",
      action: "Password Change",
      status: "Success",
      timestamp: "2024-12-19 11:00 AM",
      ipAddress: "192.168.1.3",
      device: "Linux",
    },
    // Add more data for demonstration
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedLog, setSelectedLog] = useState(null); // To manage the selected log for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // To manage modal visibility

  const handleSearch = (e) => setSearchQuery(e.target.value.toLowerCase());

  const filteredLogs = activityLogs.filter(
    (log) =>
      log.username.toLowerCase().includes(searchQuery) &&
      (filter === "All" || log.status === filter)
  );

  const openModal = (log) => {
    setSelectedLog(log);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedLog(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 bg-gradient-to-r from-indigo-100 via-blue-100 to-green-100 min-h-screen">
      <h2 className="text-4xl font-semibold text-gray-800 mb-8 text-center">
        User Activity
      </h2>

      {/* Search and Filter Section */}
      <div className="flex items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search User Activity"
            className="p-4 w-96 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 shadow-md"
            onChange={handleSearch}
          />
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 shadow-lg transform transition duration-300 hover:scale-105">
            <FaSearch />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button className="bg-gray-200 text-gray-800 px-5 py-3 rounded-lg hover:bg-gray-300 shadow-md transition duration-300">
            <FaFilter /> Filter
          </button>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 shadow-md"
          >
            <option value="All">All Activities</option>
            <option value="Success">Success</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>

      {/* User Activity Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Username</th>
              <th className="px-6 py-4 text-left">Action</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Timestamp</th>
              <th className="px-6 py-4 text-left">IP Address</th>
              <th className="px-6 py-4 text-left">Device</th>
              <th className="px-6 py-4 text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id} className="border-b border-gray-200">
                <td className="px-6 py-4">{log.username}</td>
                <td className="px-6 py-4">{log.action}</td>
                <td
                  className={`px-6 py-4 text-center ${
                    log.status === "Success"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {log.status}
                </td>
                <td className="px-6 py-4">{log.timestamp}</td>
                <td className="px-6 py-4">{log.ipAddress}</td>
                <td className="px-6 py-4">{log.device}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => openModal(log)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Displaying Log Details */}
      {isModalOpen && selectedLog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">Activity Details</h3>
            <div className="mb-4">
              <strong>Username:</strong> {selectedLog.username}
            </div>
            <div className="mb-4">
              <strong>Action:</strong> {selectedLog.action}
            </div>
            <div className="mb-4">
              <strong>Status:</strong>
              <span
                className={
                  selectedLog.status === "Success"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {selectedLog.status}
              </span>
            </div>
            <div className="mb-4">
              <strong>Timestamp:</strong> {selectedLog.timestamp}
            </div>
            <div className="mb-4">
              <strong>IP Address:</strong> {selectedLog.ipAddress}
            </div>
            <div className="mb-4">
              <strong>Device:</strong> {selectedLog.device}
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserActivity;
