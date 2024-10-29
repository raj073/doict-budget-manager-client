import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const HomeLayout = () => {
  return (
    <>
      <div className="p-4 lg:p-20 lg:pt-0 w-full lg:w-3/4 mx-auto min-h-screen">
        <div className="py-4">
          <Navbar />
        </div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default HomeLayout;
