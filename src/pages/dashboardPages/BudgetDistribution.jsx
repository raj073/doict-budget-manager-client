import { useRef, useState } from "react";
import { toast } from "react-toastify";
import useAxiosPublic from "../../hooks/useAxios";

const BudgetDistribution = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const axiosInstance = useAxiosPublic();

  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      setMessage("");
      setError("");
    } else {
      setMessage("Please Select a Valid CSV File");
      setFile(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please Select a Valid CSV File");
      return;
    }

    const formData = new FormData();
    formData.append("csvFile", file);

    try {
      // Send a POST request to the backend
      const response = await axiosInstance.post("/uploadExcel", formData);
      setMessage(response.data.message);
      setError("");
    } catch (err) {
      // Handle validation and duplicate errors from the backend
      console.error("Error:", err.response);
      if (err.response?.status === 400) {
        setError(err.response?.data?.error); // Header validation error
      } else if (err.response?.status === 409) {
        setError(err.response?.data?.error); // Duplicate record error
      } else {
        setError("Upload Failed. Please Try Again.");
      }
      setMessage("");
    }
  };

  const handleDelete = () => {
    setFile(null);
    setMessage("");
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the input field
    }
  };

  return (
    <div className="p-12 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Budget Distribution</h2>

      <div className="flex justify-between items-center">
        <input
          type="file"
          onChange={handleFileChange}
          accept=".csv"
          ref={fileInputRef}
          className="file-input file-input-bordered file-input-primary w-full max-w-md"
        />
        <button onClick={handleDelete} className="btn btn-error text-white">
          Delete
        </button>
        <button onClick={handleUpload} className="btn btn-active btn-primary">
          Distribute Budget
        </button>
      </div>
      {message && <p className="mt-4 font-bold text-lime-700">{message}</p>}
      {error && <p className="mt-4 font-bold text-orange-600">{error}</p>}
    </div>
  );
};

export default BudgetDistribution;
