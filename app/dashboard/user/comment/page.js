"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaSearch,
  FaUser,
  FaClock,
  FaCheckCircle,
  FaTrashAlt,
} from "react-icons/fa";
import Link from "next/link";

const CommentPage = () => {
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({ post: "", approved: "all" });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch comments from the database
  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/comments");
      setComments(response.data.comments);
      setFilteredComments(response.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    filterComments(e.target.value, filter);
  };

  // Handle filter input
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilter = { ...filter, [name]: value };
    setFilter(updatedFilter);
    filterComments(searchQuery, updatedFilter);
  };

  // Filter comments based on search and filter criteria
  const filterComments = (query, filter) => {
    let filtered = comments;

    if (query) {
      filtered = filtered.filter(
        (comment) =>
          comment.comment.toLowerCase().includes(query.toLowerCase()) ||
          comment.user.toLowerCase().includes(query.toLowerCase()) ||
          comment.post.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (filter.post) {
      filtered = filtered.filter((comment) =>
        comment.post.title.toLowerCase().includes(filter.post.toLowerCase())
      );
    }

    if (filter.approved !== "all") {
      filtered = filtered.filter(
        (comment) => String(comment.approved) === filter.approved
      );
    }

    setFilteredComments(filtered);
  };

  // Approve comment
  const handleApprove = async (id) => {
    try {
      setActionLoading(true);
      await axios.patch(`/api/comments/${id}/update`, { approved: true });
      await fetchComments(); // Refetch comments after approving
    } catch (error) {
      console.error("Error approving comment:", error);
    } finally {
      setActionLoading(false);
    }
  };

  // Delete comment
  const handleDelete = async (id) => {
    try {
      setActionLoading(true);
      await axios.delete(`/api/comments/${id}/delete`);
      await fetchComments(); // Refetch comments after deleting
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-screen-xl mx-auto px-6">
        <h1 className="text-4xl font-semibold text-gray-900 mb-6">
          Comment Management
        </h1>

        <div className="mb-4 text-lg text-gray-700">
          <strong>Total Comments: {filteredComments.length}</strong>
        </div>

        <div className="flex space-x-6 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search comments..."
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <FaSearch className="absolute top-2 left-3 text-gray-500" />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <input
                type="text"
                name="post"
                value={filter.post}
                onChange={handleFilterChange}
                placeholder="Filter by post title"
                className="w-full py-2 px-4 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <select
                name="approved"
                value={filter.approved}
                onChange={handleFilterChange}
                className="py-2 px-4 border border-gray-300 rounded-lg"
              >
                <option value="all">All Comments</option>
                <option value="true">Approved</option>
                <option value="false">Unapproved</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading comments...</div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="min-w-full table-auto">
              <thead className="bg-indigo-600 text-white text-sm">
                <tr>
                  <th className="px-6 py-3 text-left">User</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Comment</th>
                  <th className="px-6 py-3 text-left">Post</th>
                  <th className="px-6 py-3 text-left">Timestamp</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredComments.length > 0 ? (
                  filteredComments.map((comment) => (
                    <tr
                      key={comment._id}
                      className={`border-b transition duration-300 ease-in-out ${
                        comment.approved ? "bg-green-50" : "bg-red-50"
                      } hover:bg-gray-100`}
                    >
                      <td className="px-6 py-6 text-sm text-gray-800 flex items-center space-x-3">
                        <FaUser className="text-indigo-500" />
                        <span>{comment.user}</span>
                      </td>
                      <td className="px-6 py-6 text-sm text-gray-600">
                        {comment.email}
                      </td>
                      <td className="px-6 py-6 text-sm text-gray-700">
                        {comment.comment}
                      </td>
                      <td className="px-6 py-6 text-sm text-gray-600 flex items-center space-x-3">
                        <Link href={""} passHref>
                          <p className="text-indigo-600 hover:underline">
                            {comment.postId}
                          </p>
                        </Link>
                      </td>
                      <td className="px-6 py-6 text-sm text-gray-500">
                        <FaClock className="inline mr-2 text-gray-400" />
                        {new Date(comment.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-6 text-sm text-gray-600 space-x-3">
                        {comment.approved ? (
                          <span className="text-green-500">
                            <FaCheckCircle className="inline mr-2" />
                            Approved
                          </span>
                        ) : (
                          <button
                            onClick={() => handleApprove(comment._id)}
                            className="py-1 px-3 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition duration-200"
                            disabled={actionLoading}
                          >
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(comment._id)}
                          className="ml-2 py-1 px-3 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-200"
                          disabled={actionLoading}
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-6 text-center text-gray-500"
                    >
                      No comments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentPage;
