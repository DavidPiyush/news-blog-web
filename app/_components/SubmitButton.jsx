"use client";

import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";

export default function SubmitButton({
  children,
  pendingLabel = "Submitting...",
  className,
}) {
  const { pending } = useFormStatus();

  return (
    <button
      className={`bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:bg-blue-700 focus:outline-none flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:bg-blue-300 disabled:text-gray-500 ${className} 
      sm:px-8 md:px-6 sm:py-4 md:py-2  text-sm`}
      disabled={pending}
    >
      {pending ? (
        <span className="flex items-center space-x-2">
          <SpinnerMini/>
          <span>{pendingLabel}</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
