import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { FiEdit } from "react-icons/fi"; // Importing react-icon
import useAxiosPublic from "../../hooks/useAxios";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    phone: "",
    photoUrl: "",
    address: "",
  });
  const axiosInstance = useAxiosPublic(); // Create an axios instance using the custom hook

  // Update user info
  const handleUpdate = async () => {
    try {
      const updatedUser = {
        ...user,
        displayName: formData.displayName,
        phone: formData.phone,
        photoUrl: formData.photoUrl,
        address: formData.address,
      };

      // Make API call to update user information
      const response = await axiosInstance.put(
        `/user/${user._id}`,
        updatedUser
      ); // Use axiosInstance for the request

      if (!response.status === 200) {
        throw new Error("Failed to update user information");
      }

      // Close the modal upon successful update
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("There was an error updating the user. Please try again.");
    }
  };

  // Open the edit modal with the user's current details
  const handleOpenEditModal = () => {
    setFormData({
      displayName: user.displayName || "",
      phone: user.phone || "",
      photoUrl: user.photoUrl || "",
      address: user.address || "",
    });
    setIsEditModalOpen(true);
  };

  return (
    <div className="p-6 relative">
      <div className="flex flex-col items-center">
        <img
          src={user?.photoUrl}
          alt="Profile"
          className="w-36 h-36 object-cover rounded-full shadow-md"
        />
        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          {user?.displayName}
        </h2>
        <p className="text-gray-500">{user?.email}</p>
        <div>
          <strong
            className={!user?.isBlocked ? "text-green-500" : "text-red-500"}
          >
            {!user?.isBlocked ? "Active" : "Blocked"}
          </strong>
        </div>
      </div>

      <div className="mt-6 w-full">
        <h3 className="text-xl font-bold text-gray-700">Profile Details</h3>
        <hr />
        <ul className="mt-3 text-gray-600 space-y-2">
          <li>
            <strong>Role:</strong>{" "}
            <span className="text-red-600">
              {user?.isAdmin ? "Admin" : "User"}
            </span>{" "}
          </li>
          <hr className="py-3" />
          Basic Data
          <li>
            <strong>Upazila Name:</strong> {user?.displayName || "N/A"}
          </li>
          <li>
            <strong>Upazila Code:</strong> {user?.upazilaCode || "N/A"}
          </li>
          <li>
            <strong>Address:</strong> {user?.address || "N/A"}
          </li>
          <hr className="py-3" />
          Contacts
          <li>
            <strong>Email:</strong> {user?.email}
          </li>
          <li>
            <strong>Phone:</strong> {user?.phone || "N/A"}
          </li>
          <li>
            <strong>Address:</strong> {user?.address || "N/A"}
          </li>
          <hr />
          <li className="text-xs">
            <strong>Unique ID:</strong> {user?.uid}
          </li>
          <hr />
          <li className="text-red-700">
            <strong>Want to change password? </strong>{" "}
            <button className="btn">Change password</button>
          </li>
        </ul>
      </div>

      {/* Edit Button with React Icon */}
      {!user?.isBlocked ? (
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-blue-600 transition-transform transform hover:scale-105"
          onClick={handleOpenEditModal}
        >
          <FiEdit size={24} />
        </button>
      ) : null}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl mb-4">Edit User</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium">Name:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.displayName}
                onChange={(e) =>
                  setFormData({ ...formData, displayName: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Phone:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Photo URL:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.photoUrl}
                onChange={(e) =>
                  setFormData({ ...formData, photoUrl: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Address:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white p-2 rounded mr-2"
            >
              Update
            </button>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
