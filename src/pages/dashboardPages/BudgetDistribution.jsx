// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import useAxiosPublic from "../../hooks/useAxios";

// const BudgetDistribution = () => {
//   const [formData, setFormData] = useState({
//     upazilaId: "",
//     economicCode: "",
//     distributedBudget: "",
//   });
//   const [budgets, setBudgets] = useState([]);
//   const [distributions, setDistributions] = useState([]);
//   const axiosInstance = useAxiosPublic();

//   useEffect(() => {
//     const fetchBudgetsAndDistributions = async () => {
//       try {
//         // Fetch budgets
//         const budgetResponse = await axiosInstance.get("/economicCodes");
//         setBudgets(budgetResponse.data);

//         // Fetch budget distributions
//         const distributionResponse = await axiosInstance.get("/budgetDistributions");
//         setDistributions(distributionResponse.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         toast.error("Failed to load data. Please try again.");
//       }
//     };

//     fetchBudgetsAndDistributions();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleDistributeBudget = async (e) => {
//     e.preventDefault();
//     try {
//       await axiosInstance.post("/budgetDistribution", formData);
//       toast.success("Budget distributed successfully!");
//       setFormData({ upazilaId: "", economicCode: "", distributedBudget: "" });
//       // Refresh the distributions data after submission
//       const distributionResponse = await axiosInstance.get("/budgetDistributions");
//       setDistributions(distributionResponse.data);
//     } catch (error) {
//       console.error("Error distributing budget:", error);
//       toast.error("Failed to distribute budget. Please try again.");
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded shadow-md">
//       <h2 className="text-3xl font-bold mb-4 text-center">Budget Distribution</h2>
//       <form onSubmit={handleDistributeBudget} className="mb-6">
//         <div className="mb-4">
//           <label className="block text-sm font-medium">Upazila ID</label>
//           <input
//             type="text"
//             name="upazilaId"
//             value={formData.upazilaId}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
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
//           <label className="block text-sm font-medium">Distributed Budget</label>
//           <input
//             type="number"
//             name="distributedBudget"
//             value={formData.distributedBudget}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//           Distribute Budget
//         </button>
//       </form>

//       <div className="overflow-x-auto">
//         <table className="table w-full border border-gray-300">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-4 text-left text-lg">Serial</th>
//               <th className="p-4 text-left text-lg">Economic Code</th>
//               <th className="p-4 text-left text-lg">Code Name</th>
//               <th className="p-4 text-left text-lg">Total Budget</th>
//               <th className="p-4 text-left text-lg">Distributed Budget</th>
//               <th className="p-4 text-left text-lg">Remaining Budget</th>
//             </tr>
//           </thead>
//           <tbody>
//             {budgets.map((budget, index) => {
//               const distributed = distributions.find(
//                 (dist) => dist.economicCode === budget.economicCode
//               );
//               const distributedAmount = distributed ? distributed.amount : 0;
//               const remainingBudget = budget.totalBudget - distributedAmount;

//               return (
//                 <tr key={index}>
//                   <td className="p-4">{index + 1}</td>
//                   <td className="p-4">{budget.economicCode}</td>
//                   <td className="p-4">{budget.codeName}</td>
//                   <td className="p-4">{budget.totalBudget}</td>
//                   <td className="p-4">{distributedAmount}</td>
//                   <td className="p-4">{remainingBudget}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default BudgetDistribution;

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosPublic from "../../hooks/useAxios";

const BudgetDistribution = () => {
  const [formData, setFormData] = useState({
    upazilaId: "",
    economicCode: "",
    distributedBudget: "",
  });
  const [budgets, setBudgets] = useState([]);
  const [distributions, setDistributions] = useState({});
  const [totalDistributed, setTotalDistributed] = useState(0);
  const axiosInstance = useAxiosPublic();

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const budgetResponse = await axiosInstance.get("/economicCodes");
        setBudgets(budgetResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load budget data. Please try again.");
      }
    };

    fetchBudgets();
  }, []);

  const handleInputChange = (e, code) => {
    const value = parseFloat(e.target.value) || 0;
    setDistributions((prev) => ({
      ...prev,
      [code]: value,
    }));

    // Calculate total distributed budget
    const total = Object.values({
      ...distributions,
      [code]: value,
    }).reduce((sum, amount) => sum + amount, 0);
    setTotalDistributed(total);
  };

  const handleDistributeBudget = async () => {
    try {
      const distributionData = Object.entries(distributions).map(
        ([code, amount]) => ({
          economicCode: code,
          distributedBudget: amount,
        })
      );

      await axiosInstance.post("/budgetDistribution", distributionData);
      toast.success("Budgets distributed successfully!");
      setDistributions({});
      setTotalDistributed(0);
    } catch (error) {
      console.error("Error distributing budget:", error);
      toast.error("Failed to distribute budget. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-center">
        Budget Distribution
      </h2>
      <form onSubmit={handleDistributeBudget} className="mb-6">
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
          <label className="block text-sm font-medium">Upazila Name</label>
          <input
            type="text"
            name="upazilaName"
            value={formData.upazilaName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
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
                    onChange={(e) => handleInputChange(e, budget.economicCode)}
                    className="w-full p-2 border rounded"
                    min="0"
                  />
                </td>
                <td className="p-4">
                  {" "}
                  {budget?.totalBudget - budget?.distributedBudget}
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-right font-bold mb-4">
        Total Budget To Distribute: {totalDistributed}
      </div>

      <button
        onClick={handleDistributeBudget}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Distribute Budget
      </button>
    </div>
  );
};

export default BudgetDistribution;
