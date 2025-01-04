"use client";

import DOMPurify from "dompurify";

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

