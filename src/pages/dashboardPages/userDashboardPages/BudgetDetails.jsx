import { useContext, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useAxiosPublic from "../../../hooks/useAxios";
import { AuthContext } from "../../../provider/AuthProvider";

const BudgetDetails = () => {
  const [economicCodes, setEconomicCodes] = useState([]);
  const [upazilaBudgetExpenses, setUpazilaBudgetExpenses] = useState([]);
  const [upazilaBudgetDemands, setUpazilaBudgetDemands] = useState([]);
  const axiosInstance = useAxiosPublic();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch economic codes
        const econResponse = await axiosInstance.get("/economicCodes");
        setEconomicCodes(econResponse.data);

        // Fetch upazila budget expenses
        const expenseResponse = await axiosInstance.get(
          "/upazilaBudgetExpense"
        );
        setUpazilaBudgetExpenses(expenseResponse.data);

        // Fetch upazila budget demands
        const demandResponse = await axiosInstance.get("/upazilaBudgetDemand");
        setUpazilaBudgetDemands(demandResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDetails();
  }, [axiosInstance]);

  if (
    !economicCodes.length ||
    !upazilaBudgetExpenses.length ||
    !upazilaBudgetDemands.length
  )
    return (
      <div className="flex items-center justify-center h-full min-h-screen">
        <AiOutlineLoading3Quarters className="animate-spin text-teal-500 text-4xl" />
        <p className="ml-3 text-lg">Loading data...</p>
      </div>
    );

  // Merging the expense and demand data based on economicCode
  const mergeBudgetData = (upazilaCode) => {
    const expenseData = upazilaBudgetExpenses.find(
      (item) => item.upazilaCode === upazilaCode
    );
    const demandData = upazilaBudgetDemands.find(
      (item) => item.upazilaCode === upazilaCode
    );

    if (!expenseData || !demandData) return [];

    return economicCodes.map((code) => {
      const expense = expenseData.expenseCollections.find(
        (e) => e.economicCode === code.economicCode
      ) || { expenseBudget: 0 };
      const demand = demandData.demandCollections.find(
        (d) => d.economicCode === code.economicCode
      ) || { amountDemanded: 0 };

      return {
        economicCode: code.economicCode,
        codeName: code.codeName,
        allocatedBudget: expense.allocatedBudget || 0,
        expenseBudget: expense.expenseBudget || 0,
        amountDemanded: demand.amountDemanded || 0,
      };
    });
  };

  const upazilaCode = user?.upazilaCode;
  const mergedData = mergeBudgetData(upazilaCode);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-5">
        <h2 className="text-4xl font-extrabold ">Codewise Budget Details</h2>
      </div>
      <table className="table-auto w-full border overflow-hidden">
        <thead>
          <tr>
            <th className="py-4 text-left text-md font-medium text-gray-600">#</th>
            <th className="py-4 text-left text-md font-medium text-gray-600">
              Economic Code
            </th>
            <th className="py-4 text-left text-md font-medium text-gray-600">
              Code Name
            </th>
            <th className="py-4 text-left text-md font-medium text-gray-600">
              Allocated
            </th>
            <th className="py-4 text-left text-md font-medium text-gray-600">Expensed</th>
            <th className="py-4 text-left text-md font-medium text-gray-600">Demanded</th>
          </tr>
        </thead>
        <tbody>
          {mergedData.map((budget, index) => (
            <tr
              key={budget.economicCode}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100 transition duration-200`}
            >
              <td>{index + 1}</td>
              <td>{budget.economicCode}</td>
              <td>{budget.codeName}</td>
              <td>{budget.allocatedBudget.toLocaleString()}</td>
              <td>{budget.expenseBudget.toLocaleString()}</td>
              <td>{budget.amountDemanded.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="py-4 text-md font-medium text-gray-700" colSpan="3">
              Total
            </td>
            <td className="py-4 text-md font-medium text-gray-800">
              {mergedData
                .reduce((sum, item) => sum + item.allocatedBudget, 0)
                .toLocaleString()}{" "}
              BDT
            </td>
            <td className="py-4 text-md font-medium text-gray-800">
              {mergedData
                .reduce((sum, item) => sum + item.expenseBudget, 0)
                .toLocaleString()}{" "}
              BDT
            </td>
            <td className="py-4 text-md font-medium text-gray-800">
              {mergedData
                .reduce((sum, item) => sum + item.amountDemanded, 0)
                .toLocaleString()}{" "}
              BDT
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default BudgetDetails;
