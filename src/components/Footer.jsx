import { FaGithub } from "react-icons/fa";
import ICTDivisionLogo from "../../public/resources/ictdiv.png"; // Replace with actual path to ICT Division logo
import "../../src/index.css";  
const Footer = () => {
  return (
    <footer className="noto-sans-bengali footer text-base-content flex justify-between items-center px-4 w-full lg:w-3/4 mx-auto">
      {/* Left Side - DoICT and ICT Division Logos */}
      <div className="flex justify-start items-center space-x-2">
        <a
          href="https://ictd.gov.bd/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={ICTDivisionLogo} alt="ICT Division Logo" className="h-20" />
        </a>
      </div>

      {/* Right Side - GitHub Icon and Developed By Text */}
      <div className="flex items-center space-x-2">
        <p>তৈরি করেছেন</p>

        <a
          href="https://github.com/devalienbrain"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={24} className="hover:text-gray-600" />
        </a>
        <a
          href="https://github.com/raj073"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-black"
        >
          <FaGithub size={24} className="hover:text-gray-600" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
