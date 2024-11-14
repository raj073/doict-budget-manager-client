import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { jsPDF } from "jspdf"; //or use your library of choice here
import autoTable from "jspdf-autotable";
import { toast } from "react-toastify";
import useAxiosPublic from "../../hooks/useAxios";

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const CodewiseDistributedBudgetToAllUpazila = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxiosPublic();
  const [upazilas, setUpazilas] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [upazilaBudgets, setUpazilaBudgets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [upazilasResponse, budgetsResponse, upazilaBudgetsResponse] =
          await Promise.all([
            axiosInstance.get("/upazila"),
            axiosInstance.get("/economicCodes"),
            axiosInstance.get("/upazilaCodewiseBudget"),
          ]);
        setUpazilas(upazilasResponse.data);
        setBudgets(budgetsResponse.data);
        setUpazilaBudgets(upazilaBudgetsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data. Please try again.");
      }
      setLoading(false);
    };
    fetchData();
  }, [axiosInstance]);

  const getAllocationAmount = (upazilaId, economicCode) => {
    const upazilaData = upazilaBudgets.find((ub) => ub.upazilaId === upazilaId);
    if (!upazilaData) return 0;
    const allocation = upazilaData.allocations.find(
      (alloc) => alloc.economicCode === economicCode
    );
    return allocation ? allocation.amount : 0;
  };

  const calculateRowTotal = (upazilaId) => {
    return budgets.reduce(
      (total, budget) =>
        total + getAllocationAmount(upazilaId, budget.economicCode),
      0
    );
  };

  const calculateColumnTotal = (economicCode) => {
    return upazilas.reduce(
      (total, upazila) =>
        total + getAllocationAmount(upazila.fieldOfficeCode, economicCode),
      0
    );
  };

  const calculateOverallTotal = () => {
    return upazilas.reduce(
      (total, upazila) => total + calculateRowTotal(upazila.fieldOfficeCode),
      0
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">
        Code-wise Distributed Budget To All Upazila
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full border rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="text-center">Upazila Name</th>
              {budgets.map((budget) => (
                <th key={budget.code} className="text-center text-red-800">
                  {budget.codeName}
                </th>
              ))}
              <th className="text-center font-bold text-blue-800">Total</th>
            </tr>
          </thead>
          <tbody>
            {upazilas.map((upazila) => (
              <tr key={upazila.id}>
                <td className="text-center font-medium text-lime-800">
                  {upazila.upazilaOfficeName}
                </td>
                {budgets.map((budget) => {
                  const amount = getAllocationAmount(
                    upazila.fieldOfficeCode,
                    budget.economicCode
                  );
                  return (
                    <td key={budget.code} className="text-center">
                      {amount !== 0 ? (
                        <span>{amount}</span>
                      ) : (
                        <span className="text-red-500">0</span>
                      )}
                    </td>
                  );
                })}
                <td className="text-center font-bold text-blue-800">
                  {calculateRowTotal(upazila.fieldOfficeCode)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="text-center font-bold text-blue-800">Total</td>
              {budgets.map((budget) => (
                <td
                  key={budget.code}
                  className="text-center font-bold text-blue-800"
                >
                  {calculateColumnTotal(budget.economicCode)}
                </td>
              ))}
              <td className="text-center font-bold text-blue-800">
                {calculateOverallTotal()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default CodewiseDistributedBudgetToAllUpazila;
