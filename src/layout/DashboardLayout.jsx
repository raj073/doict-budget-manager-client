import { Outlet } from "react-router-dom";
import DashboardSidebarContent from "../components/DashboardSidebarContent";
import DashboardNavbar from "../components/DashboardNavbar";

const DashboardLayout = () => {
  return (
    <>
      <div className="font-popppins">
        <div className="shadow-md bg-slate-100">
          <DashboardNavbar />
        </div>
        <div className="block lg:flex">
          <div className="min-w-64 shadow-md bg-slate-100">
            <DashboardSidebarContent />
          </div>
          <div className="w-3/4 min-h-screen p-10">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardLayout;
