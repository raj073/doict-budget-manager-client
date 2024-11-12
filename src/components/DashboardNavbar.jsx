import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { GiMoneyStack } from "react-icons/gi";
import { FaSignOutAlt } from "react-icons/fa";

import DoICTLogo from "/resources/doict.png";

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
        {/* <GiMoneyStack className="text-3xl text-cyan-600" /> */}
        <a
          href="https://doict.gov.bd/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={DoICTLogo} alt="DoICT Logo" className="h-20" />
        </a>

        <Link
          to="/"
          className="text-2xl font-black flex items-center"
          title="Home"
        >
          <span className="text-black font-black">Budget</span>
          <span className="text-cyan-600 ml-1 font-black">Manager</span>
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
