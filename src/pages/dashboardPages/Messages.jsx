import { useState, useEffect } from "react";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxios";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const axiosInstance = useAxiosPublic();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get("/messages");
        const sortedMessages = response.data.sort(
          (a, b) => new Date(b.sentTime) - new Date(a.sentTime)
        );
        setMessages(sortedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [axiosInstance]);

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
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-3 text-left">SI</th>
            <th className="py-2 px-3 text-left">Message Title</th>
            <th className="py-2 px-3 text-left">Message Preview</th>
            <th className="py-2 px-3 text-left">Sent Time</th>
            <th className="py-2 px-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message, index) => (
            <tr
              key={message._id}
              className={`${
                message.isRead ? "bg-white" : "bg-red-100"
              } hover:bg-gray-50`}
            >
              <td className="py-2 px-3">{index + 1}</td>
              <td className="py-2 px-3 font-semibold">{message.title}</td>
              <td className="py-2 px-3 text-gray-600">
                {message.message.split(" ").slice(0, 7).join(" ")}...
              </td>
              <td className="py-2 px-3">
                {new Date(message.createdAt).toLocaleString()}
              </td>
              <td className="py-2 px-3">
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
