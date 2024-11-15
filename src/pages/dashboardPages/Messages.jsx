import { useState, useEffect } from "react";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxios";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const axiosInstance = useAxiosPublic(); // Create an axios instance using the custom hook

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get("/messages"); // Use axiosInstance for the request
        setMessages(response.data); // Assuming the data structure is consistent
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [axiosInstance]); // Include axiosInstance as a dependency

  const handleViewDetails = (id) => {
    navigate(`/dashboard/messages/${id}`);
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-lg">
      <div className="mb-5">
        <h2
          className="text-4xl font-extrabold bg-gradient-to-bl from-cyan-400 to-cyan-800 
      bg-clip-text text-transparent mb-4 text-center"
        >
          Messages
        </h2>
        <hr className="border-cyan-400" />
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 text-left">Title</th>
            <th className="py-2 text-left">Sender</th>
            <th className="py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message._id}>
              <td className="py-2">{message.title}</td>
              <td className="py-2">{message.email}</td>
              <td className="py-2">
                <button
                  onClick={() => handleViewDetails(message._id)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <FiEye size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Messages;
