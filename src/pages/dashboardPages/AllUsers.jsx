import { useState, useEffect } from "react";
import { FaEdit, FaUserShield } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";
import useAxiosPublic from "../../hooks/useAxios";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isAdminToggleModalOpen, setIsAdminToggleModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    displayName: "",
    phone: "",
    photoURL: "",
    address: "",
  });

  const axiosInstance = useAxiosPublic(); // Create an axios instance using the custom hook

  // Fetch all users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/users"); // Use axiosInstance for requests
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Load users when the component mounts
  }, []);

  // Block a user
  const handleBlock = async () => {
    try {
      const updatedUser = {
        ...selectedUser,
        isBlocked: !selectedUser?.isBlocked,
      };
      

      await axiosInstance.put(`/user/${selectedUser._id}`, updatedUser); // Use axiosInstance
      fetchUsers(); // Reload users after update
      setIsBlockModalOpen(false);
    } catch (error) {
      console.error("Error blocking/unblocking user:", error);
    }
  };

  // Toggle admin status
  const handleToggleAdmin = async () => {
    try {
      const updatedUser = { ...selectedUser, isAdmin: !selectedUser?.isAdmin };

      await axiosInstance.put(`/user/${selectedUser._id}`, updatedUser); // Use axiosInstance
      fetchUsers(); // Reload users after update
      setIsAdminToggleModalOpen(false);
    } catch (error) {
      console.error("Error toggling admin status:", error);
    }
  };

  // Open the edit modal with the user's current details
  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      displayName: user.displayName || "",
      phone: user.phone || "",
      photoUrl: user.photoUrl || "",
      address: user.address || "",
    });
    setIsEditModalOpen(true);
  };

  // Update user info
  const handleUpdate = async () => {
    try {
      const updatedUser = {
        ...selectedUser,
        displayName: formData.displayName,
        phone: formData.phone,
        photoUrl: formData.photoUrl,
        address: formData.address,
      };

      await axiosInstance.put(`/user/${selectedUser._id}`, updatedUser); // Use axiosInstance
      fetchUsers(); // Reload users after update
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleClickedSetBlock = (user) => {
    setSelectedUser(user);
    setIsBlockModalOpen(true);
  };


  const handleClickedSetUserOrAdminRole = (user) => {
    setSelectedUser(user);
    setIsAdminToggleModalOpen(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Users List</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-200 text-gray-600 text-left">
            <th className="py-2 px-4 border">#</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Image</th>
            <th className="py-2 px-4 border">Role</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border">{index + 1}</td>
              <td className="py-2 px-4 border">{user?.displayName || "N/A"}</td>
              <td className="py-2 px-4 border">{user?.email}</td>
              <td className="py-2 px-4 border">
                <img
                  src={user?.photoUrl || "https://via.placeholder.com/50"}
                  alt="user"
                  className="w-10 rounded-full"
                />
              </td>
              <td className="py-2 px-4 border">
                {user.isAdmin ? "Admin" : "User"}
              </td>
              <td className="py-2 px-4 border">
                {user.isBlocked ? "Blocked" : "Active"}
              </td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => handleClickedSetUserOrAdminRole(user)}
                  className={`mr-2 p-2 rounded-full text-white ${
                    user.isAdmin ? "bg-green-500" : "bg-blue-500"
                  } ${
                    user.email === "super-admin@dev-master.com"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  title="Toggle Admin/User"
                  disabled={user.email === "super-admin@dev-master.com"}
                >
                  <FaUserShield />
                </button>

                <button
                  onClick={() => openEditModal(user)}
                  className="mr-2 p-2 rounded-full bg-yellow-500 text-white"
                  title="Edit User"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleClickedSetBlock(user)}
                  className={`p-2 rounded-full bg-red-500 text-white ${
                    user.email === "super-admin@dev-master.com"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  title="Block User"
                  disabled={user.email === "super-admin@dev-master.com"}
                >
                  <ImBlocked />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="bg-red-500 text-white px-4 py-2 rounded ml-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Block Modal */}
      {isBlockModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl mb-4">Are you sure?</h3>
            <p>
              {selectedUser?.isBlocked
                ? "Do you want to unblock this user?"
                : "Do you want to block this user?"}
            </p>
            <button
              onClick={handleBlock}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Yes
            </button>
            <button
              onClick={() => setIsBlockModalOpen(false)}
              className="bg-red-500 text-white px-4 py-2 rounded ml-4"
            >
              No
            </button>
          </div>
        </div>
      )}

      {/* Admin Toggle Modal */}
      {isAdminToggleModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl mb-4">Are you sure?</h3>
            <p>
              {selectedUser?.isAdmin
                ? "Do you want to remove this user from admin?"
                : "Do you want to make this user admin?"}
            </p>
            <button
              onClick={handleToggleAdmin}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Yes
            </button>
            <button
              onClick={() => setIsAdminToggleModalOpen(false)}
              className="bg-red-500 text-white px-4 py-2 rounded ml-4"
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
