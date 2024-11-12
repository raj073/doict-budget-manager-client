import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { MdSpaceDashboard, MdLogout } from "react-icons/md";
import { IoMdLogIn } from "react-icons/io";
import { GiMoneyStack } from "react-icons/gi";
import DoICTLogo from "/resources/doict.png";


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="navbar flex items-center justify-between">
      <div className="navbar-start flex items-center space-x-2">
        {/* <GiMoneyStack className="text-3xl text-cyan-600" /> */}
        <a
          href="https://doict.gov.bd/"
          target="_blank"
          rel="noopener noreferrer"
        >

          <img src={DoICTLogo} alt="DoICT Logo" className="w-20" />
        </a>
        <Link
          to="/"
          className="text-2xl font-extrabold flex items-center"
          title="Home"
        >
        <span className="text-black font-black">Budget</span>
        <span className="text-cyan-600 ml-1 font-black">Manager</span>
      </Link>
    </div>
      <div className="navbar-end flex items-center space-x-4">
        {user ? (
          <>
            <Link
              to="/dashboard"
              className="flex items-center text-cyan-600 font-semibold gap-1"
              title="Dashboard"
            >
              <MdSpaceDashboard className="w-6 h-6" />
              <span>Dashboard</span>
            </Link>
            <button
              onClick={logout}
              className="flex items-center text-red-500 font-semibold gap-1"
              title="Logout"
              
            >
              <MdLogout className="w-6 h-6" />
               </button>
          </>
        ) : (
          <Link
            to="/login"
            className="flex items-center text-cyan-800 font-semibold gap-1"
            title="Login"
          >
            <IoMdLogIn className="w-7 h-7" />
            <span>Login</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
