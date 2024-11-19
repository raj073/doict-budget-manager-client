import { useContext, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useAxiosPublic from "../../hooks/useAxios";
import { AuthContext } from "../../provider/AuthProvider";

const UserDashboardHome = () => {
  const [upazilaData, setUpazilaData] = useState(null);
  const axiosInstance = useAxiosPublic();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUpazilaDetails = async () => {
      try {
        // Fetching upazila budget and expense data
        const response = await axiosInstance.get(`/upazilaBudgetExpense`);
        const currentUpazila = response.data.find(
          (expense) => expense.upazilaCode === user?.upazilaCode
        );

        if (currentUpazila) {
          setUpazilaData(currentUpazila);
        } else {
          console.error("Upazila data not found.");
        }
      } catch (error) {
        console.error("Error fetching upazila details:", error);
      }
    };

    fetchUpazilaDetails();
  }, [user, axiosInstance]);

  if (!upazilaData)
    return (
      <div className="flex items-center justify-center h-full min-h-screen">
        <AiOutlineLoading3Quarters className="animate-spin text-teal-500 text-4xl" />
        <p className="ml-3 text-lg">Loading upazila details...</p>
      </div>
    );

  // Calculate total allocated, total expense, and remaining budget
  const totalAllocatedBudget = upazilaData.expenseCollections.reduce(
    (acc, item) => acc + item.allocatedBudget,
    0
  );

  const totalExpense = upazilaData.expenseCollections.reduce(
    (acc, item) => acc + item.expenseBudget,
    0
  );

  const totalRemainingBudget = totalAllocatedBudget - totalExpense;

  // Calculate progress percentages
  const allocatedPercentage =
    (totalAllocatedBudget / totalAllocatedBudget) * 100;
  const expensePercentage = (totalExpense / totalAllocatedBudget) * 100;
  const remainingPercentage =
    (totalRemainingBudget / totalAllocatedBudget) * 100;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6">Upazila Budget Dashboard</h2>

      <div className="col-span-3 mb-6">
        {/* Progress Bars Section */}
        <div className="flex flex-col items-start gap-4">
          {/* Progress for Allocated Budget */}
          <div className="w-full">
            <label className="font-semibold">
              Total Allocated Budget - {allocatedPercentage.toFixed(1)}%
            </label>
            <progress
              className="progress progress-success w-full"
              value={allocatedPercentage}
              max="100"
            ></progress>
          </div>

          {/* Progress for Distributed Budget */}
          <div className="w-full">
            <label className="font-semibold">
              Distributed Budget - {expensePercentage.toFixed(1)}%
            </label>
            <progress
              className="progress progress-warning w-full"
              value={expensePercentage}
              max="100"
            ></progress>
          </div>

          {/* Progress for Remaining Budget */}
          <div className="w-full">
            <label className="font-semibold">
              Remaining Budget - {remainingPercentage.toFixed(1)}%
            </label>
            <progress
              className="progress progress-error w-full"
              value={remainingPercentage}
              max="100"
            ></progress>
          </div>
        </div>
      </div>

      {/* Budget Data Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Allocated Budget Card */}
        <div className="bg-teal-100 p-4 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-teal-600">
            Total Allocated Budget
          </h3>
          <p className="text-2xl font-bold">
            {totalAllocatedBudget.toLocaleString()} BDT
          </p>
        </div>

        {/* Total Expense Card */}
        <div className="bg-orange-100 p-4 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-orange-600">
            Total Expense
          </h3>
          <p className="text-2xl font-bold">
            {totalExpense.toLocaleString()} BDT
          </p>
        </div>

        {/* Remaining Budget Card */}
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-yellow-600">
            Remaining Budget
          </h3>
          <p className="text-2xl font-bold">
            {totalRemainingBudget.toLocaleString()} BDT
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHome;
