import SubmitButton from "@/app/_components/SubmitButton";
import { deleteUserByAdmin, updateRoleByAdmin } from "@/app/_lib/actions";
import { getAllCategory, getAllUser } from "@/app/_lib/data-service";
import Image from "next/image";
import { FaUserEdit, FaTrashAlt } from "react-icons/fa";
export const dynamic = 'force-dynamic'; // Mark the page as dynamic


export const metadata = {
  title: "User Management",
  description: "Manage your users here",
};

async function page() {
  const { users } = await getAllUser();
  const { categories } = await getAllCategory();

  const getBackgroundColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-indigo-100";
      case "editor":
        return "bg-green-100";
      case "reader":
        return "bg-yellow-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-100 mb-6">
        User Management
      </h1>

      {/* Search and Filter Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search users..."
            className="p-2 border rounded-lg w-64"
            // value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Filter Dropdown */}
          <select
            className="p-2 border rounded-lg"
            // value={selectedRole}
            // onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">Filter by Role</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="reader">Subscriber</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-3xl font-semibold text-gray-100 mb-6">
          User Management
        </div>

        {/* User Management List */}
        <ul className="space-y-6">
          {users.map((user) => (
            <li
              key={`user-${user.id}`}
              className="bg-gray-800 p-4 rounded-lg shadow flex justify-between gap-2"
            >
              {/* Profile and Info Section */}
              <div className="flex items-center space-x-4">
                <div
                  className={`flex items-center justify-center w-16 h-16 rounded-full ${getBackgroundColor(
                    user.role
                  )}`}
                >
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-14 h-14 rounded-full border-2 border-white"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-lg font-medium text-gray-100">
                    {user.name}
                  </div>
                  <div className="text-sm text-gray-400">{user.email}</div>
                </div>
              </div>

              {/* Role and Actions Section */}
              <div className=" flex items-center gap-4 ">
                {/* Role Dropdown */}
                <form
                  action={updateRoleByAdmin}
                  className="flex justify-between w-full gap-3 items-center"
                >
                  <div className="flex items-center">
                    <label
                      htmlFor={`role-${user.id}`}
                      className="text-gray-100 mr-2"
                    >
                      Role:
                    </label>
                    <select
                      id={`role-${user.id}`}
                      name="role"
                      className="p-2 border rounded-lg bg-gray-700 text-gray-100"
                      defaultValue={user.role}
                    >
                      <option value="admin">Admin</option>
                      <option value="editor">Editor</option>
                      <option value="contributor">Contributor</option>
                      <option value="manager">Manager</option>
                      <option value="reader">Subscriber</option>
                      <option value="author">Author</option>
                    </select>
                  </div>
                  <input
                    className="hidden"
                    name="id"
                    defaultValue={user._id}
                    // value={user._id}
                  />
                  <SubmitButton
                    pendingLabel={"Updating user..."}
                    className={"text-indigo-600 hover:text-indigo-800"}
                  >
                    <FaUserEdit />
                  </SubmitButton>
                  {/* Action Buttons */}
                </form>

                <form className="place-items-end" action={deleteUserByAdmin}>
                  <input
                    className="hidden"
                    name="id"
                    defaultValue={user._id}
                    // value={user._id}
                  />
                  <SubmitButton
                    pendingLabel={"Deleting user..."}
                    className={"text-red-600 hover:text-red-800"}
                  >
                    <FaTrashAlt />
                  </SubmitButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default page;
