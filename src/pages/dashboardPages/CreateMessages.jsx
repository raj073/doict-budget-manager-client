import { useState, useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { FiSend } from "react-icons/fi";
import Messages from "./Messages";

const CreateMessage = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSendMessage = async () => {
    if (!title || !message) {
      alert("Please fill in both fields.");
      return;
    }

    const messageData = {
      title,
      message,
      email: user?.email,
    };

    try {
      // const response = await fetch("http://localhost:5000/messages", {
      const response = await fetch(
        "https://the-master-full-stack-project-server.vercel.app/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messageData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      alert("Message sent successfully!");
      setTitle("");
      setMessage("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send the message.");
    }
  };

  return (
    <div className="p-4">
      <div className="pb-3 w-full">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Create Message
        </button>
      </div>
      <div>
        <Messages />
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create Message</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 p-2 border rounded-lg w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-2 p-2 border rounded-lg w-full"
                rows="5"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600"
              >
                <FiSend className="mr-2" /> Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateMessage;
