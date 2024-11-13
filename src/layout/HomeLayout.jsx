import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const HomeLayout = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-cyan-50 via-cyan-50 to-blue-50">
        <div className="w-full lg:w-3/4 mx-auto flex flex-col min-h-screen font-popppins ">
          <header>
            <Navbar />
          </header>
          <hr />
          <main className=" py-10">
            <Outlet />
          </main>
          <hr />
        </div>
        <footer className="shadow-xl">
          <Footer />
        </footer>
      </div>

    </>
  );
};

export default HomeLayout;
