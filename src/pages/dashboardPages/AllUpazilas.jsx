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

const AllUpazilas = () => {
  //should be memoized or stable

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxiosPublic();

  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const handleExportRowsPdf = (rows) => {
    const doc = new jsPDF();
    console.log(doc);
    const tableData = rows.map((row) => Object.values(row.original));
    console.log("tableData:", tableData);
    const tableHeaders = columns.map((c) => c.header);
    console.log("tableHeaders:", tableHeaders);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save("AllUpazilaBuget.pdf");
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axiosInstance
      .get("/upazila")
      .then((response) => {
        console.log("Data:", response);
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "serialCode", //access nested data with dot notation
        header: "Serial Code",
        size: 10,
      },
      {
        accessorKey: "instituteCode",
        header: "Institute Code",
        size: 20,
      },
      {
        accessorKey: "fieldOfficeCode", //normal accessorKey
        header: "Field Office Code",
        size: 20,
      },
      {
        accessorKey: "upazilaOfficeName",
        header: "Upazila Office Name",
        size: 150,
      },
    ],
    []
  );
  const [upazilas, setUpazilas] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [upazilaBudgets, setUpazilaBudgets] = useState([]);

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

  useEffect(() => {
    const fetchUpazilaBudgets = async () => {
      try {
        const response = await axiosInstance.get("/upazilaCodewiseBudget");
        setUpazilaBudgets(response.data);
      } catch (error) {
        console.error("Error fetching upazila budgets:", error);
        toast.error("Failed to load upazila budget data.");
      }
    };

    fetchUpazilaBudgets();
  }, []);

  const getAllocationAmount = (upazilaId, economicCode) => {
    const upazilaData = upazilaBudgets.find((ub) => ub.upazilaId === upazilaId);

    if (!upazilaData) return null;

    const allocation = upazilaData.allocations.find(
      (alloc) => alloc.economicCode === economicCode
    );

    return allocation ? allocation.amount : null;
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-center mb-6 text-primary">
        All Upazilas
      </h2>
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
                <td className="text-center font-medium">
                  {upazila.upazilaOfficeName}
                </td>
                {budgets.map((budget) => {
                  const amount = getAllocationAmount(upazila.id, budget.code);
                  return (
                    <td key={budget.code} className="text-center">
                      {amount !== null ? (
                        <span>{amount}</span>
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

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowNumbers: true,
    enableRowSelection: true,
    rowNumberDisplayMode: "original",
    enableStickyHeader: true,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
        >
          Export All (Excel)
        </Button>

        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          //only export selected rows
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows (Excel)
        </Button>

        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRowsPdf(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export All (PDf)
        </Button>

        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          //only export selected rows
          onClick={() => handleExportRowsPdf(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows (PDF)
        </Button>
      </Box>
    ),
  });

  return <>{!loading && <MaterialReactTable table={table} />}</>;
};

export default AllUpazilas;
