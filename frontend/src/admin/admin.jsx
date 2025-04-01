import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Sidebar from './sidebar';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Admin() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
    ordersByStatus: {},
    recentOrders: [],
    dailyRevenue: {}
  });
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.email !== 'aditya_chandra@srmap.edu.in') {
      navigate('/', { replace: true });
      return;
    }

    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      let orders = [];
      let users = [];

      try {
        const ordersRes = await axios.get('http://localhost:4001/orders');
        orders = ordersRes.data;
      } catch (orderError) {
        console.error('Error fetching orders:', orderError);
        toast.error('Failed to fetch orders');
      }

      try {
        const usersRes = await axios.get('http://localhost:4001/users');
        users = usersRes.data;
      } catch (userError) {
        console.error('Error fetching users:', userError);
        toast.error('Failed to fetch users');
      }

      // Calculate statistics
      const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
      const ordersByStatus = orders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      }, {});

      const dailyRevenue = orders.reduce((acc, order) => {
        const date = new Date(order.orderDate).toLocaleDateString();
        acc[date] = (acc[date] || 0) + order.total;
        return acc;
      }, {});

      setOrders(orders);
      setUsers(users);
      setStats({
        totalOrders: orders.length,
        totalRevenue,
        totalUsers: users.length, // This will now reflect the actual count from MongoDB
        ordersByStatus,
        recentOrders: orders.slice(0, 5),
        dailyRevenue
      });
      setLoading(false);
    } catch (error) {
      console.error('Error in dashboard data processing:', error);
      toast.error('Failed to process dashboard data');
      setLoading(false);
    }
  };

  const revenueChartData = {
    labels: Object.keys(stats.dailyRevenue).slice(-7),
    datasets: [{
      label: 'Daily Revenue',
      data: Object.values(stats.dailyRevenue).slice(-7),
      borderColor: 'rgb(234, 179, 8)',
      tension: 0.1
    }]
  };

  const orderStatusChartData = {
    labels: Object.keys(stats.ordersByStatus),
    datasets: [{
      data: Object.values(stats.ordersByStatus),
      backgroundColor: [
        'rgb(234, 179, 8)',
        'rgb(34, 197, 94)',
        'rgb(239, 68, 68)',
        'rgb(59, 130, 246)'
      ]
    }]
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Orders</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalOrders}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Revenue</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">₹{stats.totalRevenue.toFixed(2)}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Users</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalUsers}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Revenue Trend</h3>
            <Line data={revenueChartData} options={{ responsive: true }} />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Order Status Distribution</h3>
            <Pie data={orderStatusChartData} options={{ responsive: true }} />
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {stats.recentOrders.map((order) => (
              <div key={order._id} className="border dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{order.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(order.orderDate).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-yellow-600">₹{order.total}</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;