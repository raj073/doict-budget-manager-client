import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxios";

const UpazilaDetails = () => {
  const { fieldOfficeCode } = useParams();
  const { state } = useLocation(); // Access passed props from the parent
  const { upazilaName } = state || {}; // Destructure to get the upazila name

  const [details, setDetails] = useState([]);
  const [economicCodes, setEconomicCodes] = useState([]);
  const axiosInstance = useAxiosPublic();

  useEffect(() => {
    const fetchUpazilaDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `/upazilaCodewiseBudget/${fieldOfficeCode}`
        );
        setDetails(response.data);
      } catch (error) {
        console.error("Error fetching upazila details:", error);
      }
    };

    const fetchEconomicCodes = async () => {
      try {
        const response = await axiosInstance.get("/economicCodes");
        setEconomicCodes(response.data);
      } catch (error) {
        console.error("Error fetching economic codes:", error);
      }
    };

    fetchUpazilaDetails();
    fetchEconomicCodes();
  }, [fieldOfficeCode, axiosInstance]);

  const getEconomicCodeName = (code) => {
    const economicCode = economicCodes.find(
      (item) => item.economicCode === code
    );
    return economicCode ? economicCode.codeName : "Unknown";
  };

  // Calculate the total distributed budget
  const calculateTotalDistributedBudget = () => {
    return (
      details?.allocations?.reduce(
        (acc, allocation) => acc + (allocation.amount || 0),
        0
      ) || 0
    );
  };

  if (!details) return <p>Oops! Upazila details not found...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Budget Details</h1>

      <div className="mb-4">
        <h2 className=" font-semibold text-gray-800">
          Upazila Name:{" "}
          <span className="font-bold">
            {upazilaName || "Unknown Upazila Name"}
          </span>
        </h2>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold text-gray-800">
          Field Office Code:{" "}
          <span className="font-bold">
            {fieldOfficeCode || "Unknown Field Office Code"}
          </span>
        </h2>
      </div>

      <div className="mb-6">
        <h3 className="text-red-600">
          Total Distributed Budget:{" "}
          <span className="font-black ">
            {calculateTotalDistributedBudget()}
          </span>
        </h3>
      </div>

      <table className="table-auto w-full border border-gray-300 rounded-lg">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-semibold">#</th>
            <th className="py-3 px-4 text-left text-sm font-semibold">
              Economic Code
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold">
              Code Name
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold">
              Distributed Budget
            </th>
          </tr>
        </thead>
        <tbody>
          {(details?.allocations || []).map((allocation, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100`}
            >
              <td className="py-3 px-4 text-md">{index + 1}</td>
              <td className="py-3 px-4 text-md">
                {allocation?.economicCode || "N/A"}
              </td>
              <td className="py-3 px-4 text-md">
                {getEconomicCodeName(allocation?.economicCode) || "N/A"}
              </td>
              <td className="py-3 px-4 text-md">{allocation?.amount || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpazilaDetails;
