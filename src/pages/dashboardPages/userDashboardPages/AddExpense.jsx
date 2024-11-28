import { useContext, useEffect, useState } from "react";
import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxios";
import { AuthContext } from "../../../provider/AuthProvider";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from "react-hot-toast";
import { AuthContext } from "../../../provider/AuthProvider";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from "react-hot-toast";

const AddExpense = () => {
  const [details, setDetails] = useState(null);
  const [economicCodes, setEconomicCodes] = useState({});
  const [expenses, setExpenses] = useState({});
  const [expensedData, setExpensedData] = useState({});
  const [details, setDetails] = useState(null);
  const [economicCodes, setEconomicCodes] = useState({});
  const [expenses, setExpenses] = useState({});
  const [expensedData, setExpensedData] = useState({});
  const axiosInstance = useAxiosPublic();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUpazilaDetails = async () => {
      try {
        // Fetching upazila budget and existing expense data
        const response = await axiosInstance.get(
          `/upazilaCodewiseBudget/${user?.upazilaCode}`
        );
        setDetails(response.data);

        const econResponse = await axiosInstance.get("/economicCodes");
        const codeMapping = econResponse.data.reduce((acc, econ) => {
          acc[econ.economicCode] = econ.codeName;
          return acc;
        }, {});
        setEconomicCodes(codeMapping);

        // Fetching existing expenses
        const expenseResponse = await axiosInstance.get(
          "/upazilaBudgetExpense"
        );
        const currentExpense = expenseResponse.data.find(
          (expense) => expense.upazilaCode === user?.upazilaCode
        );
        if (currentExpense) {
          const expenseMap = currentExpense.expenseCollections.reduce(
            (acc, item) => {
              acc[item.economicCode] = item.expenseBudget;
              return acc;
            },
            {}
          );
          setExpensedData(expenseMap);
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchUpazilaDetails();
  }, [user, axiosInstance]);

  const handleExpenseChange = (code, value) => {
    const numericValue = Math.max(0, Number(value)); // Ensure the value is a number and non-negative
    const updatedExpenses = {
      ...expenses,
      [code]: numericValue,
    };

    // Validate if the expense exceeds the allocated budget
    const allocation = details.allocations.find(
      (allocation) => allocation.economicCode === code
    );
    if (allocation && numericValue > allocation.amount) {
      toast.error("Expense exceeds the allocated budget for this code.", {
        position: "top-center",
        autoClose: 5000,
      });
    }

    setExpenses(updatedExpenses);
  };

  const handleAddExpense = async () => {
    const expenseData = (details.allocations || []).map((allocation) => {
      const economicCode = allocation.economicCode;
      return {
        economicCode,
        codeName: economicCodes[economicCode] || "Unknown Code",
        allocatedBudget: allocation.amount,
        expenseBudget: expenses[economicCode] || 0,
      };
    });

    const isValid = expenseData.every(
      (item) => item.expenseBudget <= item.allocatedBudget
    );

    if (!isValid) {
      toast.error("Expense exceeds allocated budget for one or more codes.");
      return;
    }

    try {
      const payload = {
        upazilaCode: user?.upazilaCode,
        upazilaName: details?.upazilaName,
        expenseCollections: expenseData,
      };

      await axiosInstance.post("/upazilaBudgetExpense", payload);
      toast.success("Expenses added successfully!");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUpazilaDetails = async () => {
      try {
        // Fetching upazila budget and existing expense data
        const response = await axiosInstance.get(
          `/upazilaCodewiseBudget/${user?.upazilaCode}`
        );
        setDetails(response.data);

        const econResponse = await axiosInstance.get("/economicCodes");
        const codeMapping = econResponse.data.reduce((acc, econ) => {
          acc[econ.economicCode] = econ.codeName;
          return acc;
        }, {});
        setEconomicCodes(codeMapping);

        // Fetching existing expenses
        const expenseResponse = await axiosInstance.get(
          "/upazilaBudgetExpense"
        );
        const currentExpense = expenseResponse.data.find(
          (expense) => expense.upazilaCode === user?.upazilaCode
        );
        if (currentExpense) {
          const expenseMap = currentExpense.expenseCollections.reduce(
            (acc, item) => {
              acc[item.economicCode] = item.expenseBudget;
              return acc;
            },
            {}
          );
          setExpensedData(expenseMap);
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchUpazilaDetails();
  }, [user, axiosInstance]);

  const handleExpenseChange = (code, value) => {
    const numericValue = Math.max(0, Number(value)); // Ensure the value is a number and non-negative
    const updatedExpenses = {
      ...expenses,
      [code]: numericValue,
    };

    // Validate if the expense exceeds the allocated budget
    const allocation = details.allocations.find(
      (allocation) => allocation.economicCode === code
    );
    if (allocation && numericValue > allocation.amount) {
      toast.error("Expense exceeds the allocated budget for this code.", {
        position: "top-center",
        autoClose: 5000,
      });
    }

    setExpenses(updatedExpenses);
  };

  const handleAddExpense = async () => {
    const expenseData = (details.allocations || []).map((allocation) => {
      const economicCode = allocation.economicCode;
      return {
        economicCode,
        codeName: economicCodes[economicCode] || "Unknown Code",
        allocatedBudget: allocation.amount,
        expenseBudget: expenses[economicCode] || 0,
      };
    });

    const isValid = expenseData.every(
      (item) => item.expenseBudget <= item.allocatedBudget
    );

    if (!isValid) {
      toast.error("Expense exceeds allocated budget for one or more codes.");
      return;
    }

    try {
      const payload = {
        upazilaCode: user?.upazilaCode,
        upazilaName: details?.upazilaName,
        expenseCollections: expenseData,
      };

      await axiosInstance.post("/upazilaBudgetExpense", payload);
      toast.success("Expenses added successfully!");
    } catch (error) {
      console.error("Error adding expenses:", error);
      toast.error("Failed to add expenses. Please try again.");
      console.error("Error adding expenses:", error);
      toast.error("Failed to add expenses. Please try again.");
    }
  };

  if (!details)
    return (
      <div className="flex items-center justify-center h-full min-h-screen">
        <AiOutlineLoading3Quarters className="animate-spin text-teal-500 text-4xl" />
        <p className="ml-3 text-lg">Loading upazila details...</p>
      </div>
    );

  // Calculate the total expense here
  const totalExpense = Object.values(expenses).reduce(
    (acc, expense) => acc + expense,
    0
  );

  if (!details)
    return (
      <div className="flex items-center justify-center h-full min-h-screen">
        <AiOutlineLoading3Quarters className="animate-spin text-teal-500 text-4xl" />
        <p className="ml-3 text-lg">Loading upazila details...</p>
      </div>
    );

  // Calculate the total expense here
  const totalExpense = Object.values(expenses).reduce(
    (acc, expense) => acc + expense,
    0
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-5">
        <h2 className="text-3xl font-extrabold">Add Codewise Budget Expense</h2>
        <h2 className="text-3xl font-extrabold">Add Codewise Budget Expense</h2>
      </div>
      <table className="table-auto w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-teal-500 to-blue-600 text-white">
          <tr>
            <th className="p-4 text-left text-lg font-semibold">
              Economic Code
            </th>
            <th className="p-4 text-left text-lg font-semibold">Code Name</th>
            <th className="p-4 text-left text-lg font-semibold">
              Allocated Budget
            </th>
            <th className="p-4 text-left text-lg font-semibold">
              Expensed Budget
            </th>
            <th className="p-4 text-left text-lg font-semibold">
              Remaining Budget
            </th>
            <th className="p-4 text-left text-lg font-semibold">Add Expense</th>
          </tr>
        </thead>
        <tbody>
          {(details.allocations || []).map((allocation, index) => {
            const expensed = expensedData[allocation.economicCode] || 0;
            const remaining = allocation.amount - expensed;

            return (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition duration-200`}
              >
                <td className="p-4 text-md font-medium text-gray-700">
                  {allocation?.economicCode || "N/A"}
                </td>
                <td className="p-4 text-md font-medium text-gray-700">
                  {economicCodes[allocation?.economicCode] || "Unknown Code"}
                </td>

                <td className="p-4 text-md font-medium text-gray-800">
                  <span className="font-bold">
                    {allocation?.amount?.toLocaleString() || 0}
                  </span>{" "}
                </td>
                <td className="p-4 text-md font-medium text-gray-700">
                  {expensed.toLocaleString()}
                </td>
                <td className="p-4 text-md font-medium text-gray-700">
                  {remaining > 0 ? remaining.toLocaleString() : "0"}
                </td>
                <td className="p-4">
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    min="0"
                    value={expenses[allocation.economicCode] || ""}
                    onChange={(e) =>
                      handleExpenseChange(
                        allocation.economicCode,
                        e.target.value
                      )
                    }
                    disabled={remaining === 0} // Disable if remaining budget is 0
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-6">
        <h3 className="text-xl font-bold">
          Total Expense: {totalExpense.toLocaleString()} BDT
        </h3>
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          onClick={handleAddExpense}
        >
          Add Expense
        </button>
      </div>
      </div>
    </div>
  );
};

export default AddExpense;
