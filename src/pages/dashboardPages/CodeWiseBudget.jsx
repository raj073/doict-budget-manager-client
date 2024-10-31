import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import toast

const CodeWiseBudget = () => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await axios.get("/economicCodes");
        console.log(response);
        setBudgets(response.data);
        toast.success("Budgets fetched successfully!"); // Show success toast
      } catch (error) {
        console.error("Error fetching budgets:", error);
        toast.error("Failed to fetch budgets. Please try again."); // Show error toast
      }
    };

    fetchBudgets();
  }, []);
//   console.log(budgets);
  return (
    <div>
      <ToastContainer />
      <h2>Code-wise Budget</h2>
      <table>
        <thead>
          <tr>
            <th>Economic Code</th>
            <th>Code Name</th>
            <th>Total Budget</th>
            <th>Distributed Budget</th>
            <th>Remaining Budget</th>
          </tr>
        </thead>
        <tbody>
          {budgets?.map((budget) => (
            <tr key={budget?.economicCode}>
              <td>{budget?.economicCode}</td>
              <td>{budget?.codeName}</td>
              <td>{budget?.totalBudget}</td>
              <td>{budget?.distributedBudget}</td>
              <td>{budget?.totalBudget - budget?.distributedBudget}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CodeWiseBudget;
