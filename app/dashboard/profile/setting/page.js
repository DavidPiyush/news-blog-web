import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { getUser } from "@/app/_lib/data-service";
import { getServerSession } from "next-auth";

async function page() {
  const session = await getServerSession();
  const { user } = await getUser(session?.user?.email);

  return (
    <div className="min-h-screen  p-8">
      <UpdateProfileForm user={user} />
    </div>
  );
}

export default page;
