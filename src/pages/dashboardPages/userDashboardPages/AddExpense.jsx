// import { useState } from "react";
// import { toast } from "react-toastify";
// import useAxiosPublic from "../../../hooks/useAxios";

// const AddExpense = () => {
//   const [formData, setFormData] = useState({
//     economicCode: "",
//     expenseAmount: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };
//   const axiosInstance = useAxiosPublic();
//   const handleExpenseSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axiosInstance.post("/expenses", formData);
//       toast.success("Expense added successfully!");
//       setFormData({ economicCode: "", expenseAmount: "" });
//     } catch (error) {
//       console.error("Error adding expense:", error);
//       toast.error("Failed to add expense. Please try again.");
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded shadow-md">
//       <div className="mb-5">
//         <h2
//           className="text-4xl font-extrabold bg-gradient-to-bl from-cyan-400 to-cyan-800
//       bg-clip-text text-transparent mb-4 text-center"
//         >
//           Add Expense
//         </h2>
//         <hr className="border-cyan-400" />
//       </div>
//       <form onSubmit={handleExpenseSubmit}>
//         <div className="mb-4">
//           <label className="block text-sm font-medium">Economic Code</label>
//           <input
//             type="text"
//             name="economicCode"
//             value={formData.economicCode}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium">Expense Amount</label>
//           <input
//             type="number"
//             name="expenseAmount"
//             value={formData.expenseAmount}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//           Add Expense
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddExpense;

import { useEffect, useState, useContext } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useAxiosPublic from "../../../hooks/useAxios";
import { AuthContext } from "../../../provider/AuthProvider";

const AddExpense = () => {
  const [details, setDetails] = useState(null);
  const [economicCodes, setEconomicCodes] = useState({});
  const axiosInstance = useAxiosPublic();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUpazilaDetails = async () => {
      try {
        // Fetch upazila budget details
        const response = await axiosInstance.get(
          `/upazilaCodewiseBudget/${user?.upazilaCode}`
        );
        setDetails(response.data);

        // Fetch economic codes and create a mapping
        const econResponse = await axiosInstance.get("/economicCodes");
        const codeMapping = econResponse.data.reduce((acc, econ) => {
          acc[econ.economicCode] = econ.codeName;
          return acc;
        }, {});
        setEconomicCodes(codeMapping);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchUpazilaDetails();
  }, [user, axiosInstance]);

  if (!details)
    return (
      <div className="flex items-center justify-center h-full min-h-screen">
        <AiOutlineLoading3Quarters className="animate-spin text-teal-500 text-4xl" />
        <p className="ml-3 text-lg">Loading upazila details...</p>
      </div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-5">
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
              Expense Budget
            </th>
          </tr>
        </thead>
        <tbody>
          {(details.allocations || []).map((allocation, index) => (
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
                  {" "}
                  {allocation?.amount?.toLocaleString() || 0}
                </span>{" "}
                BDT
              </td>
              <td className="p-4">
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  min="0"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddExpense;
