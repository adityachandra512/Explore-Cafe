import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from 'axios';
import Card from './card';

function Burgermenu() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMenu = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:4001/menu");
        const data = res.data.filter((data) => data.category === 'starter');
        setMenu(data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };
    getMenu();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  if (loading) {
    return (
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 h-[400px] flex items-center justify-center dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-600 dark:border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-16 bg-gradient-to-b from-white via-orange-50/30 to-white dark:from-gray-900 dark:via-gray-800/30 dark:to-gray-900">
      <div className="text-center max-w-[800px] mx-auto mb-12">
        <span className="text-yellow-600 dark:text-yellow-500 font-medium bg-yellow-50 dark:bg-gray-800 px-4 py-2 rounded-full inline-block mb-4">
          🍽️ Featured Starters
        </span>
        <h1 className='font-bold text-3xl md:text-4xl mb-4 text-gray-800 dark:text-white'>
          Begin Your Culinary Journey
        </h1>
        <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
          Our starters set the perfect tone for an unforgettable dining experience. 
          Crafted with a blend of traditional and contemporary flavors, each dish 
          tells its own unique story.
        </p>
      </div>

      <div className='relative'>
        <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-transparent to-white/50 dark:from-gray-900/50 dark:via-transparent dark:to-gray-900/50 z-10"></div>
        <div className='slider-container px-4'>
          <Slider {...settings} className="starter-slider dark:text-white">
            {menu.map((item) => (
              <div key={item.id} className="p-4 relative z-20">
                <Card item={item} />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="text-center mt-12">
        <button 
          onClick={() => navigate('/menu')}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-full 
            transition duration-300 ease-in-out transform hover:scale-105 dark:bg-yellow-600 
            dark:hover:bg-yellow-700 flex items-center gap-2 mx-auto"
        >
          <span>View Full Menu</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Burgermenu;