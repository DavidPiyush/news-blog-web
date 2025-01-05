"use client";

import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

function SignOutButton() {
  const handleSignOut = async (e) => {
    e.preventDefault();

    try {
      await signOut({ redirect: false });
      toast.success("Logout sucessfully!")
      window.location.href = "/login"; 
    } catch (error) {
      toast.error("Error during sign-out");
    }
  };

  return (
    <form onSubmit={handleSignOut}>
      <button
        type="submit"
        className="px-4 py-2 text-sm text-gray-800 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 transition-colors"
      >
        Sign out
      </button>
    </form>
  );
}

export default SignOutButton;
