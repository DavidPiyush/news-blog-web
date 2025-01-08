"use client";
import axios from "axios";
import { useState, useEffect } from "react";

const CommentCard = ({ comments, id }) => {
  const [isClient, setIsClient] = useState(false);
  const [replyData, setReplyData] = useState({});
  const [isReplying, setIsReplying] = useState({});

  useEffect(() => {
    // This ensures the component only renders on the client side
    setIsClient(true);
  }, []);

  const handleReplyChange = (e, commentId) => {
    const { name, value } = e.target;
    setReplyData({
      ...replyData,
      [commentId]: {
        ...replyData[commentId],
        [name]: value,
      },
    });
  };

  const handleReplySubmit = async (e, commentId) => {
    e.preventDefault();
    const { comment } = replyData[commentId];
    if (!comment) return;

    console.log(comment, commentId);

    // Send reply to backend (you can modify the URL as needed)
    try {
      const response = await axios.post("/api/comments/create", {
        comment: comment,
        parentCommentId: commentId, // Pass parentCommentId for replies
        postId: id, // Pass the postId here
      });
      const data = response.data; // Correct way to get data from axios response
      if (data.success) {
        // Reset form and hide reply form
        setReplyData({
          ...replyData,
          [commentId]: { comment: "" },
        });
        setIsReplying({
          ...isReplying,
          [commentId]: false,
        });
        // Optionally update the comments with the new reply
      }
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  // Function to get replies for a specific comment
  const getReplies = (parentId) => {
    return comments.filter((comment) => comment.parentCommentId === parentId);
  };

 
  if (!isClient) {
    // Return a placeholder or null during server-side rendering
    return null;
  }

  return (
    <div className="space-y-6">
      {comments
        .filter((comment) => !comment.parentCommentId) // Get top-level comments
        .map((comment) => (
          <div
            key={comment._id}
            className="max-w-3xl mx-auto my-6 bg-white rounded-lg shadow-lg p-6 border border-gray-200"
          >
            {/* Comment Header */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-12 w-12 bg-indigo-500 text-white flex items-center justify-center rounded-full font-semibold text-lg">
                {comment?.email?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {comment.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Comment Text */}
            <p className="text-gray-700 text-md leading-relaxed">
              {comment.comment}
            </p>

            {/* Reply Button */}
            <div className="mt-4">
              <button
                onClick={() =>
                  setIsReplying({
                    ...isReplying,
                    [comment._id]: !isReplying[comment._id],
                  })
                }
                className="text-indigo-600 hover:text-indigo-800 focus:outline-none"
              >
                Reply
              </button>
            </div>

            {/* Reply Form */}
            {isReplying[comment._id] && (
              <form
                onSubmit={(e) => handleReplySubmit(e, comment._id)}
                className="mt-4 space-y-4"
              >
                <textarea
                  name="comment"
                  value={replyData[comment._id]?.comment || ""}
                  onChange={(e) => handleReplyChange(e, comment._id)}
                  placeholder="Write your reply..."
                  rows="4"
                  className="w-full p-3 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 resize-none"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full py-2 text-white bg-indigo-600 font-semibold text-sm rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                >
                  Post Reply
                </button>
              </form>
            )}

            {/* Nested Replies */}
            {getReplies(comment._id).length > 0 && (
              <div className="ml-8 mt-4 space-y-4">
                {getReplies(comment._id).map((reply) => (
                  <div
                    key={reply._id}
                    className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm"
                  >
                    <div className="h-10 w-10 bg-indigo-500 text-white flex items-center justify-center rounded-full font-semibold text-lg">
                      {reply?.email?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-800">
                        {reply.name}
                      </h4>
                      <p className="text-sm text-gray-600">{reply.comment}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(reply.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default CommentCard;
