import { useState } from "react";
import { toast } from "react-toastify";
import useAxiosPublic from "../../hooks/useAxios";

const AddExpense = () => {
  const [formData, setFormData] = useState({
    economicCode: "",
    expenseAmount: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const axiosInstance = useAxiosPublic();
  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/expenses", formData);
      toast.success("Expense added successfully!");
      setFormData({ economicCode: "", expenseAmount: "" });
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Failed to add expense. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <div className="mb-5">
        <h2
          className="text-4xl font-extrabold bg-gradient-to-bl from-cyan-400 to-cyan-800 
      bg-clip-text text-transparent mb-4 text-center"
        >
          Add Expense
        </h2>
        <hr className="border-cyan-400" />
      </div>
      <form onSubmit={handleExpenseSubmit}>
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
          <label className="block text-sm font-medium">Expense Amount</label>
          <input
            type="number"
            name="expenseAmount"
            value={formData.expenseAmount}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
