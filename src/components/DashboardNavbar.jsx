import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { GiMoneyStack } from "react-icons/gi";
import { FaSignOutAlt } from "react-icons/fa";

const DashboardNavbar = () => {
  const { logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logOutUser();
    navigate("/");
  };
  return (
    <div className="navbar border-b rounded-3xl px-4 w-fullmx-auto flex items-center justify-between">
      <div className="navbar-start flex items-center space-x-2">
        <GiMoneyStack className="text-3xl text-cyan-600" />
        <Link
          to="/"
          className="text-2xl font-extrabold flex items-center"
          title="Home"
        >
          <span className="text-black">Budget</span>
          <span className="text-cyan-600 ml-1">Manager</span>
        </Link>
      </div>
      <div className="navbar-end flex items-center space-x-4">
        {/* Logout */}
        <button
          onClick={handleLogout}
          className="text-red-600 text-base hover:underline flex items-center"
        >
          <FaSignOutAlt className="inline mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardNavbar;
