// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import useAxiosPublic from "../../hooks/useAxios";

// const MessageDetails = () => {
//   const { id } = useParams();
//   const [message, setMessage] = useState(null);
//   const axiosInstance = useAxiosPublic(); // Create an axios instance using the custom hook

//   useEffect(() => {
//     const fetchMessageDetails = async () => {
//       try {
//         const response = await axiosInstance.get(`/messages/${id}`); // Use axiosInstance for the request
//         setMessage(response.data); // Assuming the data structure is consistent
//       } catch (error) {
//         console.error("Error fetching message details:", error);
//       }
//     };

//     fetchMessageDetails();
//   }, [id, axiosInstance]); // Include axiosInstance as a dependency

//   return (
//     <div className="p-6 bg-white rounded-md shadow-lg">
//       {message ? (
//         <>
//           <h2 className="text-2xl font-bold mb-4">{message.title}</h2>
//           <p className="text-gray-600 mb-6">{message.message}</p>
//           <p className="text-gray-500">Sent by: {message.email}</p>
//         </>
//       ) : (
//         <p>Loading message details...</p>
//       )}
//     </div>
//   );
// };

// export default MessageDetails;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxios";

const MessageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const axiosInstance = useAxiosPublic();

  useEffect(() => {
    const fetchMessageDetails = async () => {
      try {
        const response = await axiosInstance.get(`/messages/${id}`);
        setMessage(response.data);
      } catch (error) {
        console.error("Error fetching message details:", error);
      }
    };

    fetchMessageDetails();
  }, [id, axiosInstance]);

  const handleBack = () => {
    navigate("/dashboard/messages");
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-lg">
      <button
        onClick={handleBack}
        className="flex items-center gap-2 mb-4 text-cyan-600 hover:text-cyan-800"
      >
        <FaArrowLeft />
        Back to Messages
      </button>
      {message ? (
        <>
          <h2 className="text-3xl font-bold mb-6 text-cyan-800">
            {message.title}
          </h2>
          <p className="text-gray-700 mb-4">
            <strong>Message:</strong> {message.message}
          </p>
          <p className="text-gray-500 mb-2">
            <strong>Sent Time:</strong>{" "}
            {new Date(message.createdAt).toLocaleString()}
          </p>
        </>
      ) : (
        <p>Loading message details...</p>
      )}
    </div>
  );
};

export default MessageDetails;
