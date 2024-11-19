import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import {
  MdDashboard,
  MdOutlineAttachMoney,
  MdOutlineCode,
  MdOutlineMap,
  MdOutlineMailOutline,
  MdOutlinePeople,
  MdOutlinePersonAdd,
  MdPersonOutline,
  MdOutlineLogout,
  MdOutlineAnalytics,
  MdAddShoppingCart,
  MdOutlineLibraryBooks,
  MdApproval,
  MdCoPresent,
  MdOndemandVideo,
} from "react-icons/md";
import { FaBox, FaBriefcase, FaHome, FaMinusSquare } from "react-icons/fa";
import { VscRequestChanges } from "react-icons/vsc";
import { IoIosAddCircleOutline, IoMdNotifications } from "react-icons/io";
import { TbFileReport } from "react-icons/tb";
import { CiBoxList } from "react-icons/ci";
import { IoBagAddOutline, IoPersonAdd } from "react-icons/io5";
import { PiUsersThreeBold } from "react-icons/pi";

const DashboardSidebarContent = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser();
    navigate("/");
  };

  return (
    <div className="p-4 font-semibold">
      {/* Sidebar Links */}
      <nav className="flex flex-col gap-4">
        <NavLink
          to={`/dashboard/${user?.isAdmin ? "admin" : "user"}DashboardHome`}
          className={({ isActive }) =>
            isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
          }
        >
          <FaHome className="inline mr-2" />
          {user?.isAdmin ? "Admin" : "User"} Home
        </NavLink>

        <hr />
        {/* Profile Management */}
        <span className="font-bold text-cyan-700 ">Profile management</span>
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
          }
        >
          <MdPersonOutline className="inline mr-2" />
          {user?.isAdmin ? "Admin" : "User"} Profile
        </NavLink>
        <hr />
        {/* Admin Links */}
        {user?.isAdmin && (
          <>
            <span className="font-bold text-cyan-700 ">Notice management</span>
            <NavLink
              to="/dashboard/createMessage"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <MdOutlineMailOutline className="inline mr-2" />
              Send Notice
            </NavLink>
            <hr />
            <span className="font-bold text-cyan-700 ">Budget reports</span>

            <NavLink
              to="/dashboard/allUpazilas"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <FaBox className="inline mr-2" />
              All Upazila Budget
            </NavLink>
            <NavLink
              to="/dashboard/upazilaDemands"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <MdOndemandVideo className="inline mr-2" />
              Upazila Demands
            </NavLink>

            <NavLink
              to="/dashboard/codeWiseBudget"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <MdOutlineCode className="inline mr-2" />
              Code-wise Budget
            </NavLink>

            <NavLink
              to="/dashboard/upazilaAllList"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <CiBoxList className="inline mr-2" />
              List of All Upazila Offices
            </NavLink>
            <hr />
            <span className="font-bold text-cyan-700 ">Budget Execution</span>
            <NavLink
              to="/dashboard/budgetDistribution"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <MdCoPresent className="inline mr-2" />
              Budget Distribution
            </NavLink>

            <NavLink
              to="/dashboard/addEconomicField"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <IoBagAddOutline className="inline mr-2" />
              Add New Economic Field
            </NavLink>

            <NavLink
              to="/dashboard/addUpazila"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <IoIosAddCircleOutline className="inline mr-2" />
              Add New Upazila Office
            </NavLink>
            <hr />

            <span className="font-bold text-cyan-700 ">User Management</span>
            <NavLink
              to="/dashboard/allUsers"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <PiUsersThreeBold className="inline mr-2" />
              All Users
            </NavLink>
            <NavLink
              to="/dashboard/addNewUser"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <IoPersonAdd className="inline mr-2" />
              Add New User
            </NavLink>
          </>
        )}

        {/* User Links */}
        {!user?.isAdmin && (
          <>
            <span className="font-bold text-cyan-700 ">Notices</span>
            <NavLink
              to="/dashboard/messages"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <IoMdNotifications className="inline mr-2" />
              Important Notices
            </NavLink>
            <hr />
            <span className="font-bold text-cyan-700 ">Budget Report</span>

            <NavLink
              to="/dashboard/upazilaBudgetDetails"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <FaBriefcase className="inline mr-2" />
              Budget Details
            </NavLink>
            <NavLink
              to="/dashboard/allocatedCodeWiseBudget"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <MdApproval className="inline mr-2" />
              Allocated Budget
            </NavLink>
            <span className="font-bold text-cyan-700 ">Budget Executions</span>
            <NavLink
              to="/dashboard/codeWiseBudgetDemand"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <VscRequestChanges className="inline mr-2" />
              Budget Demand
            </NavLink>
            <NavLink
              to="/dashboard/addExpense"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <FaMinusSquare className="inline mr-2" />
              Add Expense
            </NavLink>
          </>
        )}

        {/* Logout */}
        <hr />
        <button
          onClick={handleLogout}
          className="text-red-600 text-base hover:underline flex items-center"
        >
          <MdOutlineLogout className="inline mr-2 w-5 h-5" />
          Logout
        </button>
      </nav>
    </div>
  );
};

export default DashboardSidebarContent;
