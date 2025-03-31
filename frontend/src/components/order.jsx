import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

function Order() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    phone: '',
    address: '',
    note: ''
  });

  // In your useEffect of Order component
  useEffect(() => {
    const selectedItem = localStorage.getItem('selectedMenuItem');
    if (selectedItem) {
      const parsedItem = JSON.parse(selectedItem);
      setCart(prevCart => {
        // Check if item already exists in cart
        const existingItem = prevCart.find(item => item._id === parsedItem._id);
        if (existingItem) {
          return prevCart.map(item =>
            item._id === parsedItem._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevCart, parsedItem];
      });
      localStorage.removeItem('selectedMenuItem');
    }
    const fetchMenu = async () => {
      try {
        const response = await axios.get('http://localhost:4001/menu');
        setMenu(response.data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem._id === item._id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item._id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setCart(cart.map(item =>
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price);
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderConfirmation, setOrderConfirmation] = useState(null);
  
    const handleSubmitOrder = async (e) => {
      e.preventDefault();
      if (cart.length === 0) {
        alert('Please add items to your cart');
        return;
      }
  
      try {
        const orderData = {
          ...orderDetails,
          items: cart,
          total: calculateTotal(),
          status: 'pending',
          orderDate: new Date(),
          paymentMethod: paymentMethod
        };
  
        const response = await axios.post('http://localhost:4001/orders', orderData);
        setOrderConfirmation(orderData);
        setOrderPlaced(true);
        setCart([]);
        setOrderDetails({ name: '', phone: '', address: '', note: '' });
        setCheckoutStep(4); // Add this line to move to the confirmation step
      } catch (error) {
        console.error('Error placing order:', error);
        alert('Failed to place order. Please try again.');
      }
    };
  
    // Add this case to renderStepContent switch statement
  const [checkoutStep, setCheckoutStep] = useState(1); // Add this state
  const [paymentMethod, setPaymentMethod] = useState('cash'); // Add payment method state

  const moveToNextStep = () => {
    if (cart.length === 0) {
      alert('Please add items to your cart first');
      return;
    }

    // Add validation for delivery details when moving from step 2 to 3
    if (checkoutStep === 2) {
      if (!orderDetails.name || !orderDetails.phone || !orderDetails.address) {
        alert('Please fill in all required delivery details');
        return;
      }
    }
    
    setCheckoutStep(checkoutStep + 1);
  };

  const moveToPreviousStep = () => {
    setCheckoutStep(checkoutStep - 1);
  };

  const renderStepContent = () => {
    switch (checkoutStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Existing Menu and Cart Section */}
            <div className="lg:col-span-2">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 backdrop-blur-lg bg-opacity-90"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {menu.map((item) => (
                    <motion.div
                      key={item._id}
                      whileHover={{ scale: 1.03, translateY: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-4 flex items-center gap-4 border border-gray-100 dark:border-gray-600"
                    >
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-28 h-28 object-cover rounded-lg shadow-md transform hover:scale-105 transition-transform duration-200"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{item.name}</h3>
                        <p className="text-yellow-600 dark:text-yellow-400 font-semibold text-lg">₹{item.price}</p>
                        <button
                          onClick={() => addToCart(item)}
                          className="mt-3 bg-yellow-500 text-white px-6 py-2 rounded-full text-sm hover:bg-yellow-600 transition-all duration-200 transform hover:scale-105 flex items-center gap-2 shadow-md"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                          </svg>
                          Add to Cart
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-24 backdrop-blur-lg bg-opacity-90"
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Selected Items
                </h2>
                
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      key={item._id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl"
                    >
                      <div className="flex-1">
                        <h4 className="text-gray-900 dark:text-white font-medium">{item.name}</h4>
                        <p className="text-yellow-600 dark:text-yellow-400 font-semibold">₹{item.price} × {item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-3 bg-white dark:bg-gray-600 p-1 rounded-lg shadow-sm">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-500 rounded-full transition-colors"
                        >
                          -
                        </button>
                        <span className="text-gray-900 dark:text-white font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-500 rounded-full transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div className="flex justify-between text-xl font-bold mb-6">
                    <span className="text-gray-900 dark:text-white">Total:</span>
                    <span className="text-yellow-600 dark:text-yellow-400">₹{calculateTotal()}</span>
                  </div>
                  <button
                    onClick={moveToNextStep}
                    className="w-full bg-yellow-500 text-white py-4 rounded-xl hover:bg-yellow-600 transition-all duration-200 transform hover:scale-105 font-semibold text-lg shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>Continue to Details</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="max-w-2xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Delivery Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={orderDetails.name}
                    onChange={(e) => setOrderDetails({...orderDetails, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={orderDetails.phone}
                    onChange={(e) => setOrderDetails({...orderDetails, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Delivery Address</label>
                  <textarea
                    placeholder="Enter your complete delivery address"
                    value={orderDetails.address}
                    onChange={(e) => setOrderDetails({...orderDetails, address: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    rows="3"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Special Instructions (Optional)</label>
                  <textarea
                    placeholder="Any special instructions for delivery"
                    value={orderDetails.note}
                    onChange={(e) => setOrderDetails({...orderDetails, note: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    rows="2"
                  />
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={moveToPreviousStep}
                    className="w-1/2 bg-gray-500 text-white py-3 rounded-xl hover:bg-gray-600 transition-all duration-200"
                  >
                    Back to Items
                  </button>
                  <button
                    onClick={moveToNextStep}
                    className="w-1/2 bg-yellow-500 text-white py-3 rounded-xl hover:bg-yellow-600 transition-all duration-200"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        );

      case 3:
        return (
          <div className="max-w-2xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Order Summary</h2>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item._id} className="flex justify-between items-center">
                    <span className="text-gray-800 dark:text-white">{item.name} × {item.quantity}</span>
                    <span className="text-yellow-600 font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total Amount:</span>
                    <span className="text-yellow-600">₹{calculateTotal()}</span>
                  </div>
                </div>
              </div>

              {/* Customer Details Summary */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl mb-6">
                <h3 className="font-semibold mb-2">Delivery Details</h3>
                <p className="text-gray-600 dark:text-gray-300">{orderDetails.name}</p>
                <p className="text-gray-600 dark:text-gray-300">{orderDetails.phone}</p>
                <p className="text-gray-600 dark:text-gray-300">{orderDetails.address}</p>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Payment Method</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="form-radio text-yellow-600"
                    />
                    <span>Cash on Delivery</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="form-radio text-yellow-600"
                    />
                    <span>UPI Payment</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={moveToPreviousStep}
                  className="w-1/2 bg-gray-500 text-white py-3 rounded-xl hover:bg-gray-600"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmitOrder}
                  className="w-1/2 bg-yellow-500 text-white py-3 rounded-xl hover:bg-yellow-600"
                >
                  Confirm Order
                </button>
              </div>
            </motion.div>
          </div>
        );

        case 4:
      return (
        <div className="max-w-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Order Placed Successfully!</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Thank you for your order.</p>
            </div>
  
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="font-semibold text-lg mb-3">Order Details</h3>
                {orderConfirmation?.items.map((item) => (
                  <div key={item._id} className="flex justify-between items-center py-2">
                    <span className="text-gray-800 dark:text-white">{item.name} × {item.quantity}</span>
                    <span className="text-yellow-600 font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4 font-bold">
                  <span>Total Amount</span>
                  <span className="text-yellow-600">₹{orderConfirmation?.total}</span>
                </div>
              </div>
  
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Delivery Information</h3>
                <p className="text-gray-700 dark:text-gray-300">{orderConfirmation?.name}</p>
                <p className="text-gray-700 dark:text-gray-300">{orderConfirmation?.phone}</p>
                <p className="text-gray-700 dark:text-gray-300">{orderConfirmation?.address}</p>
                {orderConfirmation?.note && (
                  <p className="text-gray-600 dark:text-gray-400 italic">Note: {orderConfirmation.note}</p>
                )}
              </div>
  
              <div>
                <h3 className="font-semibold text-lg">Payment Method</h3>
                <p className="text-gray-700 dark:text-gray-300 capitalize">{orderConfirmation?.paymentMethod}</p>
              </div>
  
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-yellow-500 text-white py-3 rounded-xl hover:bg-yellow-600 transition-all duration-200 mt-6"
              >
                Place New Order
              </button>
            </div>
          </motion.div>
        </div>
      );


    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-between items-center">
            {['Select Items', 'Delivery Details', 'Payment'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  checkoutStep > index + 1 ? 'bg-green-500' :
                  checkoutStep === index + 1 ? 'bg-yellow-500' : 'bg-gray-300'
                } text-white`}>
                  {checkoutStep > index + 1 ? '✓' : index + 1}
                </div>
                <span className="ml-2 text-sm">{step}</span>
                {index < 2 && <div className="w-24 h-1 mx-4 bg-gray-300"></div>}
              </div>
            ))}
          </div>
        </div>

        {renderStepContent()}
      </div>
    </div>
  );
}

export default Order;