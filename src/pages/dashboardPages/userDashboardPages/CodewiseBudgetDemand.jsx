// import { useEffect, useState } from "react";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import useAxiosPublic from "../../../hooks/useAxios";

// const CodewiseBudgetDemand = () => {
//   const [economicCodes, setEconomicCodes] = useState([]);
//   const axiosInstance = useAxiosPublic();

//   useEffect(() => {
//     const fetchEconomicCodes = async () => {
//       try {
//         const econResponse = await axiosInstance.get("/economicCodes");
//         setEconomicCodes(econResponse.data);
//       } catch (error) {
//         console.error("Error fetching economic codes:", error);
//       }
//     };

//     fetchEconomicCodes();
//   }, [axiosInstance]);

//   if (!economicCodes.length)
//     return (
//       <div className="flex items-center justify-center h-full min-h-screen">
//         <AiOutlineLoading3Quarters className="animate-spin text-teal-500 text-4xl" />
//         <p className="ml-3 text-lg">Loading economic codes...</p>
//       </div>
//     );

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <div className="mb-5">
//         <h2 className="text-4xl font-extrabold">Codewise Budget Demand</h2>
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
//               Budget Demand
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {economicCodes.map((code, index) => (
//             <tr
//               key={code._id}
//               className={`${
//                 index % 2 === 0 ? "bg-white" : "bg-gray-50"
//               } hover:bg-gray-100 transition duration-200`}
//             >
//               <td className="p-4 text-md font-medium text-gray-700">
//                 {index + 1}
//               </td>
//               <td className="p-4 text-md font-medium text-gray-700">
//                 {code.economicCode || "N/A"}
//               </td>
//               <td className="p-4 text-md font-medium text-gray-700">
//                 {code.codeName || "N/A"}
//               </td>
//               <td className="p-4">
//                 <input
//                   type="number"
//                   placeholder="Enter demand"
//                   className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   min="0"
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CodewiseBudgetDemand;

import { useEffect, useState, useContext } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useAxiosPublic from "../../../hooks/useAxios";
import { AuthContext } from "../../../provider/AuthProvider";

const CodewiseBudgetDemand = () => {
  const [economicCodes, setEconomicCodes] = useState([]);
  const [demandData, setDemandData] = useState({});
  const axiosInstance = useAxiosPublic();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchEconomicCodes = async () => {
      try {
        const econResponse = await axiosInstance.get("/economicCodes");
        setEconomicCodes(econResponse.data);

        // Initialize demand data with default values
        const initialDemand = econResponse.data.reduce((acc, code) => {
          acc[code.economicCode] = 0;
          return acc;
        }, {});
        setDemandData(initialDemand);
      } catch (error) {
        console.error("Error fetching economic codes:", error);
      }
    };

    fetchEconomicCodes();
  }, [axiosInstance]);

  // Calculate total demand
  const totalDemand = Object.values(demandData).reduce(
    (sum, amount) => sum + amount,
    0
  );

  // Handle demand input change
  const handleInputChange = (economicCode, value) => {
    setDemandData((prevData) => ({
      ...prevData,
      [economicCode]: Math.max(0, value), // Ensure non-negative values
    }));
  };

  // Submit demand data
  const handleSubmit = async () => {
    const demandPayload = {
      upazilaCode: user?.upazilaCode,
      upazilaName: user?.upazilaName,
      demandCollections: economicCodes.map((code) => ({
        economicCode: code.economicCode,
        codeName: code.codeName,
        amountDemanded: demandData[code.economicCode] || 0,
      })),
    };

    try {
      const response = await axiosInstance.post(
        "/upazilaBudgetDemand",
        demandPayload
      );
      console.log("Demand submitted successfully:", response.data);
      alert("Demand data submitted successfully!");
    } catch (error) {
      console.error("Error submitting demand:", error);
      alert("Failed to submit demand.");
    }
  };

  if (!economicCodes.length)
    return (
      <div className="flex items-center justify-center h-full min-h-screen">
        <AiOutlineLoading3Quarters className="animate-spin text-teal-500 text-4xl" />
        <p className="ml-3 text-lg">Loading economic codes...</p>
      </div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-5">
        <h2 className="text-4xl font-extrabold">Codewise Budget Demand</h2>
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
              Budget Demand
            </th>
          </tr>
        </thead>
        <tbody>
          {economicCodes.map((code, index) => (
            <tr
              key={code._id}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100 transition duration-200`}
            >
              <td className="p-4 text-md font-medium text-gray-700">
                {index + 1}
              </td>
              <td className="p-4 text-md font-medium text-gray-700">
                {code.economicCode || "N/A"}
              </td>
              <td className="p-4 text-md font-medium text-gray-700">
                {code.codeName || "N/A"}
              </td>
              <td className="p-4">
                <input
                  type="number"
                  placeholder="Enter demand"
                  value={demandData[code.economicCode] || 0}
                  onChange={(e) =>
                    handleInputChange(
                      code.economicCode,
                      parseInt(e.target.value, 10)
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  min="0"
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-100">
            <td colSpan="3" className="p-4 text-right text-lg font-bold">
              Total Budget Demand:
            </td>
            <td className="p-4 text-md font-bold text-gray-800">
              {totalDemand.toLocaleString()} BDT
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="mt-5 text-right">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-teal-500 text-white font-bold rounded hover:bg-teal-600 focus:outline-none"
        >
          Submit Demand
        </button>
      </div>
    </div>
  );
};

export default CodewiseBudgetDemand;
