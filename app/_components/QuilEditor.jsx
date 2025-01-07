"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "highlight.js/styles/monokai-sublime.css";
// Import highlight.js theme
import hljs from "highlight.js"; // Import highlight.js

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value, // Enable syntax highlighting
  },
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "code-block"],
  ],
};

const QuillEditor = ({ onChange,defaultValue='' }) => {
  const handleChange = (content) => {
    onChange(content);
  };

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      onChange={handleChange}
      defaultValue={defaultValue}
      className="bg-white shadow-md rounded-lg p-2"
    />
  );
};

export default QuillEditor;
