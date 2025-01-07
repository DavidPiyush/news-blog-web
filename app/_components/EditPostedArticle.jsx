"use client";
import Image from "next/image";
import QuillEditor from "./QuilEditor";
import { CldUploadButton } from "next-cloudinary";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import SubmitButton from "./SubmitButton";
import { createPost, updatePost } from "../_lib/actions";
import toast from "react-hot-toast";
import { calculateReadingTimeFromHTML } from "../_lib/helper";
import { Types } from "mongoose";

function EditPostedArticle({ article, category }) {
  const [coverImageUpdate, setCoverImageUpdate] = useState(null);
  const [updateContent, setUpdateContent] = useState(null);

  const {
    _id,
    title,
    subTitle,
    content,
    coverImage,
    tags,
    isFeatured,
    relatedPosts,
    categories,
  } = article;

  const handleImageUpload = (result) => {
    const imageUrl = result?.info?.secure_url;
    setCoverImageUpdate(imageUrl);
  };

  const handleEditorChange = (htmlContent) => {
    setUpdateContent(htmlContent);
  };

  const reading = calculateReadingTimeFromHTML(updateContent || "");

  const articleData = {
    id: _id,
    coverImage: coverImageUpdate,
    readingTime: reading.readingTimeMinutes,
    content: updateContent,
  };

  const updatePostWithData = updatePost.bind(null, articleData);

  const inputClass =
    "px-5 py-3 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-800 disabled:text-gray-400 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="rounded-xl w-full max-w-5xl p-8 bg-white text-gray-800">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Edit News Article
      </h1>
      <form
        className="space-y-6"
        action={async (formData) => {
          // await createPostWithData(formData);
          const response = await updatePostWithData(formData);

          if (response.success) {
            toast.success(response.message || "Article created successfully!");
          } else {
            toast.error(response.message || "Failed to create the article.");
          }
        }}
      >
        {/* Title */}
        <div>
          <label className="text-lg font-semibold text-gray-700">Title</label>
          <input
            type="text"
            className={inputClass}
            name="title"
            placeholder="Enter the news subheading"
            defaultValue={title}
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
            defaultValue={subTitle}
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-lg font-semibold text-gray-700">
            Category
          </label>
          <select
            className={inputClass}
            name="categories"
            defaultValue={categories}
          >
            <option value="">Select a category</option>
            {category.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
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
            defaultValue={tags}
          />
          <small className="text-gray-500">
            Separate tags with commas (e.g., News, Technology, Sports)
          </small>
        </div>

        {/* Related post */}
        <div>
          <label className="text-lg font-semibold text-gray-700">
            Related Posts (Comma-separated links)
          </label>
          <input
            type="text"
            name="relatedPosts"
            className="w-full p-4 mt-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
            placeholder="Enter related post links"
            defaultValue={relatedPosts}
          />
        </div>

        {/* Image Gallery */}
        <div>
          <label className="text-lg font-semibold text-gray-700">
            Image Gallery
          </label>
          <div className="relative group">
            <Image
              src={coverImage || "/placeholder.png"}
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
          <QuillEditor defaultValue={content} onChange={handleEditorChange} />
        </div>

        {/* Feature Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            value="true"
            name="isFeatured"
            className="h-5 w-5 bg-transparent text-slate-300"
            defaultChecked={isFeatured}
          />
          <label className="ml-2 text-lg font-semibold text-gray-700">
            Feature this post
          </label>
        </div>

        {/* Submit Button */}
        <SubmitButton pendingLabel={"Updating article..."}>
          Update Article
        </SubmitButton>
      </form>
    </div>
  );
}

export default EditPostedArticle;
