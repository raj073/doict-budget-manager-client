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
    <>
      <div className="mb-3">
        <h2
          className="text-4xl font-extrabold bg-gradient-to-bl from-cyan-400 to-cyan-800 
      bg-clip-text text-transparent mb-4 text-center"
        >
          Code-wise Budget
        </h2>
        <hr className="border-cyan-400" />
      </div>
      <div className="p-12 bg-white rounded shadow-lg">
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
    </>
  );
};

export default CodeWiseBudget;
