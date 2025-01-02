'use client'

import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import SubmitButton from "./SubmitButton";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

function EditPost({post}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);

  const handleSave = () => {
    // Logic to save the updated title
    setIsEditing(false);
  };

  return (
    <tr
      className={`hover:bg-gray-700 ${
        post.published ? "bg-gray-800" : "bg-gray-900"
      }`}
    >
      <td className="px-6 py-4">
        <Link href={`/news/${post.slug}`}>
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-16 h-16 object-cover rounded-lg"
          />
        </Link>
      </td>
      <td className="px-6 py-4">
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border border-gray-700 rounded-lg bg-gray-800 text-white"
          />
        ) : (
          <Link
            href={`/news/${post.slug}`}
            className="text-gray-300 hover:underline"
          >
            {title}
          </Link>
        )}
      </td>
      <td className="px-6 py-4">
        <Link
          href={`/author/${post.author.name}`}
          className="text-gray-300 hover:underline"
        >
          {post.author.name}
        </Link>
      </td>
      <td className="px-6 py-4 text-gray-300">{post.category}</td>
      <td className="px-6 py-4 text-gray-300">
        {/* {format(new Date(post.publishedAt), "dd MMM yyyy")} */}
      </td>
      <td className="px-6 py-4 flex space-x-2 items-center">
        {isEditing ? (
          <SubmitButton onClick={handleSave} pendingLabel="Saving...">
            Save
          </SubmitButton>
        ) : (
          <SubmitButton
            onClick={() => setIsEditing(true)}
            pendingLabel="Editing..."
          >
            <FaEdit className="inline mr-1" />
            Edit
          </SubmitButton>
        )}
        <SubmitButton
          pendingLabel="Deleting..."
          className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-3 py-2 text-sm"
        >
          <FaTrashAlt className="inline mr-1" />
          Delete
        </SubmitButton>
      </td>
    </tr>
  );
}

export default EditPost
