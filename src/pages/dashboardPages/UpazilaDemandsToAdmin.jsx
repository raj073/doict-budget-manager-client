import React, { useState, useEffect } from "react";
import useAxiosPublic from "../../hooks/useAxios";

const UpazilaDemandsToAdmin = () => {
  const [economicCodes, setEconomicCodes] = useState([]);
  const [selectedEconomicCode, setSelectedEconomicCode] = useState("");
  const [selectedEconomicCodeName, setSelectedEconomicCodeName] = useState("");
  const [demands, setDemands] = useState([]);
  const [totalDemandedAmount, setTotalDemandedAmount] = useState(0);

  const axiosInstance = useAxiosPublic();

  // Fetch economic codes on component mount
  useEffect(() => {
    const fetchEconomicCodes = async () => {
      try {
        const response = await axiosInstance.get("/economicCodes");
        setEconomicCodes(response.data);
      } catch (error) {
        console.error("Error fetching economic codes:", error);
      }
    };

    fetchEconomicCodes();
  }, [axiosInstance]);

  // Handle economic code selection
  const handleEconomicCodeChange = (event) => {
    const selectedCodeName = event.target.value;
    const selectedCode = economicCodes.find(
      (code) => code.codeName === selectedCodeName
    );

    setSelectedEconomicCodeName(selectedCodeName);
    setSelectedEconomicCode(selectedCode?.economicCode || "");
  };

  // Fetch demands when search button is clicked
  const handleSearchDemand = async () => {
    try {
      const response = await axiosInstance.get("/upazilaBudgetDemand");

      const filteredDemands = response.data
        .map((upazila) => {
          const matchedDemand = upazila.demandCollections.find(
            (demand) => demand.economicCode === selectedEconomicCode
          );

          return matchedDemand
            ? {
                upazilaCode: upazila.upazilaCode,
                upazilaName: upazila.upazilaName,
                amountDemanded: matchedDemand.amountDemanded,
              }
            : null;
        })
        .filter((item) => item !== null);

      setDemands(filteredDemands);

      // Calculate total demanded amount
      const total = filteredDemands.reduce(
        (sum, demand) => sum + demand.amountDemanded,
        0
      );
      setTotalDemandedAmount(total);
    } catch (error) {
      console.error("Error fetching demands:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Upazila Demands
      </h2>

      {/* Economic Code Dropdown */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Select Economic Code</label>
        <select
          className="select select-bordered w-full"
          value={selectedEconomicCodeName}
          onChange={handleEconomicCodeChange}
        >
          <option value="" disabled>
            Choose an economic code name
          </option>
          {economicCodes.map((code) => (
            <option key={code._id} value={code.codeName}>
              {code.codeName}
            </option>
          ))}
        </select>
        <div className="mt-2">
          <span className="font-semibold">Economic Code: </span>
          {selectedEconomicCode || "Not selected"}
        </div>
      </div>

      {/* Search Button */}
      <div className="mb-6 text-center">
        <button
          className="btn btn-primary"
          onClick={handleSearchDemand}
          disabled={!selectedEconomicCode}
        >
          Search Demand
        </button>
      </div>

      {/* Demands Table */}
      {demands.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table table-bordered w-full">
            <thead>
              <tr>
                <th>Upazila Code</th>
                <th>Upazila Name</th>
                <th>Amount Demanded (BDT)</th>
              </tr>
            </thead>
            <tbody>
              {demands.map((demand, index) => (
                <tr key={index}>
                  <td>{demand.upazilaCode}</td>
                  <td>{demand.upazilaName}</td>
                  <td>{demand.amountDemanded.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2" className="font-bold text-right">
                  Total Demanded Amount:
                </td>
                <td className="font-bold">
                  {totalDemandedAmount.toLocaleString()} BDT
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default UpazilaDemandsToAdmin;
