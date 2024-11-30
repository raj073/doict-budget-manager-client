import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { FiEdit } from "react-icons/fi";
import useAxiosPublic from "../../hooks/useAxios";
import { toast, ToastContainer } from "react-toastify";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    phone: "",
    photoUrl: "",
    address: "",
  });
  const axiosInstance = useAxiosPublic();

  // Handle profile update
  
  const handleUpdate = async () => {
    try {
      const updatedFields = {
        ...(formData.displayName && { displayName: formData.displayName }),
        ...(formData.phone && { phone: formData.phone }),
        ...(formData.photoUrl && { photoUrl: formData.photoUrl }),
        ...(formData.address && { address: formData.address }),
      };

      // Ensure there is at least one field to update
      if (Object.keys(updatedFields).length === 0) {
        toast.error("No changes to update.");
        return;
      }

      // Send PATCH request to update only the changed fields
      const response = await axiosInstance.patch(
        `/user/${user?.uid}`,
        updatedFields
      );

      if (response.status !== 200) {
        throw new Error("Failed to update user information");
      }

      // Update successful
      setIsEditModalOpen(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("There was an error updating the profile. Please try again.");
    }
  };

  // Open the edit modal
  const handleOpenEditModal = () => {
    if (!user) {
      toast.error("User data not available");
      return;
    }
    setFormData({
      displayName: user?.displayName || "",
      phone: user?.phone || "",
      photoUrl: user?.photoUrl || "",
      address: user?.address || "",
    });
    setIsEditModalOpen(true);
  };

  if (!user) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-700">
          User information is not available. Please log in again.
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-8 relative">
        {/* Profile Picture */}
        <img
          src={user?.photoUrl || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-36 h-36 object-cover rounded-full shadow-md"
        />
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          {user?.displayName || "Anonymous"}
        </h2>
        <p className="text-gray-500">{user?.email}</p>
        <div className="mt-2">
          <strong
            className={`text-lg ${
              !user?.isBlocked ? "text-green-500" : "text-red-500"
            }`}
          >
            {!user?.isBlocked ? "Active" : "Blocked"}
          </strong>
        </div>

        {/* Edit Profile Icon */}
        {!user?.isBlocked && (
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-blue-600 transition-transform transform hover:scale-105"
            onClick={handleOpenEditModal}
          >
            <FiEdit size={28} />
          </button>
        )}
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-gray-700 mb-4">
          Profile Details
        </h3>
        <div className="grid grid-cols-3 gap-y-1 text-gray-600">
          {/* Tabular Details */}
          <div className="font-medium col-span-1">Role:</div>
          <div className="text-red-600 col-span-2">
            {user?.isAdmin ? "Admin" : "User"}
          </div>

          <div className="font-medium">User Name:</div>
          <div className="col-span-2">{user?.displayName || "N/A"}</div>
          <div className="font-medium">Upazila Name:</div>
          <div className="col-span-2">{user?.upazilaName || "N/A"}</div>

          <div className="font-medium">Upazila Code:</div>
          <div className="col-span-2">{user?.upazilaCode || "N/A"}</div>

          <div className="font-medium">Address:</div>
          <div className="col-span-2">
            {user.isAdmin ? user?.address : user?.upazilaName}
          </div>

          <div className="font-medium">Email:</div>
          <div className="col-span-2">{user?.email}</div>

          <div className="font-medium">Phone:</div>
          <div className="col-span-2">{user?.phone || "N/A"}</div>
        </div>
        <button className="mt-6 text-blue-600 hover:underline">
          Change Password
        </button>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium">Name:</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:outline-blue-500"
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
                  className="w-full p-2 border rounded focus:outline-blue-500"
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
                  className="w-full p-2 border rounded focus:outline-blue-500"
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
                  className="w-full p-2 border rounded focus:outline-blue-500"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default Profile;
