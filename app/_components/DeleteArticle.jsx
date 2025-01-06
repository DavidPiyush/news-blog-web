"use client";
import { useTransition } from "react";
import { FaTrashAlt } from "react-icons/fa";
import SpinnerMini from "./SpinnerMini";

import { postDelete } from "../_lib/actions";

function DeleteArticle({ articleId }) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={async (formData) => {
        if (confirm("Are you sure you want to delete this article?")) {
          startTransition(() => postDelete(formData));
        }
      }}
    >
      <input name="id" defaultValue={articleId} className="hidden" />
      <button className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white rounded-lg px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-10 lg:py-4 text-sm md:text-base lg:text-lg flex items-center gap-2 shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105">
        {!isPending ? (
          <>
            <FaTrashAlt className="inline" />
            <span>Delete</span>
          </>
        ) : (
          <span className="mx-auto">
            <SpinnerMini />
          </span>
        )}
      </button>
    </form>
  );
}

export default DeleteArticle;
