import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="footer text-gray-700 border-t py-6 px-4 w-full lg:w-3/4 mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        {/* Left Section - Logo and Important Link */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full lg:w-auto text-left lg:text-center">
          <div>
            <p className="text-sm font-medium">Important Links</p>
            <a
              href="https://ictd.gov.bd/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-xs flex justify-start items-center"
            >
              ICT Division
            </a>
          </div>
        </div>

        {/* Middle Section - Developed By */}
        <div className="w-full lg:w-auto text-left lg:text-center">
          <p className="text-sm font-medium">Developed by:</p>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 justify-center items-start sm:items-center lg:justify-center">
            <a
              href="https://github.com/devalienbrain"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-gray-600 hover:text-black transition-colors duration-200"
            >
              <FaGithub size={18} />
              <span className="text-xs">Md. Sabbir Hassan</span>
            </a>
            <a
              href="https://github.com/raj073"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-gray-600 hover:text-black transition-colors duration-200"
            >
              <FaGithub size={18} />
              <span className="text-xs">Rajani kanta Das</span>
            </a>
          </div>
        </div>

        {/* Right Section - Contact and Rights */}
        <div className="text-left lg:text-right w-full lg:w-auto">
          <p className="text-xs font-medium">Contact Address:</p>
          <p className="text-xs">ICT Tower, Agargaon, Dhaka-1207</p>
        </div>
      </footer>
      <div className="text-xs text-gray-700 py-2 px-4 w-full lg:w-3/4 mx-auto text-center">
        &copy; {new Date().getFullYear()} Department of ICT. All rights
        reserved.
      </div>
    </>
  );
};

export default Footer;
