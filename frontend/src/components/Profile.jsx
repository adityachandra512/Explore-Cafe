import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Navbar from './navbar';
import Footer from './footer';

function Profile() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('orders'); // New state for tab management

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) {
        setUser(userData);
        const response = await axios.get('http://localhost:4001/orders');
        setOrders(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-600 dark:border-yellow-500"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Enhanced Profile Header */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center mb-4 md:mb-0">
                <span className="text-5xl font-bold text-white">
                  {user?.fullname?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{user?.fullname}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">{user?.email}</p>
                <div className="flex space-x-4">
                  <span className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-medium">
                    {orders.length} Orders
                  </span>
                  <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                    Active Member
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'orders'
                      ? 'border-b-2 border-yellow-500 text-yellow-600 dark:text-yellow-500'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Order History
                </button>
              </nav>
            </div>

            {/* Order History Content */}
            <div className="p-6">
              <div className="space-y-6">
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No orders yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                      Looks like you haven't placed any orders yet. Start exploring our delicious menu and place your first order!
                    </p>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div key={order._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Order #{order._id.slice(-6)}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(order.orderDate).toLocaleString()}
                          </p>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>

                      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Delivery Address</p>
                            <p className="text-gray-900 dark:text-white">{order.address}</p>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Phone</p>
                            <p className="text-gray-900 dark:text-white">{order.phone}</p>
                          </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Items</h4>
                          <div className="space-y-3">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600 last:border-0">
                                <div className="flex items-center">
                                  <span className="font-medium text-gray-900 dark:text-white">{item.name}</span>
                                  <span className="text-gray-500 dark:text-gray-400 ml-2">x{item.quantity}</span>
                                </div>
                                <span className="text-gray-900 dark:text-white font-medium">₹{item.price * item.quantity}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-end mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                            <div className="text-right">
                              <span className="text-gray-500 dark:text-gray-400">Total Amount: </span>
                              <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-500 ml-2">₹{order.total}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;