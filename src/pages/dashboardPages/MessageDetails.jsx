import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MessageDetails = () => {
  const { id } = useParams();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchMessageDetails = async () => {
      try {
        // const response = await fetch(`http://localhost:5000/messages/${id}`); // Adjust URL
        const response = await fetch(
          `https://the-master-full-stack-project-server.vercel.app/messages/${id}`
        ); // Adjust URL
        if (!response.ok) {
          throw new Error("Failed to fetch message details");
        }
        const data = await response.json();
        setMessage(data);
      } catch (error) {
        console.error("Error fetching message details:", error);
      }
    };

    fetchMessageDetails();
  }, [id]);

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
