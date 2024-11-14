import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosPublic from "../../hooks/useAxios";

const AddEconomicCode = () => {
  const [formData, setFormData] = useState({
    economicCode: "",
    codeName: "",
    totalBudget: "",
  });
  const [modal, setModal] = useState({ show: false, message: "", type: "" });
  const [existingCodes, setExistingCodes] = useState([]);
  const axiosInstance = useAxiosPublic();

  useEffect(() => {
    // Fetch all economic codes on component mount
    const fetchEconomicCodes = async () => {
      try {
        const response = await axiosInstance.get("/economicCodes");
        setExistingCodes(response.data.map((item) => item.economicCode));
      } catch (error) {
        console.error("Error fetching economic codes:", error);
        showModal(
          "Failed to fetch existing codes. Please try again later.",
          "error"
        );
      }
    };

    fetchEconomicCodes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const showModal = (message, type) => {
    setModal({ show: true, message, type });
    setTimeout(() => {
      setModal({ ...modal, show: false });
    }, 3000);
  };

  const handleAddEconomicField = async (e) => {
    e.preventDefault();
    if (existingCodes.includes(formData.economicCode)) {
      showModal(
        "Economic Code already exists. Please use a unique code.",
        "error"
      );
      return;
    }

    try {
      await axiosInstance.post("/economicCodes", formData);
      showModal("Economic field added successfully!", "success");
      setFormData({ economicCode: "", codeName: "", totalBudget: "" });
      // Refresh the page after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error adding economic field:", error);
      showModal("Failed to add economic field. Please try again.", "error");
    }
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

      <h2 className="text-3xl font-bold mb-4">Add Economic Field</h2>

      <form onSubmit={handleAddEconomicField}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Economic Code</label>
          <input
            type="text"
            name="economicCode"
            value={formData.economicCode}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Code Name</label>
          <input
            type="text"
            name="codeName"
            value={formData.codeName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Total Budget</label>
          <input
            type="number"
            name="totalBudget"
            value={formData.totalBudget}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="btn btn-accent">
          Add Economic Field
        </button>
      </form>
    </div>
  );
};

export default AddEconomicCode;
