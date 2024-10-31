import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import {
  FaUser,
  FaUsers,
  FaPenAlt,
  FaMoneyCheck,
  FaPlusSquare,
  FaList,
} from "react-icons/fa";

const DashboardSidebarContent = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-4 font-semibold">
      {/* User Profile Info */}
      <div className="flex flex-row lg:flex-col items-start gap-2">
        <img
          src={user?.photoUrl}
          alt="User Profile"
          className="w-16 rounded-full"
        />
        <span>{user?.displayName}</span>
        <span className="text-xs">{user?.email}</span>
      </div>
      <hr className="my-4" />

      {/* Sidebar Links */}
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
          }
        >
          <FaUser className="inline mr-2" />
          Profile
        </NavLink>

        {/* Admin Links */}
        {user?.isAdmin && (
          <>
            <NavLink
              to="/dashboard/codeWiseBudget"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <FaMoneyCheck className="inline mr-2" />
              Code-wise Budget
            </NavLink>
            <NavLink
              to="/dashboard/allUpazilas"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <FaList className="inline mr-2" />
              All Upazilas
            </NavLink>
            <NavLink
              to="/dashboard/addEconomicField"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <FaPlusSquare className="inline mr-2" />
              Add Economic Field
            </NavLink>
            <NavLink
              to="/dashboard/budgetDistribution"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <FaMoneyCheck className="inline mr-2" />
              Budget Distribution
            </NavLink>
            <NavLink
              to="/dashboard/allUsers"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <FaUsers className="inline mr-2" />
              All Users
            </NavLink>
            <NavLink
              to="/dashboard/createMessage"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <FaUsers className="inline mr-2" />
              Send Notice
            </NavLink>
          </>
        )}

        {/* User Links */}
        {!user?.isAdmin && (
          <>
            <NavLink
              to="/dashboard/codeWiseBudget"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <FaMoneyCheck className="inline mr-2" />
              Code-wise Budget
            </NavLink>
            <NavLink
              to="/dashboard/addExpense"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <FaPenAlt className="inline mr-2" />
              Add Expense
            </NavLink>
            <NavLink
              to="/dashboard/messages"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            >
              <FaPenAlt className="inline mr-2" />
              Important Notices
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
};

export default DashboardSidebarContent;
