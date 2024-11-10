import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosPublic from "../../hooks/useAxios";

const AllUpazilas = () => {
  const [upazilas, setUpazilas] = useState([]);
  const [budgets, setBudgets] = useState([]);
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

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const budgetResponse = await axiosInstance.get("/economicCodes");
        setBudgets(budgetResponse.data);
      } catch (error) {
        console.error("Error fetching budgets:", error);
        toast.error("Failed to load budget data. Please try again.");
      }
    };

    fetchBudgets();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-center mb-6 text-primary">All Upazilas</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full border rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="text-center">Upazila Name</th>
              {budgets.map((budget) => (
                <th key={budget.code} className="text-center">
                  {budget.codeName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {upazilas.map((upazila) => (
              <tr key={upazila.id}>
                <td className="text-center font-medium">{upazila.upazilaOfficeName}</td>
                {budgets.map((budget) => {
                  const economicCodeData = upazila.economicCodes?.find(
                    (econCode) => econCode.code === budget.code
                  );

                  return (
                    <td key={budget.code} className="text-center">
                      {economicCodeData ? (
                        <span>{economicCodeData.distributedBudget}</span>
                      ) : (
                        <span className="italic text-gray-500">N/A</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUpazilas;
