import React, { useState, useEffect } from "react";
import useAxiosPublic from "../../hooks/useAxios";

const AdminDashboardHome = () => {
  const [budgets, setBudgets] = useState({
    totalBudget: 0,
    totalDistributed: 0,
    remainingBudget: 0,
  });
  const [upazilas, setUpazilas] = useState([]);
  const [users, setUsers] = useState([]);
  const axiosInstance = useAxiosPublic();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const budgetsResponse = await axiosInstance.get("/economicCodes");
        const upazilasResponse = await axiosInstance.get("/upazila");

        setUpazilas(upazilasResponse.data);

        // Reset total budget and distributed budget to 0 before recalculating
        let totalBudget = 0,
          totalDistributed = 0;
        console.log(budgetsResponse.data);
        budgetsResponse?.data?.forEach((item) => {
          totalBudget += parseInt(item?.totalBudget) || 0;
          totalDistributed += parseInt(item?.distributedBudget) || 0;
        });

        // Calculate remaining budget
        const remainingBudget = totalBudget - totalDistributed;
        console.log({ totalBudget });
        console.log({ totalDistributed });
        console.log({ remainingBudget });

        // Set the calculated budget values to the state
        setBudgets({ totalBudget, totalDistributed, remainingBudget });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
    fetchUsers();
  }, [axiosInstance]);

  // Ensure percentages are valid and handle cases where totalBudget is zero to avoid NaN
  const distributedPercentage = budgets?.totalBudget
    ? (budgets.totalDistributed / budgets.totalBudget) * 100
    : 0;

  const remainingPercentage = budgets?.totalBudget
    ? (budgets?.remainingBudget / budgets?.totalBudget) * 100
    : 0;
  console.log({ distributedPercentage });
  console.log({ remainingPercentage });
  return (
    <div className="p-6">
      <div className="col-span-3 mb-6">
        {/* Progress Bars Section */}
        <div className="flex flex-col items-start gap-4">
          {/* Progress for Total Budget (100%) */}
          <div className="w-full">
            <label className="font-semibold">Total Budget - 100%</label>
            <progress
              className="progress progress-info w-full"
              value={100}
              max="100"
            ></progress>
          </div>

          {/* Progress for Distributed Budget */}
          <div className="w-full">
            <label className="font-semibold">
              Distributed Budget - {distributedPercentage.toFixed(1)}%
            </label>
            <progress
              className="progress progress-info w-full"
              value={distributedPercentage}
              max="100"
            ></progress>
          </div>

          {/* Progress for Remaining Budget */}
          <div className="w-full">
            <label className="font-semibold">
              Remaining Budget - {remainingPercentage.toFixed(1)}%
            </label>
            <progress
              className="progress progress-info w-full"
              value={remainingPercentage}
              max="100"
            ></progress>
          </div>
        </div>
      </div>

      {/* Budget and User Data Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Budget Card */}
        <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-blue-600">Total Budget</h3>
          <p className="text-2xl font-bold">
            {budgets.totalBudget.toLocaleString()} BDT
          </p>
        </div>

        {/* Total Distributed Card */}
        <div className="bg-green-100 p-4 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-green-600">
            Total Distributed
          </h3>
          <p className="text-2xl font-bold">
            {budgets.totalDistributed.toLocaleString()} BDT
          </p>
        </div>

        {/* Remaining Budget Card */}
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-yellow-600">
            Remaining Budget
          </h3>
          <p className="text-2xl font-bold">
            {budgets.remainingBudget.toLocaleString()} BDT
          </p>
        </div>

        {/* Total Upazila Offices Card */}
        <div className="bg-indigo-100 p-4 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-indigo-600">
            Total Upazila Offices
          </h3>
          <p className="text-2xl font-bold">{upazilas.length}</p>
        </div>

        {/* Total Users Card */}
        <div className="bg-pink-100 p-4 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-pink-600">Total Users</h3>
          <p className="text-2xl font-bold">{users.length}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
