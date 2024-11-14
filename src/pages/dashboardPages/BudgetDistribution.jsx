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
  const axiosInstance = useAxiosPublic();
  const fileInputRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const upazilasResponse = await axiosInstance.get("/upazila");
        const budgetsResponse = await axiosInstance.get("/economicCodes");
        setUpazilas(upazilasResponse.data);
        setBudgets(budgetsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data. Please try again.");
      }
    };

    fetchData();
  }, [axiosInstance]);

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

  const handleUpazilaSelect = (e) => {
    const selectedUpazila = upazilas.find(
      (upazila) => upazila.fieldOfficeCode === e.target.value
    );
    setFormData({
      upazilaId: selectedUpazila?.fieldOfficeCode || "",
      upazilaName: selectedUpazila?.upazilaOfficeName || "",
    });
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
      // Prepare the distribution data for the upazilaCodewiseBudget collection
      const distributionData = {
        upazilaId: formData.upazilaId,
        upazilaName: formData.upazilaName,
        allocations: Object.entries(distributions).map(([code, amount]) => ({
          economicCode: code,
          amount,
        })),
      };

      // Send the distribution data to update the upazilaCodewiseBudget collection
      const upazilaResponse = await axiosInstance.post(
        "/upazilaCodewiseBudget",
        distributionData
      );

      // Iterate over each economic code to update the economicCodes collection
      const economicCodeUpdates = Object.entries(distributions).map(
        async ([code, amount]) => {
          // Prepare the update data for economicCodes collection
          const economicCodeData = {
            economicCode: code,
            distributedAmount: amount,
          };

          try {
            // Update the economicCodes collection by incrementing the distributed budget
            await axiosInstance.post("/economicCodes", economicCodeData);
          } catch (error) {
            console.error(`Error updating economic code ${code}:`, error);
          }
        }
      );

      // Wait for all economic code updates to finish
      await Promise.all(economicCodeUpdates);

      // Success: notify user and reset data
      toast.success("Budgets distributed successfully!");
      setDistributions({});
      setTotalDistributed(0);

      // After successful distribution, fetch updated budgets
      const updatedBudgetsResponse = await axiosInstance.get("/economicCodes");
      console.log(updatedBudgetsResponse.data); // Log to check the updated data
      setBudgets(updatedBudgetsResponse.data);
    } catch (error) {
      console.error("Error distributing budget:", error);
      toast.error("Failed to distribute budget. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Budget Distribution</h2>

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
          <label className="block text-sm font-medium">Select Upazila</label>
          <select
            name="upazilaId"
            value={formData.upazilaId}
            onChange={handleUpazilaSelect}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Upazila</option>
            {upazilas.map((upazila) => (
              <option
                key={upazila.fieldOfficeCode}
                value={upazila.fieldOfficeCode}
              >
                {upazila.upazilaOfficeName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Upazila ID</label>
          <input
            type="text"
            name="upazilaId"
            value={formData.upazilaId}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
            disabled
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
