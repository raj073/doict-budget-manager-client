import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxios";

const AllUpazilas = () => {
  const [upazilas, setUpazilas] = useState([]);
  const axiosInstance = useAxiosPublic();
  useEffect(() => {
    axiosInstance
      .get("/upazilas")
      .then((response) => setUpazilas(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h2>All Upazilas</h2>
      <table>
        <thead>
          <tr>
            <th>Upazila ID</th>
            <th>Upazila Name</th>
            <th>Economic Codes</th>
          </tr>
        </thead>
        <tbody>
          {upazilas.map((upazila) => (
            <tr key={upazila.id}>
              <td>{upazila.id}</td>
              <td>{upazila.name}</td>
              <td>
                {upazila.economicCodes.map((code) => (
                  <div key={code.code}>
                    <span>
                      {code.code}: {code.distributedBudget}
                    </span>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUpazilas;
