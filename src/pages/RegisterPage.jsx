import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../hooks/useAxios";

const RegisterPage = () => {
  const { registerWithEmail } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhoneNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(null); // To store error message if registration fails
  const [searchUpazilaName, setSearchUpazilaName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [items, setItems] = useState([]);
  const [selectedUpazilaCode, setSelectedUpazilaCode] = useState("");

  const axiosInstance = useAxiosPublic();

  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const upazilasResponse = await axiosInstance.get("/upazila");
        setItems(upazilasResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data. Please try again.");
      }
    };

    fetchData();
  }, [axiosInstance]);

  // Filter items based on the search term
  const filteredItems = items.filter((item) =>
    item.upazilaOfficeName
      .toLowerCase()
      .includes(searchUpazilaName.toLowerCase())
  );

  // Handle input change and show dropdown
  const handleSearch = (event) => {
    setSearchUpazilaName(event.target.value);
    setIsOpen(true);
    setSelectedUpazilaCode("");
  };

  // Handle item selection
  const handleSelect = (item) => {
    setSelectedItem(item.upazilaOfficeName); // Set the selected item into the input
    setSearchUpazilaName(item.upazilaOfficeName); // Show selected item in the input
    setSelectedUpazilaCode(item.fieldOfficeCode);
    setIsOpen(false); // Close dropdown
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEmailRegister = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous errors

    try {
      await registerWithEmail(
        searchUpazilaName,
        selectedUpazilaCode,
        userName,
        password,
        email,
        phone
      );
      console.log("clicking");
    } catch (err) {
      setError(err.message); // Capture and display error message
      console.error(err.message);
    }
  };

  return (
    <>
      <div className="hero font-semibold">
        <div className="card w-full max-w-xl">
          <form className="card-body" onSubmit={handleEmailRegister}>
            <div className="mb-5">
              <h2
                className="text-4xl font-extrabold bg-gradient-to-bl from-cyan-400 to-cyan-800 
      bg-clip-text text-transparent mb-4 text-center"
              >
                Add New User !
              </h2>
              <hr className="border-cyan-400" />
            </div>

            {/* Display error message */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="form-control" ref={dropdownRef}>
              <label className="label">
                <span className="label-text">Upazila Name</span>
              </label>
              <input
                type="text"
                value={searchUpazilaName}
                onChange={handleSearch}
                onFocus={() => setIsOpen(true)}
                placeholder="Search User Upazila Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="off"
              />
              {/* Dropdown */}
              {isOpen && (
                <div
                  className="w-full bg-white border border-gray-200 rounded-md 
                shadow-lg max-h-60 overflow-y-auto z-10"
                  style={{ top: "30%" }}
                >
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <div
                        key={item.fieldOfficeCode}
                        onClick={() => handleSelect(item)}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        {item.upazilaOfficeName}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">
                      No results found
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Upazila Code</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                readOnly
                value={selectedUpazilaCode}
                required
                autoComplete="on"
                placeholder="Upazila Code Will Appear Here"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">User Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter User Name"
                className="input input-bordered"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                autoComplete="on"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter user password"
                  className="input input-bordered w-full pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="on"
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter user email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="on"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="tel"
                placeholder="Enter user phone number"
                className="input input-bordered"
                value={phone}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                autoComplete="on"
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-accent w-full">Add User</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
