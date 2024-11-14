import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxios";
import toast from "react-hot-toast";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";

const AddUpazila = () => {
  const [formData, setFormData] = useState({
    fieldOfficeCode: "",
    upazilaOfficeName: "",
  });
  console.log(formData);

  const [existingUpazilaInfo, setExistingUpazilaInfo] = useState([]);

  const axiosInstance = useAxiosPublic();

  useEffect(() => {
    const fetchAllUpazilaInfo = async () => {
      try {
        const response = await axiosInstance.get("/upazila");
        setExistingUpazilaInfo(
          response.data.map((upazila) => upazila.fieldOfficeCode)
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllUpazilaInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddUpazila = async (e) => {
    e.preventDefault();

    if (existingUpazilaInfo.includes(formData.fieldOfficeCode)) {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex justify-center items-center">
              <div className="flex-shrink-0 pt-0.5">
                <FaRegTimesCircle className="h-6 w-6 rounded-full bg-red-600 text-white" />
              </div>
              <div className="ml-3 flex-1">
                <p className="mt-1 text-red-500">
                  This Office Code already exists. Please Try a Different One.
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center 
              font-medium text-red-500 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));

      return;
    }

    try {
      await axiosInstance.post("/upazila", formData);
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="p-4">
            <div className="flex justify-center items-center">
              <div className="flex-shrink-0 pt-0.5">
                <FaRegCheckCircle className="h-7 w-7 rounded-full bg-lime-600 text-white" />
              </div>
              <div className="ml-3">
                <p className="mt-1">Upazila Added Successfully !</p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center 
              font-medium text-red-500 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));

      setFormData({
        fieldOfficeCode: "",
        upazilaOfficeName: "",
      });
    } catch (error) {
      console.log("Error adding Upazila", error);
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex justify-center items-center">
              <div className="flex-shrink-0 pt-0.5">
                <FaRegTimesCircle className="h-6 w-6 rounded-full bg-red-600 text-white" />
              </div>
              <div className="ml-3 flex-1">
                <p className="mt-1 text-red-500">
                  Unable to Add Upazila. Please Try Again.
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center 
              font-medium text-red-500 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Add Upazila</h2>
      <div className="py-6">
        <form onSubmit={handleAddUpazila}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Field Office Code
            </label>
            <input
              type="number"
              name="fieldOfficeCode"
              value={formData.fieldOfficeCode}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Upazila Office Name
            </label>
            <input
              type="text"
              name="upazilaOfficeName"
              value={formData.upazilaOfficeName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button type="submit" className="btn btn-accent">
            Add Upazila
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUpazila;
