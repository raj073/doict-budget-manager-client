import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer bg-base-200 text-base-content p-10 flex justify-center">
      <div className="text-center">
        {/* Contact Info */}
        <div className="mb-6">
          <p className="text-lg font-semibold">Contact Me</p>
          <p>
            Email:{" "}
            <a href="mailto:hassansabbir0321@gmail.com" className="underline">
              hassansabbir0321@gmail.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+8801893070812" className="underline">
              +8801893070812
            </a>
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="https://github.com/devalienbrain"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={30} className="hover:text-gray-600" />
          </a>
          <a
            href="https://www.linkedin.com/in/md-sabbir-hassan-murad/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={30} className="hover:text-blue-600" />
          </a>
          <a
            href="https://www.facebook.com/md.sabbirhassanmurad"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook size={30} className="hover:text-blue-500" />
          </a>
          <a
            href="https://www.youtube.com/@devAlienBrain"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube size={30} className="hover:text-red-600" />
          </a>
          <a
            href="https://x.com/Hassan006930481"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size={30} className="hover:text-blue-400" />
          </a>
        </div>

        {/* Copyright Info */}
        <div className="mt-6">
          <p>All rights reserved &copy; Devalienbrain</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
