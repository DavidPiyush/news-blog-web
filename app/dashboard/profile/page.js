import { getFilteredArticles, getUser } from "@/app/_lib/data-service";
import { format } from "date-fns";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";

export const metadata = {
  title: "Profile",
};

export async function generateStaticParams() {
  const articles = await getFilteredArticles();

  const ids = articles.map((article) => ({ id: article._id }));

  return ids;
}

async function page() {
  const session = await getServerSession();
  const { user } = await getUser(session?.user?.email);
  const articles = await getFilteredArticles();

  const userPost = articles.filter(
    (article) => article.author?._id === user?._id
  );

  const roleStyles = {
    admin: "bg-gradient-to-br from-purple-600 via-pink-500 to-red-500",
    reader: "bg-gradient-to-br from-blue-100 via-green-100 to-yellow-100",
    profileHeader: (role) =>
      role === "admin"
        ? "bg-gradient-to-r from-indigo-900 to-purple-800 text-white"
        : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white",
    profileCard: (role) =>
      role === "admin"
        ? "bg-gradient-to-r from-purple-50 to-indigo-100 shadow-2xl"
        : "bg-white shadow-lg",
    verifiedIcon: (role) =>
      role === "admin" ? "text-purple-600" : "text-blue-600",
  };

  return (
    <div
      className={`p-8 min-h-screen ${
        roleStyles[user.role] || "bg-slate-800"
      } relative `}
    >
      <div className="absolute inset-0 z-0 flex justify-center items-center text-slate-600 text-9xl font-bold opacity-10">
        {user.role == "admin" ? "ADMIN PROFILE" : "CLIENT PROFILE"}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Gradient Header */}
        <div
          className={`py-16 px-6 shadow-lg ${roleStyles.profileHeader(
            user.role
          )} `}
        >
          <div className="max-w-5xl mx-auto">
            <h1
              className={`text-4xl font-bold text-slate-300 ${
                user.role === "admin" ? "animate-pulse" : ""
              }`}
            >
              {user.role === "admin" ? "Admin Dashboard" : "Client Profile"}
            </h1>
            <p className="text-lg text-slate-400 mt-2">
              Manage your account details and settings.
            </p>
          </div>
        </div>

        {/* Profile Section */}
        <div
          className={`max-w-5xl mx-auto p-8  rounded-lg -mt-16 relative z-10 `}
        >
          {/* Profile Header */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-12">
            {/* Profile Picture */}
            <div className="relative group">
              <Image
                src={user.profilePicture}
                alt="Profile"
                width={160}
                height={160}
                className={`w-40 h-40 rounded-full object-cover shadow-md border-4 ${
                  user.role === "admin"
                    ? "border-purple-600"
                    : "border-gray-200"
                }`}
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-slate-300 space-y-4 ">
              <h2 className="text-3xl font-bold flex items-center space-x-2 pt-12 border-b-[1px] border-red-100/50 pb-1">
                <span>{user.name}</span>
                {user.isVerified && (
                  <FaCheckCircle
                    //   className={roleStyles.verifiedIcon(role)}
                    title="Verified Profile"
                  />
                )}
              </h2>
              <p className="text-slate-300 ">{user.bio}</p>
              <p className="text-slate-300">
                Joined: {format(new Date(user.createdAt), "MMMM dd, yyyy")}
              </p>
              <p className="text-slate-300">Total Posts: {userPost?.length}</p>
              <p className="text-slate-300">Profession: {user.profession}</p>
              <p className="text-slate-300">Gender: {user.gender}</p>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="mt-8 bg-slate-900 shadow-md p-6 rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-300">
                Contact Information
              </h3>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <p className="text-sm text-slate-300">
                  <FaEnvelope className="inline mr-2" />
                  {user.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-300">
                  <FaPhone className="inline mr-2" />
                  {user.phoneNumber}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-300">
                  <FaMapMarkerAlt className="inline mr-2" />
                  {user.address}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Articles */}
          <div className="mt-8">
            <h3 className="text-slate-300 text-lg font-bold">
              Recent Articles
            </h3>
            <div className="space-y-4 mt-4">
              {userPost?.map((article, index) => (
                <div key={index} className="flex space-x-4">
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    width={64}
                    height={64}
                    className="object-cover rounded-md"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {article.title}
                    </h4>
                    <p className="text-sm text-gray-700">
                      {format(new Date(article.publishedAt), "MMMM dd, yyyy")}
                    </p>
                    <Link
                      href={`news/${article.slug}`}
                      className="text-blue-600 hover:underline"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
