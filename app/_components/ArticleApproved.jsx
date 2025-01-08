"use client";
import Image from "next/image";
import Link from "next/link";
import SubmitButton from "./SubmitButton";
import { postApproval } from "../_lib/actions";
import toast from "react-hot-toast";

function ArticleApproved({ articles = [] }) {
  return (
    <section className="space-y-4">
      {articles?.map((article) => (
        <article
          key={article._id}
          className={`flex justify-between items-center p-4 rounded-lg shadow-sm ${
            article.isApproved ? "bg-white" : "bg-slate-100"
          } `}
        >
          <div className="flex items-center space-x-4">
            <Link
              href={`/news/${article.slug}`}
              className="flex space-x-4 cursor-pointer"
            >
              <Image
                src={article.coverImage || ""}
                alt={article.title}
                width={80}
                height={80}
                className="w-20 h-20 object-cover rounded-lg transition-transform transform hover:scale-105"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600  ">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 ">
                  By {article.author.name} | Submitted on{" "}
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </Link>
          </div>
          <div className="flex space-x-4">
            {article?.isApproved ? (
              <span className="px-4 py-2 rounded-lg text-white bg-green-500">
                Approved
              </span>
            ) : (
              <form
                action={async (formData) => {
                  const { success } = await postApproval(formData);
                  if (success) toast.success("Article approved sucessfully!");
                  if (!success) toast.success("Faild to approved article!");
                }}
              >
                <input type="hidden" name="Id" value={article._id} />
                <input type="hidden" name="isApproved" value="true" />
                <SubmitButton
                  pendingLabel={"Approving..."}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Approve
                </SubmitButton>
              </form>
            )}
            {!article?.isApproved && (
              <form
                action={async (formData) => {
                  const { success } = await postApproval(formData);
                  if (success) toast.success("Article rejected sucessfully!");
                  if (!success) toast.success("Faild to approved article!");
                }}
              >
                <input type="hidden" name="Id" value={article._id} />
                <input type="hidden" name="isApproved" value="false" />
                <SubmitButton
                  pendingLabel={"Rejecting..."}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Reject
                </SubmitButton>
              </form>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}

export default ArticleApproved;
