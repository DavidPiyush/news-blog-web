import SubmitButton from "@/app/_components/SubmitButton";
import { deleteUserByAdmin, updateRoleByAdmin } from "@/app/_lib/actions";
import { getAllCategory, getAllUser } from "@/app/_lib/data-service";
import Image from "next/image";
import { FaUserEdit, FaTrashAlt } from "react-icons/fa";

export const dynamic = "force-dynamic"; // Mark the page as dynamic

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
        return "bg-gray-200";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        User Management
      </h1>

      {/* Search and Filter Section */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search users..."
          className="p-2 border border-gray-300 rounded-lg w-full md:w-64"
        />
        <select className="p-2 border border-gray-300 rounded-lg w-full md:w-auto">
          <option value="">Filter by Role</option>
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="reader">Subscriber</option>
        </select>
      </div>

      {/* Users Table */}
      <ul className="space-y-6">
        {users.map((user) => (
          <li
            key={`user-${user.id}`}
            className="bg-white p-4 rounded-lg shadow flex flex-wrap md:flex-nowrap justify-between gap-4"
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
              <div>
                <div className="text-lg font-medium text-gray-800">
                  {user.name}
                </div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
            </div>

            {/* Role and Actions Section */}
            <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
              {/* Role Dropdown */}
              <form
                action={updateRoleByAdmin}
                className="flex items-center gap-3"
              >
                <label
                  htmlFor={`role-${user.id}`}
                  className="text-gray-800 text-sm"
                >
                  Role:
                </label>
                <select
                  id={`role-${user.id}`}
                  name="role"
                  className="p-2 border border-gray-300 rounded-lg bg-white text-gray-800"
                  defaultValue={user.role}
                >
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="contributor">Contributor</option>
                  <option value="manager">Manager</option>
                  <option value="reader">Subscriber</option>
                  <option value="author">Author</option>
                </select>
                <input className="hidden" name="id" defaultValue={user._id} />
                <SubmitButton
                  pendingLabel={"Updating..."}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  <FaUserEdit />
                </SubmitButton>
              </form>

              {/* Delete Button */}
              <form action={deleteUserByAdmin}>
                <input className="hidden" name="id" defaultValue={user._id} />
                <SubmitButton
                  pendingLabel={"Deleting..."}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrashAlt />
                </SubmitButton>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default page;
