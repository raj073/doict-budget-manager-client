import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const LoginHomeLayout = () => {
  return (
    <>
      <div className="lg:p-20 lg:pt-0 w-full lg:w-3/4 mx-auto min-h-screen">
        

        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default LoginHomeLayout;
