import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { MdSpaceDashboard } from "react-icons/md";
import { IoMdLogIn } from "react-icons/io";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar border-b bg-gray-800 text-white rounded-3xl">
      <div className="navbar-start">
        <Link
          to="/"
          className="btn btn-ghost text-2xl font-extrabold"
          title="Home"
        >
          Budget Manager
        </Link>
      </div>
      <div className="navbar-end">
        {user ? (
          <Link
            to="/dashboard"
            title="Dashboard"
            className="tooltip tooltip-bottom"
            data-tip="Dashboard"
          >
            <MdSpaceDashboard className="w-6 h-6" />
          </Link>
        ) : (
          <Link
            to="/login"
            className="font-semibold flex items-center gap-2"
            title="Login"
          >
            Login <IoMdLogIn />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
