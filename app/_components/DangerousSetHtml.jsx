"use client";

import DOMPurify from "dompurify";

console.log(DOMPurify); // Check if DOMPurify is correctly imported

function DangerousSetHtml({ content }) {
  const sanitizedContent =
    typeof window !== "undefined" ? DOMPurify.sanitize(content) : content;

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}

export default DangerousSetHtml;
