import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxios";

const MessageDetails = () => {
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  const axiosInstance = useAxiosPublic(); // Create an axios instance using the custom hook

  useEffect(() => {
    const fetchMessageDetails = async () => {
      try {
        const response = await axiosInstance.get(`/messages/${id}`); // Use axiosInstance for the request
        setMessage(response.data); // Assuming the data structure is consistent
      } catch (error) {
        console.error("Error fetching message details:", error);
      }
    };

    fetchMessageDetails();
  }, [id, axiosInstance]); // Include axiosInstance as a dependency

  return (
    <div className="p-6 bg-white rounded-md shadow-lg">
      {message ? (
        <>
          <h2 className="text-2xl font-bold mb-4">{message.title}</h2>
          <p className="text-gray-600 mb-6">{message.message}</p>
          <p className="text-gray-500">Sent by: {message.email}</p>
        </>
      ) : (
        <p>Loading message details...</p>
      )}
    </div>
  );
};

export default MessageDetails;
