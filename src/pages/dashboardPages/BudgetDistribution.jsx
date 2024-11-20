import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import useAxiosPublic from "../../hooks/useAxios";

const BudgetDistribution = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [budgets, setBudgets] = useState([]);
  const [distributions, setDistributions] = useState({});
  const [totalDistributed, setTotalDistributed] = useState(0);
  const [upazilas, setUpazilas] = useState([]);
  const [formData, setFormData] = useState({
    upazilaId: "",
    upazilaName: "",
  });

  const [searchUpazilaName, setSearchUpazilaName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [items, setItems] = useState([]);
  const [selectedUpazilaCode, setSelectedUpazilaCode] = useState("");

  const axiosInstance = useAxiosPublic();
  const fileInputRef = useRef();
  const dropdownRef = useRef(null);

  console.log(searchUpazilaName, selectedUpazilaCode);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const upazilasResponse = await axiosInstance.get("/upazila");
        const budgetsResponse = await axiosInstance.get("/economicCodes");
        setItems(upazilasResponse.data);
        setBudgets(budgetsResponse.data);
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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      setMessage("");
      setError("");
    } else {
      setMessage("Please Select a Valid CSV File");
      setFile(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please Select a Valid CSV File");
      return;
    }

    const formData = new FormData();
    formData.append("csvFile", file);

    try {
      const response = await axiosInstance.post("/uploadExcel", formData);
      setMessage(response.data.message);
      setError("");
      // After successful upload, fetch updated budgets
      const updatedBudgetsResponse = await axiosInstance.get("/economicCodes");
      setBudgets(updatedBudgetsResponse.data); // Update budget list with distributed amounts
    } catch (err) {
      console.error("Error:", err.response);
      if (err.response?.status === 400 || err.response?.status === 409) {
        setError(err.response?.data?.error);
      } else {
        setError("Upload Failed. Please Try Again.");
      }
      setMessage("");
    }
  };

  const handleDelete = () => {
    setFile(null);
    setMessage("");
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the input field
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBudgetChange = (e, code) => {
    const value = parseFloat(e.target.value) || 0;
    setDistributions((prev) => ({
      ...prev,
      [code]: value,
    }));

    const total = Object.values({
      ...distributions,
      [code]: value,
    }).reduce((sum, amount) => sum + amount, 0);
    setTotalDistributed(total);
  };

  const handleDistributeBudget = async () => {
    try {
      const distributionData = {
        upazilaId: selectedUpazilaCode,
        upazilaName: searchUpazilaName,
        allocations: Object.entries(distributions).map(([code, amount]) => ({
          economicCode: code,
          amount,
        })),
      };
      console.log(distributionData);
      const response = await axiosInstance.post(
        "/upazilaCodewiseBudget",
        distributionData
      );

      toast.success(response.data.message);
      setDistributions({});
      setTotalDistributed(0);

      // Refresh budget data
      const updatedBudgetsResponse = await axiosInstance.get("/economicCodes");
      setBudgets(updatedBudgetsResponse.data);
    } catch (error) {
      console.error("Error distributing budget:", error);
      toast.error("Failed to distribute budget. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Budget Distribution</h2>
      <div className="text-cyan-700 font-bold mb-4">
        Upload budget distribution excel file
      </div>
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-1">
          <input
            type="file"
            onChange={handleFileChange}
            accept=".csv"
            ref={fileInputRef}
            className="file-input file-input-bordered file-input-primary w-full max-w-md"
          />
          <button onClick={handleDelete} className="btn btn-error text-white">
            Delete
          </button>
        </div>
        <button onClick={handleUpload} className="btn btn-active btn-primary">
          Distribute Budget
        </button>
      </div>
      {message && <p className="mt-4 font-bold text-lime-700">{message}</p>}
      {error && <p className="mt-4 font-bold text-orange-600">{error}</p>}

      <div className="divider">OR</div>
      <div className="text-cyan-700 font-bold my-4">
        Input budget distibution manually
      </div>
      <form className="mb-6 mt-10">
        <div className="mb-4" ref={dropdownRef}>
          <label className="block text-sm font-medium">Select Upazila</label>
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
                <div className="px-4 py-2 text-gray-500">No results found</div>
              )}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Upazila ID</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
            value={selectedUpazilaCode}
            required
            autoComplete="on"
            placeholder="Upazila Code Will Appear Here"
          />
        </div>
      </form>

      <div className="overflow-x-auto mb-4">
        <table className="table w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Serial</th>
              <th className="p-4 text-left">Economic Code</th>
              <th className="p-4 text-left">Code Name</th>
              <th className="p-4 text-left">Budget to Distribute</th>
              <th className="p-4 text-left">Available Budget</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((budget, index) => (
              <tr key={budget.economicCode}>
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{budget.economicCode}</td>
                <td className="p-4">{budget.codeName}</td>
                <td className="p-4">
                  <input
                    type="number"
                    value={distributions[budget.economicCode] || ""}
                    onChange={(e) => handleBudgetChange(e, budget.economicCode)}
                    className="w-full p-2 border rounded"
                    min="0"
                  />
                </td>
                <td className="p-4">
                  {budget.totalBudget - budget.distributedBudget}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-right font-bold mb-4">
        Total Budget To Distribute: {totalDistributed}
      </div>

      <button onClick={handleDistributeBudget} className="btn btn-accent">
        Distribute Budget
      </button>
    </div>
  );
};

export default BudgetDistribution;
