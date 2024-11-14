
import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxios";

const CodeWiseBudget = () => {
  const [budgets, setBudgets] = useState([]);
  const [distributions, setDistributions] = useState({});
  const axiosInstance = useAxiosPublic();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const budgetsResponse = await axiosInstance.get("/economicCodes");
        setBudgets(budgetsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [axiosInstance, distributions]);

  return (
    <div className="p-6">
      {/* Modal */}
      {modal.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800 z-50">
          <div className="relative w-11/12 max-w-md p-6 bg-white rounded-2xl shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
            >
              &times;
            </button>
            <p
              className={`text-center text-lg font-semibold ${
                modal.type === "success" ? "text-lime-700" : "text-red-700"
              }`}
            >
              {modal.message}
            </p>
          </div>
        </div>
      )}

      <div className="mb-5">
        <h2
          className="text-4xl font-extrabold bg-gradient-to-bl from-cyan-400 to-cyan-800 
      bg-clip-text text-transparent mb-4 text-center"
        >
          Code-wise Budget
        </h2>
        <hr className="border-cyan-400" />
      </div>
    <div className="p-12 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Code Wise Budget</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Serial</th>
              <th className="p-4 text-left">Economic Code</th>
              <th className="p-4 text-left">Code Name</th>
              <th className="p-4 text-left">Distributed Budget</th>
              <th className="p-4 text-left">Remaining Budget</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((budget, index) => (
              <tr key={budget.economicCode}>
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{budget.economicCode}</td>
                <td className="p-4">{budget.codeName}</td>
                <td className="p-4">{budget.distributedBudget}</td>
                <td className="p-4">
                  {budget.totalBudget - budget.distributedBudget}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CodeWiseBudget;
