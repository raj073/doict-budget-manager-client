import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import DashboardSidebarContent from "../components/DashboardSidebarContent";

const DashboardLayout = () => {
  return (
    <>
      <div>
        <div className="shadow-md bg-slate-100">
          <Navbar />
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
