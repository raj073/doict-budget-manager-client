import { FaUserShield, FaTimes } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";
import { useState, useEffect } from "react";
import useAxiosPublic from "../../hooks/useAxios";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isAdminToggleModalOpen, setIsAdminToggleModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const axiosInstance = useAxiosPublic();

  // Fetch all users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/user/${selectedUser._id}`);
      fetchUsers(); // Reload users
      setIsDeleteModalOpen(false); // Close modal
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Toggle Block/Unblock status
  const handleBlockToggle = async () => {
    try {
      const action = selectedUser.isBlocked ? "unblock" : "block"; // Toggle action
      await axiosInstance.put(`/user/block-unblock/${selectedUser._id}`, {
        action: action,
      });
      fetchUsers(); // Reload users
      setIsBlockModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error toggling block status:", error);
    }
  };

  // Toggle Admin status
  const handleAdminToggle = async () => {
    try {
      const action = selectedUser.isAdmin ? "removeAdmin" : "makeAdmin"; // Toggle action
      await axiosInstance.put(`/user/toggle-admin/${selectedUser._id}`, {
        action: action,
      });
      fetchUsers();
      setIsAdminToggleModalOpen(false);
    } catch (error) {
      console.error("Error toggling admin status:", error);
    }
  };

  // Open the Delete modal
  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  // Open the Block/Unblock modal
  const openBlockModal = (user) => {
    setSelectedUser(user);
    setIsBlockModalOpen(true);
  };

  // Open the Admin Toggle modal
  const openAdminToggleModal = (user) => {
    setSelectedUser(user);
    setIsAdminToggleModalOpen(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">User Management</h2>

      <table className="min-w-full bg-white border text-sm">
        <thead>
          <tr className="bg-gray-200 text-gray-600 text-left">
            <th className="py-2 px-4 border">#</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Phone</th>
            <th className="py-2 px-4 border">Office</th>
            <th className="py-2 px-4 border">Role</th>
            <th className="py-2 px-4 border">Status</th> {/* New column */}
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border">{index + 1}</td>
              <td className="py-2 px-4 border">{user?.displayName || "N/A"}</td>
              <td className="py-2 px-4 border">{user?.email}</td>
              <td className="py-2 px-4 border">{user?.phone}</td>
              <td className="py-2 px-4 border">
                {user.isAdmin ? "Head office, Dhaka" : user?.upazilaName}
              </td>
              <td className="py-2 px-4 border">
                {user.isAdmin ? "Admin" : "User"}
              </td>
              <td className="py-2 px-4 border">
                {user.isBlocked ? "Blocked" : "Active"} {/* Status column */}
              </td>
              <td className="py-2 px-4 border">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openAdminToggleModal(user)}
                    className="p-2 rounded-full text-blue-500"
                    title="Toggle Admin Status"
                  >
                    <FaUserShield />
                  </button>
                  <button
                    onClick={() => openBlockModal(user)}
                    className={`p-2 rounded-full ${
                      user.isBlocked ? "text-green-500" : "text-red-500"
                    }`}
                    title="Block/Unblock User"
                  >
                    <ImBlocked />
                  </button>
                  <button
                    onClick={() => openDeleteModal(user)}
                    className="p-2 rounded-full text-red-500"
                    title="Delete User"
                  >
                    <FaTimes />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Block/Unblock Modal */}
      {isBlockModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl mb-4">Are you sure?</h3>
            <p>{selectedUser?.isBlocked ? "Unblock" : "Block"} this user?</p>
            <button
              onClick={handleBlockToggle}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Yes, {selectedUser?.isBlocked ? "Unblock" : "Block"}
            </button>
            <button
              onClick={() => setIsBlockModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-4"
            >
              Cancel
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
                ? "Revoke admin status for"
                : "Grant admin status to"}{" "}
              {selectedUser?.displayName}?
            </p>
            <button
              onClick={handleAdminToggle}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Yes, {selectedUser?.isAdmin ? "Revoke Admin" : "Make Admin"}
            </button>
            <button
              onClick={() => setIsAdminToggleModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl mb-4">Are you sure?</h3>
            <p>Do you want to delete this user?</p>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
