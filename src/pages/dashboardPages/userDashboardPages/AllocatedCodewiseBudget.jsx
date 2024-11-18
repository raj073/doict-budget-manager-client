import { useEffect, useState, useContext } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useAxiosPublic from "../../../hooks/useAxios";
import { AuthContext } from "../../../provider/AuthProvider";

const AllocatedCodewiseBudget = () => {
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
        <h2 className="text-3xl font-extrabold">
          Budget allocation for {details?.upazilaName || "Unknown Upazila"}
        </h2>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllocatedCodewiseBudget;
