import { useState, useEffect } from "react";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // const response = await fetch("http://localhost:5000/messages");
        const response = await fetch(
          "https://the-master-full-stack-project-server.vercel.app/messages"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/dashboard/messages/${id}`);
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Messages</h2>
      <hr />
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
