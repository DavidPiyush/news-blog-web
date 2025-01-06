"use client";
import Image from "next/image";
import QuillEditor from "./QuilEditor";
import { CldUploadButton } from "next-cloudinary";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import SubmitButton from "./SubmitButton";
import { createPost } from "../_lib/actions";
import toast from "react-hot-toast";

function EditorContentPage({ userID, categories }) {
  const [coverImage, setCoverImage] = useState(null);
  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [publishedAt, setPublishedAt] = useState(
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

  const handleModalClose = async () => {
    setIsModalOpen(false);
  };

  const inputClass =
    "px-5 py-3 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-800 disabled:text-gray-400 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="rounded-xl w-full max-w-5xl p-8 bg-white text-gray-800  ">
      <h1 className="text-4xl font-bold text-gray-800  mb-6 text-center">
        Create News Article
      </h1>
      <form
        className="space-y-6"
        action={async (formData) => {
          try {
            const { success } = await createPost(formData);

            if (success) {
              toast.success("Article created successfully!");
            }
          } catch (error) {
            // Ensure error is a string before passing it to toast.error
            const errorMessage =
              error.message || "An error occurred while creating the article.";
            toast.error(errorMessage);
          }
        }}
      >
        {/* Send the user id to populate user post */}
        <input
          type="text"
          className="hidden"
          name="userID"
          defaultValue={userID}
        />
        {/* Title */}
        <div>
          <label className="text-lg font-semibold text-gray-700">Title</label>
          <input
            type="text"
            className={inputClass}
            name="title"
            placeholder="Enter the news sub heading"
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
          <label
            htmlFor="summary"
            className="text-lg font-semibold text-gray-700"
          >
            Summary
          </label>
          <textarea
            id="summary"
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
          <select className={inputClass} name="category" required>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option
                key={category._id}
                value={`${category._id} % ${category.slug}`}
                name={`${category._id} % ${category.slug}`}
                defaultValue={`${category._id} % ${category.slug}`}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {/* Tags */}
        <div>
          <label
            htmlFor="tags-input"
            className="text-lg font-semibold text-gray-700 block mb-2"
          >
            Tags
          </label>
          <input
            id="tags-input"
            type="text"
            className={inputClass}
            name="tags"
            placeholder="Enter comma-separated tags"
          />
          <small className="text-gray-500 block mt-2">
            Separate tags with commas (e.g., News, Technology, Sports)
          </small>
        </div>
        {/* Related Posts */}
        <div>
          <label className="text-lg font-semibold text-gray-700">
            Related Posts (Comma-separated links)
          </label>
          <input
            type="text"
            className={inputClass}
            name="relatedPosts"
            placeholder="Enter related post links"
          />
        </div>

        {/* Image Gallery */}
        <div>
          <label className="text-lg font-semibold text-gray-700">
            Image Gallery
          </label>
          <div className="relative group">
            <input
              type="text"
              className="hidden"
              name="coverImage"
              defaultValue={coverImage}
            />
            <Image
              src={coverImage || "/default-image.jpg"}
              alt="Profile"
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
          <div className="w-full ">
            <QuillEditor onChange={handleEditorChange} />
          </div>
        </div>
        <input type="hidden" name="content" value={content} />

        {/* Reading Time */}
        {/* <div>
          <label className="text-lg font-semibold text-gray-700">
            Reading Time (in minutes)
          </label>
          <input
            type="number"
            className={inputClass}
            name="readingTime"
            placeholder="Enter reading time"
          />
        </div> */}
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

        {/* Schedule for Later */}
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            value="true"
            checked={isScheduled}
            onChange={() => setIsScheduled(!isScheduled)}
            className="h-5 w-5 text-blue-500"
            name="publishedAt"
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
              value={publishedAt}
              name="publishedYear"
              onChange={(e) => setPublishedAt(e.target.value)}
              className="w-full p-4 mt-2 border border-gray-300 rounded-xl focus:outline-none shadow-lg"
            />
            <label className="text-lg font-semibold text-gray-700 mt-4">
              Publish Time
            </label>
            <input
              type="time"
              value={publishTime}
              name="publishTime"
              onChange={(e) => setPublishTime(e.target.value)}
              className="w-full p-4 mt-2 border border-gray-300 rounded-xl focus:outline-none shadow-lg"
            />
          </div>
        )}

        {/* Status */}
        <div>
          <label className="text-lg font-semibold text-gray-700">Status</label>
          <select className={inputClass} name="status">
            <option value="draft" name="draft">
              Draft
            </option>
            <option value="published" name="published">
              Publish
            </option>
            <option value="archived" name="archived">
              Private
            </option>
          </select>
        </div>

        {/* Submit Button */}

        <SubmitButton pendingLabel={"create new article..."}>
          {" "}
          Create a article{" "}
        </SubmitButton>
      </form>
    </div>
  );
}

export default EditorContentPage;
