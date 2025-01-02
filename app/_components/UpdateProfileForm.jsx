"use client";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react"; // Import useState to manage the image URL
import { updateProfile } from "../_lib/actions";

function UpdateProfileForm({ user }) {
  const [imageUrl, setImageUrl] = useState(user?.profilePicture || ""); // State to store image URL

  const roles = [
    "admin",
    "editor",
    "author",
    "contributor",
    "manager",
    "reader",
  ];

  const handleImageUpload = (result) => {
    const uploadedImageUrl = result?.info?.secure_url;
    console.log(uploadedImageUrl, "this is uploaded image URL");
    setImageUrl(uploadedImageUrl); // Update the image URL state
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <form className="space-y-8" action={updateProfile}>
          <div className="flex items-center space-x-6 mb-12">
            <div className="relative group">
              <Image
                src={imageUrl || user?.profilePicture || "/default-profile.png"} // Use the imageUrl state if available
                alt="Profile"
                width={128}
                height={128}
                name="profilePicture"
                className="rounded-full object-cover border-4 border-blue-500 shadow-lg transition duration-300 transform hover:scale-110 w-32 h-32"
              />
              <CldUploadButton
                options={{
                  maxFiles: 1,
                  cropping: true,
                  multiple: false,
                }}
                onSuccess={handleImageUpload}
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              >
                <input
                  type="text"
                  name="profilePicture"
                  defaultValue={imageUrl || user.imageUrl}
                  className="hidden"
                />
                <span className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow-lg transform transition duration-300 hover:scale-110">
                  <FaEdit />
                </span>
              </CldUploadButton>
            </div>
            <h2 className="text-3xl font-bold text-slate-400">
              {user?.name || "Your Name"}
            </h2>
          </div>

          <input
            name="_id"
            type="text"
            className="hidden"
            defaultValue={user._id}
          />
          <div className="flex items-center space-x-6">
            <div className="w-1/2">
              <label
                htmlFor="name"
                className="block text-lg font-semibold text-slate-400"
              >
                Full Name
              </label>
              <input
                defaultValue={user.name}
                name="name"
                className="px-5 py-3 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-800 disabled:text-gray-400 bg-gray-600 text-gray-300"
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="email"
                className="block text-lg font-semibold text-slate-400"
              >
                Mobile Number
              </label>
              <input
                // disabled
                defaultValue={user.phoneNumber}
                name="phoneNumber"
                className="px-5 py-3 bg-gray-600 text-gray-300 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-800 disabled:text-gray-300"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-lg font-semibold text-slate-400"
            >
              Address
            </label>
            <textarea
              name="address"
              defaultValue={user.address}
              className="px-5 py-3 bg-gray-600 text-gray-300 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
              rows="3"
            />
          </div>
          <div>
            <label
              htmlFor="bio"
              className="block text-lg font-semibold text-slate-400"
            >
              Bio
            </label>
            <textarea
              name="bio"
              defaultValue={user.bio}
              className="px-5 py-3 bg-gray-600 text-gray-300 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
              rows="4"
            />
          </div>

          <div className="flex items-center space-x-6">
            <div className="w-1/2">
              <label
                htmlFor="gender"
                className="block text-lg font-semibold text-slate-400"
              >
                Gender
              </label>
              <select
                name="gender"
                className="px-5 py-3 bg-gray-600 text-gray-300 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
              >
                <option value="Male" name="Male">
                  Male
                </option>
                <option value="Female" name="Female">
                  Female
                </option>
                <option value="Other" name="Other">
                  Other
                </option>
              </select>
            </div>
            <div className="w-1/2">
              <label
                htmlFor="profession"
                className="block text-lg font-semibold text-slate-400"
              >
                Profession
              </label>
              <input
                type="text"
                name="profession"
                defaultValue={user.profession}
                className="px-5 py-3 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-800 disabled:text-gray-400 bg-gray-600 text-gray-300"
              />
            </div>
          </div>

          {/* <div>
            <label
              htmlFor="role"
              className="block text-lg font-semibold text-slate-400"
            >
              Role
            </label>
            <select
              name="role"
              defaultValue={user.role}
              className="px-5 py-3 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-800 disabled:text-gray-400 bg-gray-600 text-gray-300"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div> */}

          <div className="flex items-center space-x-6 mt-10">
            <button
              type="submit"
              name="submit"
              className="py-3 px-6 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition duration-300 flex items-center gap-2"
            >
              <FaSave /> Save Profile
            </button>
            <button
              type="reset"
              name="cancel"
              className="py-3 px-6 bg-gray-300 text-slate-400 rounded-xl shadow-lg hover:bg-gray-700 transition duration-300 flex items-center gap-2"
            >
              <FaTimes /> Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfileForm;
