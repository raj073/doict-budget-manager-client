import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxios";

const CodeWiseBudget = () => {
  const [budgets, setBudgets] = useState([]);
  const [modal, setModal] = useState({ show: false, message: "", type: "" });
  const axiosInstance = useAxiosPublic();

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await axiosInstance.get("/economicCodes");
        setBudgets(response.data);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };

    fetchBudgets();
  }, []);

  const showModal = (message, type) => {
    setModal({ show: true, message, type });
    setTimeout(() => {
      setModal({ ...modal, show: false });
    }, 3000);
  };

  const closeModal = () => {
    setModal({ ...modal, show: false });
  };

  return (
    <div className="p-6">
      {/* Modal */}
      {modal.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800 z-50">
          <div className="relative w-11/12 max-w-md p-6 bg-white rounded-2xl shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
            >
              &times;
            </button>
            <p
              className={`text-center text-lg font-semibold ${
                modal.type === "success" ? "text-lime-700" : "text-red-700"
              }`}
            >
              {modal.message}
            </p>
          </div>
        </div>
      )}

      <h2 className="text-3xl font-bold mb-4 text-center">Code-wise Budget</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left text-lg">Serial</th>
              <th className="p-4 text-left text-lg">Economic Code</th>
              <th className="p-4 text-left text-lg">Code Name</th>
              <th className="p-4 text-left text-lg">Total Budget</th>
              <th className="p-4 text-left text-lg">Distributed Budget</th>
              <th className="p-4 text-left text-lg">Remaining Budget</th>
            </tr>
          </thead>
          <tbody>
            {budgets?.map((budget, index) => (
              <tr
                key={budget?.economicCode}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100`}
              >
                <td className="p-4 text-md">{index + 1}</td>
                <td className="p-4 text-md">{budget?.economicCode}</td>
                <td className="p-4 text-md">{budget?.codeName}</td>
                <td className="p-4 text-md">{budget?.totalBudget}</td>
                <td className="p-4 text-md">{budget?.distributedBudget}</td>
                <td className="p-4 text-md">
                  {budget?.totalBudget - budget?.distributedBudget}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CodeWiseBudget;
