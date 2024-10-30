import { FaGithub } from "react-icons/fa";
import DoICTLogo from "../../public/resources/doict.png"; // Replace with actual path to DoICT logo
import ICTDivisionLogo from "../../public/resources/ictdiv.png"; // Replace with actual path to ICT Division logo

const Footer = () => {
  return (
    <footer className="footer text-base-content flex justify-between items-center px-4 w-full lg:w-3/4 mx-auto">
      {/* Left Side - DoICT and ICT Division Logos */}
      <div className="flex justify-start items-center space-x-2">
        <a
          href="https://doict.gov.bd/"
          target="_blank"
          rel="noopener noreferrer"
        >

          <img src={DoICTLogo} alt="DoICT Logo" className="h-16" />
        </a>
        <a
          href="https://ictd.gov.bd/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={ICTDivisionLogo} alt="ICT Division Logo" className="h-16" />
        </a>
      </div>

      {/* Right Side - GitHub Icon and Developed By Text */}
      <div className="flex items-center space-x-2">
        <p>Developed by</p>

        <a
          href="https://github.com/devalienbrain"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={24} className="hover:text-gray-600" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
