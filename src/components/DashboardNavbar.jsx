import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import TitleLogo from "./shared/TitleLogo";

const DashboardNavbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="py-1 flex flex-col md:flex-row items-center justify-between border-b-2">
      <TitleLogo />
      <div className="flex items-center gap-1">
        {/* User Profile Info */}
        <img
          src={user?.photoUrl}
          alt="User Profile"
          className="w-9 rounded-full"
        />
        <div className="flex flex-col text-xs">
          <span>{user?.displayName}</span>
          <span className="text-red-600">
            {user?.isAdmin ? "Admin" : user?.upazilaName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
