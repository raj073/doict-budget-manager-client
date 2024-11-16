import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Helmet } from "react-helmet-async";

import TitleLogo from "../components/shared/TitleLogo";

const LoginPage = () => {
  const { loginWithEmail } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

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

  return (
    <>
      <Helmet>
        <title>Budget Manager | Login</title>
      </Helmet>
      <div className="flex items-center justify-center min-h-screen font-sans p-2">
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
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              <Link to="#" className="text-sm text-blue-500 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-150">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
