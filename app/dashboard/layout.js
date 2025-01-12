import DashboardHeader from "../_components/DashboardHeader";
import SideNavigation from "../_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-100 to-purple-100 relative z">
      <DashboardHeader />
      <div className="grid grid-cols-[18rem_1fr] h-full gap-12">
        <div className=" ">
          <div className="fixed w-[18rem] ">
            <SideNavigation />
          </div>
        </div>

        <div className="py-1 ">{children}</div>
      </div>
    </div>
  );
}
 