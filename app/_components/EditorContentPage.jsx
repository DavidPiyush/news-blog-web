"use client";
import Image from "next/image";
import QuillEditor from "./QuilEditor";
import { CldUploadButton } from "next-cloudinary";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import SubmitButton from "./SubmitButton";
import { createPost } from "../_lib/actions";
import toast from "react-hot-toast";
import { calculateReadingTimeFromHTML } from "../_lib/helper";
import { Types } from "mongoose";

function EditorContentPage({ userID, categories, role }) {
  const [coverImage, setCoverImage] = useState(null);
  const [content, setContent] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);
  const [publishedYear, setPublishedYear] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [publishTime, setPublishTime] = useState("12:00");

  const handleImageUpload = (result) => {
    const imageUrl = result?.info?.secure_url;
    setCoverImage(imageUrl);
  };

  const handleEditorChange = (htmlContent) => {
    setContent(htmlContent);
  };

  const combinedDateTime = `${
    publishedYear || new Date().toISOString().split("T")[0]
  }T${publishTime || new Date().toTimeString().split(" ")[0]}`;
  const mongoDate = new Date(combinedDateTime);

  if (isNaN(mongoDate)) {
    throw new Error("Invalid date or time format.");
  }

  const readingTime = calculateReadingTimeFromHTML(content || "");
  const articleData = {
    isApproved: role === "admin" ? true : false,
    author: new Types.ObjectId(userID), // MongoDB ObjectId
    content,
    coverImage: coverImage === null ? "" : coverImage,
    readingTime: readingTime.readingTimeMinutes,
    publishedAt: mongoDate, // MongoDB Date
  };

  const createPostWithData = createPost.bind(null, articleData);

  const inputClass =
    "px-5 py-3 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-800 disabled:text-gray-400 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="rounded-xl w-full max-w-5xl p-8 bg-white text-gray-800">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center ">
        Create News Article
      </h1>
      <form
        className="space-y-6"
        action={async (formData) => {
          // await createPostWithData(formData);
          const response = await createPostWithData(formData);

          if (Number(response.statusCode) == 201) {
            toast.success(response.message || "Article created successfully!");
          } else {
            toast.error(response.message || "Failed to create the article.");
          }
        }}
      >
        {/* User ID */}
        {/* <input type="hidden" name="userID" defaultValue={userID} /> */}

        {/* Title */}
        <div>
          <label className="text-lg font-semibold text-gray-700">Title</label>
          <input
            type="text"
            className={inputClass}
            name="title"
            placeholder="Enter the news subheading"
            required
          />
        </div>

        {/* Sub Title */}
        <div>
          <label className="text-lg font-semibold text-gray-700">
            Sub Title
          </label>
          <input
            type="text"
            className={inputClass}
            name="subTitle"
            placeholder="Enter the news headline"
            required
          />
        </div>

        {/* Summary */}
        <div>
          <label className="text-lg font-semibold text-gray-700">Summary</label>
          <textarea
            name="summary"
            className={`${inputClass} resize-none`}
            placeholder="Enter the news summary"
            rows="4"
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-lg font-semibold text-gray-700">
            Category
          </label>
          <select className={inputClass} name="categories" required>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="text-lg font-semibold text-gray-700">Tags</label>
          <input
            type="text"
            className={inputClass}
            name="tags"
            placeholder="Enter comma-separated tags"
          />
          <small className="text-gray-500">
            Separate tags with commas (e.g., News, Technology, Sports)
          </small>
        </div>

        <div>
          <label className="text-lg font-semibold text-gray-700">
            Related Posts (Comma-separated links)
          </label>
          <input
            type="text"
            name="relatedPosts"
            className="w-full p-4 mt-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
            placeholder="Enter related post links"
          />
        </div>
        {/* Image Gallery */}
        <div>
          <label className="text-lg font-semibold text-gray-700">
            Image Gallery
          </label>
          <div className="relative group">
            {/* <input type="hidden" name="coverImage" defaultValue={coverImage} /> */}
            <Image
              src={coverImage || "/default-image.jpg"}
              alt="Cover"
              width={160}
              height={160}
              className="w-full h-40 object-cover rounded-lg shadow-md"
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
              <span className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow-lg transform transition duration-300 hover:scale-110">
                <FaEdit />
              </span>
            </CldUploadButton>
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="text-lg font-semibold text-gray-700">Content</label>
          <QuillEditor onChange={handleEditorChange} />
        </div>

        {/* Feature Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            value="true"
            name="isFeatured"
            className="h-5 w-5  bg-transparent text-slate-300"
          />
          <label className="ml-2 text-lg font-semibold text-gray-700">
            Feature this post
          </label>
        </div>
        {/* Comment Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            value="true"
            name="isCommentAllowed"
            className="h-5 w-5  bg-transparent text-slate-300"
          />
          <label className="ml-2 text-lg font-semibold text-gray-700">
            Allow Comments
          </label>
        </div>

        {/* Schedule for Later */}
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            checked={isScheduled}
            onChange={() => setIsScheduled(!isScheduled)}
            className="h-5 w-5 text-blue-500"
          />
          <label className="ml-2 text-lg font-semibold text-gray-700">
            Schedule for Later
          </label>
        </div>
        {isScheduled && (
          <div className="mt-4">
            <label className="text-lg font-semibold text-gray-700">
              Publish Date
            </label>
            <input
              type="date"
              value={publishedYear}
              name="publishedAt"
              onChange={(e) => setPublishedYear(e.target.value)}
              className={inputClass}
            />
            <label className="text-lg font-semibold text-gray-700 mt-4">
              Publish Time
            </label>
            <input
              type="time"
              value={publishTime}
              name="publishTime"
              onChange={(e) => setPublishTime(e.target.value)}
              className={inputClass}
            />
          </div>
        )}

        {/* Status */}
        <div>
          <label className="text-lg font-semibold text-gray-700">Status</label>
          <select className={inputClass} name="status">
            <option value="draft">Draft</option>
            <option value="published">Publish</option>
            <option value="archived">Private</option>
          </select>
        </div>

        {/* Submit Button */}
        <SubmitButton pendingLabel={"Creating article..."}>
          Create Article
        </SubmitButton>
      </form>
    </div>
  );
}

export default EditorContentPage;
