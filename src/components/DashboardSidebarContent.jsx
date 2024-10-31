
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import {
  FaUser,
  FaUsers,
  FaEnvelope,
  FaSignOutAlt,
  FaPenAlt,
  FaMoneyCheck,
  FaPlusSquare,
  FaList,
} from "react-icons/fa";

const DashboardSidebarContent = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser();
    navigate("/");
  };

  return (
    <div className="p-4">
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
          </>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="text-red-600 text-sm hover:underline flex items-center"
        >
          <FaSignOutAlt className="inline mr-2" />
          Logout
        </button>
      </nav>
    </div>
  );
};

export default DashboardSidebarContent;
