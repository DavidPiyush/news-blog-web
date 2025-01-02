"use client"
import { useState } from "react";
import { FaLock, FaEdit, FaTrash, FaPlusCircle } from "react-icons/fa";

const RolesPermissions = () => {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Admin",
      description: "Full access to all features",
      permissions: ["Create", "Edit", "Delete"],
      status: "Active",
    },
    {
      id: 2,
      name: "Editor",
      description: "Can edit content",
      permissions: ["Edit"],
      status: "Active",
    },
    {
      id: 3,
      name: "Viewer",
      description: "Can view content",
      permissions: ["View"],
      status: "Inactive",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);

  const handleSearch = (e) => setSearchQuery(e.target.value.toLowerCase());

  const handleRoleClick = (role) => {
    setSelectedRole(role);
  };

  const handleDeleteRole = () => {
    setRoles(roles.filter((role) => role.id !== roleToDelete));
    setShowModal(false);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Roles & Permissions
      </h2>

      {/* Search */}
      <div className="mb-6 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search Roles"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleSearch}
        />
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2">
          <FaPlusCircle />
          Add Role
        </button>
      </div>

      {/* Roles Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Permissions</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles
              .filter((role) => role.name.toLowerCase().includes(searchQuery))
              .map((role) => (
                <tr key={role.id} className="hover:bg-gray-50">
                  <td className="p-4">{role.name}</td>
                  <td className="p-4">{role.description}</td>
                  <td className="p-4">{role.permissions.join(", ")}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full ${
                        role.status === "Active"
                          ? "bg-green-200 text-green-700"
                          : "bg-red-200 text-red-700"
                      }`}
                    >
                      {role.status}
                    </span>
                  </td>
                  <td className="p-4 flex gap-3">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleRoleClick(role)}
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => {
                        setRoleToDelete(role.id);
                        setShowModal(true);
                      }}
                    >
                      <FaTrash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Role Details & Permission Assignment */}
      {selectedRole && (
        <div className="mt-8 p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">
            Role: {selectedRole.name}
          </h3>
          <p className="mb-4 text-lg">{selectedRole.description}</p>
          <h4 className="font-semibold mb-2">Permissions</h4>
          <div className="flex flex-wrap gap-4">
            {["Create", "Edit", "View", "Delete"].map((permission) => (
              <div key={permission} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={permission}
                  checked={selectedRole.permissions.includes(permission)}
                  onChange={() => {
                    const updatedPermissions =
                      selectedRole.permissions.includes(permission)
                        ? selectedRole.permissions.filter(
                            (p) => p !== permission
                          )
                        : [...selectedRole.permissions, permission];
                    setSelectedRole({
                      ...selectedRole,
                      permissions: updatedPermissions,
                    });
                  }}
                />
                <label htmlFor={permission} className="text-sm">
                  {permission}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <h4 className="text-xl font-semibold mb-4">Confirm Deletion</h4>
            <p>
              Are you sure you want to delete this role? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
                onClick={handleDeleteRole}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolesPermissions;
