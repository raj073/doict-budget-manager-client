import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { MdSpaceDashboard, MdLogout } from "react-icons/md";
import { IoMdLogIn } from "react-icons/io";
import { GiMoneyStack } from "react-icons/gi";

const DashboardNavbar = () => {
  const { user, logout } = useContext(AuthContext);

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
        <button
          onClick={logout}
          className="flex items-center text-red-500 font-semibold gap-1"
          title="Logout"
        >
          <MdLogout className="w-6 h-6" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardNavbar;
