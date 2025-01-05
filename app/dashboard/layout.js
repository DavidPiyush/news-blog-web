import DashboardHeader from "../_components/DashboardHeader";
import SideNavigation from "../_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col ">
      <DashboardHeader />
      <div className="grid grid-cols-[18rem_1fr] h-full gap-12">
        <SideNavigation />
        <div className="py-1">{children}</div>
      </div>
    </div>
  );
}
