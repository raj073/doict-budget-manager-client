// import { useEffect, useState } from "react";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import useAxiosPublic from "../../../hooks/useAxios";

// const BudgetDetails = () => {
//   const [economicCodes, setEconomicCodes] = useState([]);
//   const [upazilaBudgets, setUpazilaBudgets] = useState([]);
//   const axiosInstance = useAxiosPublic();

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         // Fetch economic codes
//         const econResponse = await axiosInstance.get("/economicCodes");
//         setEconomicCodes(econResponse.data);

//         // Fetch upazila budget details
//         const budgetResponse = await axiosInstance.get(
//           "/upazilaCodewiseBudget"
//         );
//         setUpazilaBudgets(budgetResponse.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchDetails();
//   }, [axiosInstance]);

//   if (!economicCodes.length || !upazilaBudgets.length)
//     return (
//       <div className="flex items-center justify-center h-full min-h-screen">
//         <AiOutlineLoading3Quarters className="animate-spin text-teal-500 text-4xl" />
//         <p className="ml-3 text-lg">Loading data...</p>
//       </div>
//     );

//   const getTotal = (field) =>
//     upazilaBudgets.reduce((sum, budget) => sum + (budget[field] || 0), 0);

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <div className="mb-5">
//         <h2 className="text-4xl font-extrabold ">Codewise Budget Details</h2>
//       </div>
//       <table className="table-auto w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
//         <thead className="bg-gradient-to-r from-teal-500 to-blue-600 text-white">
//           <tr>
//             <th className="p-4 text-left text-lg font-semibold">#</th>
//             <th className="p-4 text-left text-lg font-semibold">
//               Economic Code
//             </th>
//             <th className="p-4 text-left text-lg font-semibold">Code Name</th>
//             <th className="p-4 text-left text-lg font-semibold">
//               Total Allocated Budget
//             </th>
//             <th className="p-4 text-left text-lg font-semibold">
//               Budget Expensed
//             </th>
//             <th className="p-4 text-left text-lg font-semibold">
//               Budget Demanded
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {economicCodes.map((code, index) => {
//             const budgetDetails = upazilaBudgets.find(
//               (budget) => budget.economicCode === code.economicCode
//             ) || { allocated: 0, expensed: 0, demanded: 0 };

//             return (
//               <tr
//                 key={code.economicCode}
//                 className={`${
//                   index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                 } hover:bg-gray-100 transition duration-200`}
//               >
//                 <td className="p-4 text-md font-medium text-gray-700">
//                   {index + 1}
//                 </td>
//                 <td className="p-4 text-md font-medium text-gray-700">
//                   {code.economicCode}
//                 </td>
//                 <td className="p-4 text-md font-medium text-gray-700">
//                   {code.codeName || "Unknown"}
//                 </td>
//                 <td className="p-4 text-md font-medium text-gray-800">
//                   ৳ {budgetDetails.allocated.toLocaleString() || 0}
//                 </td>
//                 <td className="p-4 text-md font-medium text-gray-800">
//                   ৳ {budgetDetails.expensed.toLocaleString() || 0}
//                 </td>
//                 <td className="p-4">
//                   ৳ {budgetDetails.demanded.toLocaleString() || 0}
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//         <tfoot>
//           <tr className="bg-gray-200 font-bold">
//             <td className="p-4 text-md font-medium text-gray-700" colSpan="3">
//               Total
//             </td>
//             <td className="p-4 text-md font-medium text-gray-800">
//               ৳ {getTotal("allocated").toLocaleString()}
//             </td>
//             <td className="p-4 text-md font-medium text-gray-800">
//               ৳ {getTotal("expensed").toLocaleString()}
//             </td>
//             <td className="p-4 text-md font-medium text-gray-800">
//               ৳ {getTotal("demanded").toLocaleString()}
//             </td>
//           </tr>
//         </tfoot>
//       </table>
//     </div>
//   );
// };

// export default BudgetDetails;

import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useAxiosPublic from "../../../hooks/useAxios";

const BudgetDetails = () => {
  const [economicCodes, setEconomicCodes] = useState([]);
  const [upazilaBudgetExpenses, setUpazilaBudgetExpenses] = useState([]);
  const [upazilaBudgetDemands, setUpazilaBudgetDemands] = useState([]);
  const axiosInstance = useAxiosPublic();

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

  const upazilaCode = "116961"; // Example upazilaCode, you can dynamically pass this if needed
  const mergedData = mergeBudgetData(upazilaCode);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-5">
        <h2 className="text-4xl font-extrabold ">Codewise Budget Details</h2>
      </div>
      <table className="table-auto w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-teal-500 to-blue-600 text-white">
          <tr>
            <th className="p-4 text-left text-lg font-semibold">#</th>
            <th className="p-4 text-left text-lg font-semibold">
              Economic Code
            </th>
            <th className="p-4 text-left text-lg font-semibold">Code Name</th>
            <th className="p-4 text-left text-lg font-semibold">
              Total Allocated Budget
            </th>
            <th className="p-4 text-left text-lg font-semibold">
              Budget Expensed
            </th>
            <th className="p-4 text-left text-lg font-semibold">
              Budget Demanded
            </th>
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
              <td className="p-4 text-md font-medium text-gray-700">
                {index + 1}
              </td>
              <td className="p-4 text-md font-medium text-gray-700">
                {budget.economicCode}
              </td>
              <td className="p-4 text-md font-medium text-gray-700">
                {budget.codeName}
              </td>
              <td className="p-4 text-md font-medium text-gray-800">
                {budget.allocatedBudget.toLocaleString()}
              </td>
              <td className="p-4 text-md font-medium text-gray-800">
                {budget.expenseBudget.toLocaleString()}
              </td>
              <td className="p-4 text-md font-medium text-gray-800">
                {budget.amountDemanded.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-200 font-bold">
            <td className="p-4 text-md font-medium text-gray-700" colSpan="3">
              Total
            </td>
            <td className="p-4 text-md font-medium text-gray-800">
              {mergedData
                .reduce((sum, item) => sum + item.allocatedBudget, 0)
                .toLocaleString()}{" "}
              BDT
            </td>
            <td className="p-4 text-md font-medium text-gray-800">
              {mergedData
                .reduce((sum, item) => sum + item.expenseBudget, 0)
                .toLocaleString()}{" "}
              BDT
            </td>
            <td className="p-4 text-md font-medium text-gray-800">
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
