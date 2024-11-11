import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxios";

const UpazilaAllList = () => {
  const [upazilas, setUpazilas] = useState([]);
  const axiosInstance = useAxiosPublic();

  useEffect(() => {
    const fetchUpazilas = async () => {
      try {
        const response = await axiosInstance.get("/upazila");
        setUpazilas(response.data);
      } catch (error) {
        console.error("Error fetching upazilas:", error);
      }
    };

    fetchUpazilas();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Upazila Office List</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-300">
          <thead className="bg-gradient-to-r from-teal-500 to-blue-600 text-white">
            <tr>
              <th className="p-4 text-left text-lg">Serial Code</th>
              <th className="p-4 text-left text-lg">Institute Code</th>
              <th className="p-4 text-left text-lg">Field Office Code</th>
              <th className="p-4 text-left text-lg">Upazila Office Name</th>
              <th className="p-4 text-left text-lg">Total Distributed Budget</th>
            </tr>
          </thead>
          <tbody>
            {upazilas.map((upazila, index) => (
              <tr
                key={`${upazila.serialCode}-${index}`}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition-colors`}
              >
                <td className="p-4 text-md">{upazila.serialCode}</td>
                <td className="p-4 text-md">{upazila.instituteCode}</td>
                <td className="p-4 text-md">{upazila.fieldOfficeCode}</td>
                <td className="p-4 text-md">{upazila.upazilaOfficeName}</td>
                <td className="p-4 text-md"> {/* Placeholder for Total Distributed Budget */}
                  {/* Display a value or a function that calculates distributed budget if available */}
                  {/* Example: {calculateDistributedBudget(upazila)} */}
                  0 {/* Replace with actual budget */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpazilaAllList;
