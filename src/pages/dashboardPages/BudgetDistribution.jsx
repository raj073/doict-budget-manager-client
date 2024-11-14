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
  const axiosInstance = useAxiosPublic();

  const fileInputRef = useRef();

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
      // Send a POST request to the backend
      const response = await axiosInstance.post("/uploadExcel", formData);
      setMessage(response.data.message);
      setError("");
    } catch (err) {
      // Handle validation and duplicate errors from the backend
      console.error("Error:", err.response);
      if (err.response?.status === 400) {
        setError(err.response?.data?.error); // Header validation error
      } else if (err.response?.status === 409) {
        setError(err.response?.data?.error); // Duplicate record error
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

  const [formData, setFormData] = useState({
    upazilaId: "",
    upazilaName: "",
  });

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const budgetResponse = await axiosInstance.get("/economicCodes");
        setBudgets(budgetResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load budget data. Please try again.");
      }
    };

    fetchBudgets();
  }, []);

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

    // Calculate total distributed budget
    const total = Object.values({
      ...distributions,
      [code]: value,
    }).reduce((sum, amount) => sum + amount, 0);
    setTotalDistributed(total);
  };

  const handleDistributeBudget = async () => {
    try {
      const distributionData = {
        upazilaId: formData.upazilaId,
        upazilaName: formData.upazilaName,
        allocations: Object.entries(distributions).map(([code, amount]) => ({
          economicCode: code,
          amount,
        })),
      };
      console.log(distributionData);
      await axiosInstance.post("/upazilaCodewiseBudget", distributionData);
      toast.success("Budgets distributed successfully!");
      setDistributions({});
      setTotalDistributed(0);
    } catch (error) {
      console.error("Error distributing budget:", error);
      toast.error("Failed to distribute budget. Please try again.");
    }
  };

  return (
    <div className="p-12 bg-white rounded shadow-lg">
      <div className="mb-5">
        <h2
          className="text-4xl font-extrabold bg-gradient-to-bl from-cyan-400 to-cyan-800 
      bg-clip-text text-transparent mb-4 text-center"
        >
          Budget Distribution
        </h2>
        <hr className="border-cyan-400" />
      </div>

      <div className="flex justify-between items-center mb-10">
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
        <button onClick={handleUpload} className="btn btn-active btn-primary">
          Distribute Budget
        </button>
      </div>
      {message && <p className="mt-4 font-bold text-lime-700">{message}</p>}
      {error && <p className="mt-4 font-bold text-orange-600">{error}</p>}

      <hr />

      <form className="mb-6 mt-10">
        <div className="mb-4">
          <label className="block text-sm font-medium">Upazila ID</label>
          <input
            type="text"
            name="upazilaId"
            value={formData.upazilaId}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Upazila Name</label>
          <input
            type="text"
            name="upazilaName"
            value={formData.upazilaName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
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

      <button
        onClick={handleDistributeBudget}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Distribute Budget
      </button>
    </div>
  );
};
export default BudgetDistribution;
