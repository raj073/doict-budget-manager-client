import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxios";

const UpazilaDetails = () => {
  const { fieldOfficeCode } = useParams();
  console.log({fieldOfficeCode});
  const [details, setDetails] = useState(null);
  const axiosInstance = useAxiosPublic();

  useEffect(() => {
    const fetchUpazilaDetails = async () => {
      try {
        const response = await axiosInstance.get(`/upazilaCodewiseBudget/${fieldOfficeCode}`);
        setDetails(response.data);
        console.log(details);
      } catch (error) {
        console.error("Error fetching upazila details:", error);
      }
    };

    fetchUpazilaDetails();
  }, [fieldOfficeCode]);

  if (!details) return <p>Loading upazila details...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Details for {details?.upazilaName || "Unknown Upazila"}</h2>
      <table className="table w-full border border-gray-300">
        <thead className="bg-gradient-to-r from-teal-500 to-blue-600 text-white">
          <tr>
            <th className="p-4 text-left text-lg">Economic Code</th>
            <th className="p-4 text-left text-lg">Distributed Budget</th>
          </tr>
        </thead>
        <tbody>
          {(details.allocations || []).map((allocation, index) => (
            <tr key={index} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}>
              <td className="p-4 text-md">{allocation?.economicCode || "N/A"}</td>
              <td className="p-4 text-md">{allocation?.amount || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpazilaDetails;
