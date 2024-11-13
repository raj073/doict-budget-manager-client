import { Link } from "react-router-dom";
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
      <h2 className="text-3xl font-bold mb-6 text-center">
        Upazila Office List
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-300">
          <thead className="">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Field Office Code</th>
              <th className="p-4 text-left">Upazila Office Name</th>
              <th className="p-4 text-left">
                Total Distributed Budget
              </th>
            </tr>
          </thead>
          <tbody>
            {upazilas?.map((upazila, index) => (
              <tr
                key={`${upazila?.serialCode}-${index}`}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition-colors`}
              >
                <td className="p-4 text-md">{index + 1}</td>
                <td className="p-4 text-md font-bold text-lime-700">{upazila?.fieldOfficeCode}</td>
                <td className="p-4 text-md">
                  <Link
                    to={`/dashboard/upazila/${upazila?.fieldOfficeCode}`}
                    className="text-blue-500 hover:underline"
                  >
                    {upazila?.upazilaOfficeName}
                  </Link>
                </td>
                <td className="p-4 text-md">
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
