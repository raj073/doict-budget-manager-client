import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import TitleLogo from "./shared/TitleLogo";

const DashboardNavbar = () => {
  const { user } = useContext(AuthContext);
  console.log({ user });
  return (
    <div className="py-1 flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between gap-5 border-b-2">
      <div className="flex justify-start">
        <TitleLogo />
      </div>
      <div className="flex items-center justify-start md:justify-end gap-1">
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
