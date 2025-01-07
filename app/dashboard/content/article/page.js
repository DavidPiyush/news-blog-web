import EditorContentPage from "@/app/_components/EditorContentPage";
import { getAllCategory, getUser } from "@/app/_lib/data-service";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Article Editor",
};

async function page() {
  const session = await getServerSession();
  const { user } = await getUser(session.user.email);
  const { categories } = await getAllCategory();

  return (
    <div className="p-8 min-h-screen">
      <EditorContentPage userID={user._id} categories={categories} role={user.role} />
    </div>
  );
}

export default page;
