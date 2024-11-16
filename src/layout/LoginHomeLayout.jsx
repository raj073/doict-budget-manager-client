import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

const LoginHomeLayout = () => {
  return (
    <>
      <Helmet>
        <title>Budget Manager | Home</title>
      </Helmet>
      
      <div className="lg:p-20 lg:pt-0 w-full lg:w-3/4 mx-auto min-h-screen">
        

        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default LoginHomeLayout;
