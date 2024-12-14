import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";

import TitleLogo from "../components/shared/TitleLogo";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "../../public/firebase/firebase.config";

const LoginPage = () => {
  const { loginWithEmail } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const [isPasswordResetModalOpen, setIsPasswordResetModalOpen] =
    useState(false);
  const [passwordResetEmail, setpasswordResetEmail] = useState("");

  //email format using regex
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  console.log(passwordResetEmail);
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await loginWithEmail(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error(err.message);
    }
  };

  const handlePasswordResetModal = () => {
    setIsPasswordResetModalOpen(true);
  };

  const handlePasswordReset = async () => {
    if (!passwordResetEmail.trim()) {
      // Check for blank email
      toast.error("Please Enter an Email Address.", {
        duration: 4000,
        position: "top-center",
        style: {
          border: "1px solid red",
          padding: "10px",
          color: "red",
        },
      });
      return;
    }

    //Check Email Format
    if (!isValidEmail(passwordResetEmail)) {
      toast.error("Please Enter a Valid Email Address.", {
        duration: 4000,
        position: "top-center",
        style: {
          border: "1px solid red",
          padding: "10px",
          color: "red",
        },
      });
      return;
    }

    const auth = getAuth(app);
    try {
      await sendPasswordResetEmail(auth, passwordResetEmail);
      toast.success("Password Reset Email Sent. Please Check Your Inbox.", {
        duration: 4000,
        position: "top-center",
        style: {
          border: "1px solid lime",
          padding: "10px",
          color: "green",
        },
      });
      setpasswordResetEmail("");
    } catch (error) {
      toast.error(error.message, {
        duration: 4000,
        position: "top-center",
        style: {
          border: "1px solid red",
          padding: "10px",
          color: "red",
        },
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen font-sans p-2 shadow-lg rounded-lg">
        <div className="w-full max-w-xl">
          <div className="mb-6">
            <div className="flex justify-start items-center">
              <TitleLogo />
            </div>
            <div className="pt-9 pb-1 ">
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                Budget Distribution Management System
              </h1>
              <p className="text-gray-500 text-sm font-medium">
                For Officials of the Department of ICT
              </p>
              <hr className="mt-2 border-gray-300" />
            </div>
          </div>
          <form onSubmit={handleEmailLogin} className="space-y-4">
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="mt-1 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="mt-1 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer mt-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              <Link
                onClick={handlePasswordResetModal}
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-150">
              Login
            </button>
          </form>

          {/* Password Reset Modal */}
          {isPasswordResetModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h3 className="text-xl font-bold mb-4">Password Reset Email</h3>
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Enter Your Email:
                    </label>
                    <input
                      type="email"
                      placeholder="Enter Your Email"
                      className="w-full p-2 border rounded focus:outline-blue-500"
                      value={passwordResetEmail}
                      onChange={(e) => setpasswordResetEmail(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handlePasswordReset}
                      type="button"
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Send Reset Email
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsPasswordResetModalOpen(false)}
                      className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
