"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({
  children,
  pendingLabel = "Submitting...",
  className,
}) {
  const { pending } = useFormStatus();

  return (
    <button
      className={`bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:bg-blue-700 focus:outline-none flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:bg-blue-300 disabled:text-gray-500 ${className} 
      sm:px-8 md:px-10 lg:px-12 sm:py-4 md:py-5 lg:py-4`}
      disabled={pending}
    >
      {pending ? (
        <span className="flex items-center space-x-2">
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M22 12A10 10 0 1 1 2 12" />
          </svg>
          <span>{pendingLabel}</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
