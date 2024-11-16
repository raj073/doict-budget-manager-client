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
} from "react-icons/md";

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
        {/* Admin Links */}
        {user?.isAdmin && (
          <>
            <NavLink
              to="/dashboard/adminDashboardHome"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <MdDashboard className="inline mr-2" />
              Admin Home
            </NavLink>
            <hr />
            <span className="font-bold text-cyan-700 ">Budget reports</span>

            <NavLink
              to="/dashboard/allUpazilas"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <MdOutlineAttachMoney className="inline mr-2" />
              All Upazila Budget
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
              <MdOutlineMap className="inline mr-2" />
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
              <MdOutlineLibraryBooks className="inline mr-2" />
              Budget Distribution
            </NavLink>

            <NavLink
              to="/dashboard/addEconomicField"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <MdAddShoppingCart className="inline mr-2" />
              Add New Economic Field
            </NavLink>

            <NavLink
              to="/dashboard/addUpazila"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <MdOutlineMap className="inline mr-2" />
              Add New Upazila Office
            </NavLink>
            <hr />
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
            <span className="font-bold text-cyan-700 ">User Management</span>
            <NavLink
              to="/dashboard/allUsers"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <MdOutlinePeople className="inline mr-2" />
              All Users
            </NavLink>
            <NavLink
              to="/dashboard/addNewUser"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <MdOutlinePersonAdd className="inline mr-2" />
              Add New User
            </NavLink>
          </>
        )}

        {/* User Links */}
        {!user?.isAdmin && (
          <>
            <NavLink
              to="/dashboard/userDashboardHome"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <MdDashboard className="inline mr-2" />
              User Home
            </NavLink>
            <hr />
            <NavLink
              to="/dashboard/messages"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <MdOutlineLibraryBooks className="inline mr-2" />
              Important Notices
            </NavLink>
            <span className="font-bold text-cyan-700 ">Budget Executions</span>
            <NavLink
              to="/dashboard/allocatedCodeWiseBudget"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <MdOutlineAnalytics className="inline mr-2" />
              Allocated Codewise Budget
            </NavLink>
            <NavLink
              to="/dashboard/addExpense"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <MdAddShoppingCart className="inline mr-2" />
              Add Expense
            </NavLink>
          </>
        )}

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

        {/* Logout */}
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
