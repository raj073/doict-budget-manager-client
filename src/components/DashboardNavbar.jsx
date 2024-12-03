import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import TitleLogo from "./shared/TitleLogo";
import { MdOutlineLogout } from "react-icons/md";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DashboardNavbar = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser()
      .then(() => {
        toast.success("User Signed Out Successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="py-1 flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between gap-5 border-b-2">
      <div className="flex justify-start">
        <TitleLogo />
      </div>
      <div className="flex items-center justify-start md:justify-end gap-3">
        <div className="flex items-center justify-start md:justify-end gap-1">
          {/* User Profile Info */}
          <img
            src={user?.photoUrl}
            alt="User Profile"
            className="w-9 rounded-full"
          />
          <div className="flex flex-col text-xs">
            <span>{user?.displayName}</span>
            <span className="text-cyan-600 font-bold">
              {user?.isAdmin ? "Admin" : user?.upazilaName}
            </span>
          </div>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="text-red-600 text-base hover:underline flex items-center"
          >
            <MdOutlineLogout className="inline mr-2 w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
