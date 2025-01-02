"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, pendingLabel, className }) {
  const { pending } = useFormStatus();

  return (
    <button
      className={`bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:bg-blue-700 focus:outline-none flex items-center ${className}`}
      disabled={pending}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
