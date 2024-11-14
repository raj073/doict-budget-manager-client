import { useState } from "react";
import { toast } from "react-toastify";
import useAxiosPublic from "../../hooks/useAxios";

const BudgetDistribution = () => {
  const [formData, setFormData] = useState({
    upazilaId: "",
    economicCode: "",
    distributedBudget: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const axiosInstance = useAxiosPublic();
  const handleDistributeBudget = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/budgetDistribution", formData);
      toast.success("Budget distributed successfully!");
      setFormData({ upazilaId: "", economicCode: "", distributedBudget: "" });
    } catch (error) {
      console.error("Error distributing budget:", error);
      toast.error("Failed to distribute budget. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <div className="mb-5">
        <h2
          className="text-4xl font-extrabold bg-gradient-to-bl from-cyan-400 to-cyan-800 
      bg-clip-text text-transparent mb-4 text-center"
        >
          Budget Distribution
        </h2>
        <hr className="border-cyan-400" />
      </div>
      <form onSubmit={handleDistributeBudget}>
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
          <label className="block text-sm font-medium">Economic Code</label>
          <input
            type="text"
            name="economicCode"
            value={formData.economicCode}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">
            Distributed Budget
          </label>
          <input
            type="number"
            name="distributedBudget"
            value={formData.distributedBudget}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Distribute Budget
        </button>
      </form>
    </div>
  );
};

export default BudgetDistribution;
