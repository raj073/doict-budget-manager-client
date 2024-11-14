// import { useParams } from "react-router-dom";
// import { useContext, useEffect, useState } from "react";
// import useAxiosPublic from "../../hooks/useAxios";
// import { AuthContext } from "../../provider/AuthProvider";

// const AllocatedCodewiseBudget = () => {
//   const [details, setDetails] = useState(null);
//   const axiosInstance = useAxiosPublic();

//   const { user } = useContext(AuthContext);

//   useEffect(() => {
//     const fetchUpazilaDetails = async () => {
//       try {
//         const response = await axiosInstance.get(
//           `/upazilaCodewiseBudget/${user?.upazilaCode}`
//         );
//         setDetails(response.data);
//         console.log(details);
//       } catch (error) {
//         console.error("Error fetching upazila details:", error);
//       }
//     };

//     fetchUpazilaDetails();
//   }, []);

//   if (!details) return <p>Loading upazila details...</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-6 text-center">
//         Details for {details?.upazilaName || "Unknown Upazila"}
//       </h2>
//       <table className="table w-full border border-gray-300">
//         <thead className="bg-gradient-to-r from-teal-500 to-blue-600 text-white">
//           <tr>
//             <th className="p-4 text-left text-lg">Economic Code</th>
//             <th className="p-4 text-left text-lg">Allocated Budget</th>
//             <th className="p-4 text-left text-lg">Budget Demand</th>
//           </tr>
//         </thead>
//         <tbody>
//           {(details.allocations || []).map((allocation, index) => (
//             <tr
//               key={index}
//               className={`${
//                 index % 2 === 0 ? "bg-white" : "bg-gray-50"
//               } hover:bg-gray-100`}
//             >
//               <td className="p-4 text-md">
//                 {allocation?.economicCode || "N/A"}
//               </td>
//               <td className="p-4 text-md">{allocation?.amount || 0}</td>
//               <td className="p-4">
//                   <input
//                     type="number"
//                     // value={distributions[budget.economicCode] || ""}
//                     // onChange={(e) => handleBudgetChange(e, budget.economicCode)}
//                     className="w-full p-2 border rounded"
//                     min="0"
//                   />
//                 </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AllocatedCodewiseBudget;

import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxios";
import { AuthContext } from "../../provider/AuthProvider";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AllocatedCodewiseBudget = () => {
  const [details, setDetails] = useState(null);
  const axiosInstance = useAxiosPublic();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUpazilaDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `/upazilaCodewiseBudget/${user?.upazilaCode}`
        );
        setDetails(response.data);
        console.log(details);
      } catch (error) {
        console.error("Error fetching upazila details:", error);
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
        <h2
          className="text-4xl font-extrabold bg-gradient-to-bl from-cyan-400 to-cyan-800 
      bg-clip-text text-transparent mb-4 text-center"
        >
          Details for {details?.upazilaName || "Unknown Upazila"}
        </h2>
        <hr className="border-cyan-400" />
      </div>
      <table className="table-auto w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-teal-500 to-blue-600 text-white">
          <tr>
            <th className="p-4 text-left text-lg font-semibold">
              Economic Code
            </th>
            <th className="p-4 text-left text-lg font-semibold">
              Allocated Budget
            </th>
            <th className="p-4 text-left text-lg font-semibold">
              Budget Demand
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
              <td className="p-4 text-md font-medium text-gray-800">
                ৳ {allocation?.amount?.toLocaleString() || 0}
              </td>
              <td className="p-4">
                <input
                  type="number"
                  placeholder="Enter demand"
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

export default AllocatedCodewiseBudget;
