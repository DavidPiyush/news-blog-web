"use client";

import { signOut } from "next-auth/react";

function SignOutButton() {
  const handleSignOut = async (e) => {
    e.preventDefault();

    try {
      await signOut({ redirect: false });

      window.location.href = "/login";
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return (
    <form onSubmit={handleSignOut}>
      <button
        type="submit"
        className="px-4 py-2 text-sm text-white cursor-pointer hover:bg-slate-600 block"
      >
        <span>Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;
