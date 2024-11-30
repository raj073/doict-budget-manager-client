import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxios";

const AllUpazilaList = () => {
  const [upazilas, setUpazilas] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
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
    const budget = budgets.find(
      (budget) => budget.upazilaId === fieldOfficeCode
    );
    if (budget && budget.allocations) {
      return budget.allocations.reduce(
        (acc, allocation) => acc + (allocation.amount || 0),
        0
      );
    }
    return 0;
  };

  // Calculate the total distributed budget for all upazilas
  const totalDistributedBudget = upazilas.reduce(
    (total, upazila) =>
      total + getTotalDistributedBudget(upazila.fieldOfficeCode),
    0
  );

  // Filter upazilas based on search query
  const filteredUpazilas = upazilas.filter(
    (upazila) =>
      upazila.upazilaOfficeName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      upazila.fieldOfficeCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">All Upazila Offices</h2>
      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Upazila Name or Field Office Code"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-300">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Field Office Code</th>
              <th>Upazila Office Name</th>
              <th>Total Distributed Budget</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUpazilas.map((upazila, index) => (
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
          <tfoot>
            <tr className="bg-gray-100 text-red-600 font-bold text-sm">
              <td colSpan="3" className="p-4 text-right border">
                Total Distributed Budget:
              </td>
              <td className="p-4 border">
                {totalDistributedBudget.toLocaleString()} BDT
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default AllUpazilaList;
