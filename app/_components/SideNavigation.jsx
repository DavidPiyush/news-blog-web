import { getServerSession } from "next-auth";
import Sidebar from "./Sidebar";
import { getUser } from "../_lib/data-service";

async function SideNavigation() {
  const session = await getServerSession();
  const { user } = await getUser(session.user.email);

  return <Sidebar role={user.role} />;
}

export default SideNavigation;
