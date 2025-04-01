import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function MenuAddition() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    title: ''
  });

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await axios.get('http://localhost:4001/menu');
      setMenuItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching menu:', error);
      toast.error('Failed to fetch menu items');
    }
  };

  const handleInputChange = (e) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value
    });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setNewItem({
      name: item.name,
      price: item.price,
      category: item.category,
      image: item.image,
      title: item.title
    });
    setIsEditing(true);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing && editingItem._id) {
        const response = await axios.put(`http://localhost:4001/menu/${editingItem._id}`, newItem);
        if (response.data) {
          toast.success('Menu item updated successfully');
        }
      } else {
        await axios.post('http://localhost:4001/menu/add', newItem);
        toast.success('Menu item added successfully');
      }
      setNewItem({
        name: '',
        price: '',
        category: '',
        image: '',
        title: ''
      });
      setIsFormOpen(false);
      setIsEditing(false);
      setEditingItem(null);
      fetchMenu();
    } catch (error) {
      console.error('Error saving menu item:', error);
      toast.error(isEditing ? 'Failed to update item' : 'Failed to add item');
    }
};

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
    if (!isFormOpen) {
      setIsEditing(false);
      setEditingItem(null);
      setNewItem({
        name: '',
        price: '',
        category: '',
        image: '',
        title: ''
      });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`http://localhost:4001/menu/${id}`);
        toast.success('Item deleted successfully');
        fetchMenu();
      } catch (error) {
        console.error('Error deleting item:', error);
        toast.error('Failed to delete item');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          <span className="text-yellow-500">Menu</span> Management
        </h2>
        <button
          onClick={toggleForm}
          className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-3xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {isEditing ? 'Edit Menu Item' : 'Add New Menu Item'}
              </h3>
              <button onClick={toggleForm} className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Item Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newItem.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price</label>
                  <input
                    type="text"
                    name="price"
                    value={newItem.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                  <select
                    name="category"
                    value={newItem.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="appetizers">Appetizers</option>
                    <option value="soups & salads">Soups & Salads</option>
                    <option value="maincourse">Main Course</option>
                    <option value="breads">Breads</option>
                    <option value="rice & biryani">Rice & Biryani</option>
                    <option value="chinese">Chinese</option>
                    <option value="desserts">Desserts</option>
                    <option value="beverages">Beverages</option>
                    <option value="starter">Starter</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={newItem.image}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={newItem.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={toggleForm}
                  className="mr-4 px-6 py-3 rounded-lg border border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors shadow-md"
                >
                  {isEditing ? 'Update Item' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {menuItems.map((item) => (
          <div key={item._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-56 object-cover" />
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-semibold py-1 px-2 rounded-full text-yellow-600 bg-yellow-100">
                  {item.category}
                </span>
                <span className="text-yellow-500 font-bold">₹{item.price}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{item.title}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-600 py-2 px-4 rounded-lg transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex-1 text-red-500 hover:text-white border border-red-500 hover:bg-red-600 py-2 px-4 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuAddition;