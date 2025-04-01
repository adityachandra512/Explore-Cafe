import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    recentUsers: [],
    usersByMonth: {}
  });

  // Add state for edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    fullname: '',
    email: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.email !== 'aditya_chandra@srmap.edu.in') {
      navigate('/', { replace: true });
      return;
    }

    fetchUsersData();
  }, [navigate]);

  const fetchUsersData = async () => {
    try {
      const response = await axios.get('http://localhost:4001/users'); // Changed from /users/admin to /users
      const users = response.data;

      // Calculate user statistics
      const usersByMonth = users.reduce((acc, user) => {
        const date = new Date(user.createdAt || user._id).toLocaleDateString('en-US', { month: 'long' });
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      setUsers(users);
      setStats({
        totalUsers: users.length,
        activeUsers: users.length,
        recentUsers: users.slice(-5).reverse(),
        usersByMonth
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditForm({
      fullname: user.fullname,
      email: user.email
    });
    setShowEditModal(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:4001/users/${userId}`);
        toast.success('User deleted successfully');
        fetchUsersData(); // Refresh the list
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Failed to delete user');
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:4001/users/${editingUser._id}`, editForm, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data) {
        toast.success('User updated successfully');
        setShowEditModal(false);
        fetchUsersData(); // Refresh the list
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error(error.response?.data?.message || 'Failed to update user');
    }
  };

  // Edit Modal Component
  const EditModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Edit User</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={editForm.fullname}
              onChange={(e) => setEditForm({ ...editForm, fullname: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={editForm.email}
              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Update the table rows to include action buttons
  const updatedTableRow = (user) => (
    <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900 dark:text-white">
          {user.fullname}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500 dark:text-gray-300">
          {user.email}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500 dark:text-gray-300">
          {new Date(user.createdAt || user._id).toLocaleDateString()}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
          Active
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={() => handleEdit(user)}
          className="text-yellow-600 hover:text-yellow-900 mr-4"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(user._id)}
          className="text-red-600 hover:text-red-900"
        >
          Delete
        </button>
      </td>
    </tr>
  );

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Users Management</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Users</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalUsers}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Active Users</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.activeUsers}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Users This Month</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.usersByMonth[new Date().toLocaleDateString('en-US', { month: 'long' })] || 0}
            </p>
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Users</h3>
          <div className="space-y-4">
            {stats.recentUsers.map((user) => (
              <div key={user._id} className="border dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{user.fullname}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Users Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Joined Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {users.map(updatedTableRow)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showEditModal && <EditModal />}
    </div>
  );
}

export default Users;