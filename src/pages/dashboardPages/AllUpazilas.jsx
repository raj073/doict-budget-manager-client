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
