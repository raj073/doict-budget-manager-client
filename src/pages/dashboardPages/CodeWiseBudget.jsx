import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxios";

const CodeWiseBudget = () => {
  const [budgets, setBudgets] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to track the search input
  const axiosInstance = useAxiosPublic();

  // Fetch budget data from API
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await axiosInstance.get("/economicCodes");
        setBudgets(response.data);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };

    fetchBudgets();
  }, [axiosInstance]);

  // Calculate totals with proper number handling
  const grandTotalBudget = budgets.reduce(
    (sum, budget) => sum + (parseFloat(budget.totalBudget) || 0), // Ensure parsing as number
    0
  );
  const grandTotalDistributed = budgets.reduce(
    (sum, budget) => sum + (parseFloat(budget.distributedBudget) || 0), // Ensure parsing as number
    0
  );
  const grandTotalRemaining = grandTotalBudget - grandTotalDistributed;

  // Filter budgets based on search query (by economic code or code name)
  const filteredBudgets = budgets.filter(
    (budget) =>
      budget.economicCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      budget.codeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Code wise budget</h2>

      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Economic Code or Code Name"
          className="p-2 border border-gray-300 rounded w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left border">Serial</th>
              <th className="p-4 text-left border">Economic Code</th>
              <th className="p-4 text-left border">Code Name</th>
              <th className="p-4 text-left border">Total Budget</th>
              <th className="p-4 text-left border">Distributed</th>
              <th className="p-4 text-left border">Remaining</th>
            </tr>
          </thead>
          <tbody>
            {filteredBudgets.map((budget, index) => (
              <tr key={budget.economicCode} className="border-b">
                <td className="p-4 border">{index + 1}</td>
                <td className="p-4 text-red-800 border">
                  {budget.economicCode}
                </td>
                <td className="p-4 text-blue-500 border">{budget.codeName}</td>
                <td className="p-4 border">{budget.totalBudget || 0}</td>
                <td className="p-4 border">{budget.distributedBudget || 0}</td>
                <td className="p-4 border">
                  {(
                    (parseFloat(budget.totalBudget) || 0) -
                    (parseFloat(budget.distributedBudget) || 0)
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 text-red-700">
              <td colSpan="3" className="p-4 text-right font-semibold border">
                Totals:
              </td>
              <td className="p-4 font-semibold border text-red-700">
                {grandTotalBudget.toLocaleString()} BDT
              </td>
              <td className="p-4 font-semibold border text-red-700">
                {grandTotalDistributed.toLocaleString()} BDT
              </td>
              <td className="p-4 font-semibold border text-red-700">
                {grandTotalRemaining.toLocaleString()} BDT
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default CodeWiseBudget;
