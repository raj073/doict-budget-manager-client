import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxios";

const UpazilaListAll = () => {
  const [upazilas, setUpazilas] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const axiosInstance = useAxiosPublic();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const upazilasResponse = await axiosInstance.get("/upazila");
        const budgetsResponse = await axiosInstance.get(
          "/upazilaCodewiseBudget"
        );
        setUpazilas(upazilasResponse.data);
        setBudgets(budgetsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [axiosInstance]);

  const getTotalDistributedBudget = (upazilaId) => {
    return budgets
      .filter((budget) => budget.upazilaId === upazilaId)
      .reduce((acc, cur) => acc + cur.amount, 0);
  };

  return (
    <div className="p-6">
      <div className="mb-10">
        <h2
          className="text-4xl font-extrabold bg-gradient-to-bl from-cyan-400 to-cyan-800 
      bg-clip-text text-transparent mb-4 text-center"
        >
          All Upazila Office List
        </h2>
        <hr className="border-cyan-400" />
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-300">
          <thead>
            <tr>
              <th>#</th>
              <th>Field Office Code</th>
              <th>Upazila Office Name</th>
              <th>Total Distributed Budget</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {upazilas.map((upazila, index) => (
              <tr
                key={upazila.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition-colors`}
              >
                <td>{index + 1}</td>
                <td className="font-bold text-lime-700">
                  {upazila.fieldOfficeCode}
                </td>
                <td>
                  <Link
                    to={`/upazila/${upazila.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {upazila.upazilaOfficeName}
                  </Link>
                </td>
                <td>{getTotalDistributedBudget(upazila.id) || 0}</td>
                <td>
                  <Link
                    to={`/upazila/${upazila.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpazilaListAll;
