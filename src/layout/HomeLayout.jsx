import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const HomeLayout = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Fixed Navbar at the top */}
      <header className="flex-shrink-0">
        <Navbar />
      </header>

      {/* Scrollable main content */}
      <main className="flex-grow overflow-y-auto p-4 lg:p-20 lg:pt-4 w-full lg:w-3/4 mx-auto">
        <Outlet />
      </main>

      {/* Fixed Footer at the bottom */}
      <footer className="flex-shrink-0 bg-base-200 shadow-xl">
        <Footer />
      </footer>
    </div>
  );
};

export default HomeLayout;
