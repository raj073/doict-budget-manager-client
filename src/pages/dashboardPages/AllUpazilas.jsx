import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import useAxiosPublic from "../../hooks/useAxios";

const AllUpazilas = () => {
  //should be memoized or stable

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxiosPublic();

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   axiosInstance
  //     .get("/upazila")
  //     .then((response) => setUpazilas(response.data))
  //     .catch((error) => console.error(error));
  // }, []);

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
        size: 150,
      },
      {
        accessorKey: "instituteCode",
        header: "Institute Code",
        size: 150,
      },
      {
        accessorKey: "fieldOfficeCode", //normal accessorKey
        header: "Field Office Code",
        size: 200,
      },
      {
        accessorKey: "upazilaOfficeName",
        header: "Upazila Office Name",
        size: 150,
      },
    ],
    []
  );

  // const table = useMaterialReactTable({
  //   columns,
  //   data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  // });

  return (
    <>{!loading && <MaterialReactTable columns={columns} data={data} />}</>
  );
};

export default AllUpazilas;
