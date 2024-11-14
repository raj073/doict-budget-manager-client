import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { GiMoneyStack } from "react-icons/gi";
import { FaSignOutAlt } from "react-icons/fa";

import DoICTLogo from "/resources/doict.png";
import { MdLogout } from "react-icons/md";

const DashboardNavbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="py-1 flex items-center justify-between border-b-2">
      <div className="flex justify-start items-center ">
        <a
          href="https://doict.gov.bd/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={DoICTLogo} alt="DoICT Logo" className="h-16" />
        </a>

        <Link
          to="/"
          className="text-xl font-black flex justify-start items-left gap-1"
          title="Home"
        >
          <span className="text-black font-black">Budget</span>
          <span className="text-cyan-600 font-black">Management</span>
        </Link>
      </div>
      <div className="flex items-center gap-1">
        {/* User Profile Info */}
        <img
          src={user?.photoUrl}
          alt="User Profile"
          className="w-9 rounded-full"
        />
        <span>{user?.displayName}</span>
      </div>
    </div>
  );
};

export default DashboardNavbar;
