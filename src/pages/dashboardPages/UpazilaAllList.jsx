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

  const getTotalDistributedBudget = (fieldOfficeCode) => {
    // Find the budget object that matches the fieldOfficeCode
    const budget = budgets.find(
      (budget) => budget.upazilaId === fieldOfficeCode
    );

    // If a matching budget is found, calculate the total distributed amount from allocations
    if (budget && budget.allocations) {
      return budget.allocations.reduce(
        (acc, allocation) => acc + (allocation.amount || 0),
        0
      );
    }

    // If no matching budget or allocations found, return 0
    return 0;
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">All Upazilas</h2>
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
                  <span className="text-blue-500 ">
                    {upazila.upazilaOfficeName}
                  </span>
                </td>
                <td>
                  {getTotalDistributedBudget(upazila.fieldOfficeCode) || 0}
                </td>
                <td>
                  <Link
                    to={`/dashboard/upazila/${upazila.fieldOfficeCode}`}
                    state={{
                      upazilaName: upazila.upazilaOfficeName,
                      fieldOfficeCode: upazila.fieldOfficeCode,
                    }}
                    className="text-lime-800 text-sm hover:underline"
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
