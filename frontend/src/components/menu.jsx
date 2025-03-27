import React, { useEffect, useState } from "react";
import Card from "./card";
import axios from "axios";
import { Link } from "react-router-dom";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const getMenu = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:4001/menu");
        setMenu(res.data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };
    getMenu();
  }, []);

  const categories = ['all', 'starter', 'main course', 'dessert', 'beverage'];
  const filteredMenu = activeCategory === 'all' 
    ? menu 
    : menu.filter(item => item.category === activeCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-600 dark:border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl container mx-auto px-4 md:px-20 min-h-screen dark:bg-gray-900">
      <div className="pt-28 pb-16">
        <div className="text-center max-w-[800px] mx-auto">
          <span className="text-yellow-600 dark:text-yellow-500 font-medium bg-yellow-50 dark:bg-gray-800 px-4 py-2 rounded-full inline-block mb-4">
            🍽️ Our Menu
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Explore Our <span className="text-yellow-600 dark:text-yellow-500">Culinary Delights</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Discover our carefully curated menu featuring the finest ingredients and expert craftsmanship. 
            From traditional favorites to innovative creations, each dish is prepared with passion and 
            attention to detail.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mt-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full capitalize transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-yellow-600 dark:bg-yellow-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMenu.map((item) => (
            <div key={item._id} className="transform hover:-translate-y-2 transition-transform duration-300">
              <Card item={item} />
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link to="/">
            <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-full 
              transition duration-300 ease-in-out transform hover:scale-105 dark:bg-yellow-600 
              dark:hover:bg-yellow-700 inline-flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Menu;
