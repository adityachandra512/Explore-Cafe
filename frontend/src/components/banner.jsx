import React from "react";
import { useNavigate } from "react-router-dom";
import delivery from '../../public/image/giphy.gif';

function Banner() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-white via-orange-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-screen-2xl container mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center min-h-screen">
        <div className="w-full order-2 md:order-1 md:w-1/2 space-y-8">
          <div className="space-y-6">
            <span className="text-orange-600 dark:text-orange-400 font-medium bg-orange-50 dark:bg-gray-800 px-4 py-2 rounded-full inline-block">
              🍽️ Welcome to Explorer Cafe
            </span>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight dark:text-white">
              Discover the Art of
              <span className="text-yellow-600 dark:text-yellow-500 block mt-2">Fine Dining Experience</span>
            </h1>

            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-xl">
              Indulge in a culinary journey where every dish tells a story. Experience the perfect blend of flavors, ambiance, and exceptional service.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => navigate('/order')}
                className="btn bg-yellow-600 hover:bg-yellow-700 text-white border-none px-8 py-3 rounded-full text-lg font-medium flex items-center gap-2"
              >
                <span>Order Now</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                  <path d="M16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
              </button>
              <button 
                onClick={() => navigate('/menu')}
                className="btn btn-outline border-yellow-600 dark:border-yellow-500 text-yellow-600 dark:text-yellow-500 hover:bg-yellow-600 hover:text-white px-8 py-3 rounded-full text-lg font-medium flex items-center gap-2"
              >
                <span>View Menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="pt-8">
              <p className="text-gray-700 dark:text-gray-300 font-medium mb-4">Subscribe for Special Offers</p>
              <div className="flex gap-4 max-w-md">
                <label className="input input-bordered flex-1 flex items-center gap-3 bg-white dark:bg-gray-800 rounded-full px-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-5 w-5 text-yellow-600 dark:text-yellow-500"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input type="email" className="grow outline-none bg-transparent dark:text-white" placeholder="Enter your email" />
                </label>
                <button className="btn bg-yellow-600 hover:bg-yellow-700 text-white rounded-full px-6">
                  Subscribe
                </button>
              </div>
            </div>

            <div className="flex items-center gap-8 pt-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-yellow-600 dark:text-yellow-500">4.8</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Customer Rating</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-yellow-600 dark:text-yellow-500">15k+</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Happy Customers</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-yellow-600 dark:text-yellow-500">50+</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Food Items</p>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 w-full md:w-1/2 relative">
          <div className="absolute -inset-4 bg-yellow-200 dark:bg-yellow-900 rounded-full blur-3xl opacity-30"></div>
          <img 
            src={delivery} 
            alt="Delivery Service" 
            className="w-full h-auto relative z-10 animate-float dark:filter dark:brightness-90" 
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
