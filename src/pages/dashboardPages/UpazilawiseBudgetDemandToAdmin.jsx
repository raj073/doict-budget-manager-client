import React, { useState, useEffect } from "react";
import useAxiosPublic from "../../hooks/useAxios";

const UpazilaDemandView = () => {
  const [upazilas, setUpazilas] = useState([]);
  const [selectedUpazilaName, setSelectedUpazilaName] = useState("");
  const [selectedUpazilaCode, setSelectedUpazilaCode] = useState("");
  const [selectedUpazilaData, setSelectedUpazilaData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const axiosInstance = useAxiosPublic();

  // Fetch upazilas on component mount
  useEffect(() => {
    const fetchUpazilas = async () => {
      try {
        const response = await axiosInstance.get("/upazilaBudgetDemand");
        setUpazilas(response.data);
      } catch (error) {
        console.error("Error fetching upazilas:", error);
      }
    };

    fetchUpazilas();
  }, [axiosInstance]);

  // Handle upazila selection
  const handleUpazilaChange = (event) => {
    const selectedName = event.target.value;
    setSelectedUpazilaName(selectedName);

    // Find and set the corresponding upazila code
    const upazila = upazilas.find(
      (upazila) => upazila.upazilaName === selectedName
    );
    setSelectedUpazilaCode(upazila ? upazila.upazilaCode : "");
  };

  // Fetch demands for selected upazila
  const handleSearchDemand = () => {
    if (!selectedUpazilaCode) return;

    setIsLoading(true);

    // Find selected upazila data
    const upazilaData = upazilas.find(
      (upazila) => upazila.upazilaCode === selectedUpazilaCode
    );

    setSelectedUpazilaData(upazilaData || null);
    setIsLoading(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Upazila-wise Budget Demands</h2>

      {/* Upazila Dropdown */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Select Upazila Name</label>
        <select
          className="select select-bordered w-full"
          value={selectedUpazilaName}
          onChange={handleUpazilaChange}
        >
          <option value="" disabled>
            Choose an upazila name
          </option>
          {upazilas.map((upazila) => (
            <option key={upazila.upazilaCode} value={upazila.upazilaName}>
              {upazila.upazilaName}
            </option>
          ))}
        </select>
        <div className="mt-2">
          <span className="font-semibold">Upazila Code: </span>
          {selectedUpazilaCode || "Not selected"}
        </div>
      </div>

      {/* Search Button */}
      <div className="mb-6 ">
        <button
          className="btn btn-primary"
          onClick={handleSearchDemand}
          disabled={!selectedUpazilaCode}
        >
          Search Demand
        </button>
      </div>

      {/* Loading State */}
      {isLoading && <p className="text-center">Loading...</p>}

      {/* Display Table */}
      {selectedUpazilaData ? (
        <div className="overflow-x-auto">
          <table className="table table-bordered w-full">
            <thead>
              <tr>
                <th>Economic Code</th>
                <th>Code Name</th>
                <th>Amount Demanded (BDT)</th>
              </tr>
            </thead>
            <tbody>
              {selectedUpazilaData.demandCollections.map((demand, index) => (
                <tr key={index}>
                  <td>{demand.economicCode}</td>
                  <td>{demand.codeName}</td>
                  <td>{demand.amountDemanded.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UpazilaDemandView;
