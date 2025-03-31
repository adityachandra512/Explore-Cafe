import React from "react";
import { useNavigate } from "react-router-dom";

function Card({ item }) {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    const orderItem = {
      ...item,
      quantity: 1
    };
    localStorage.setItem('selectedMenuItem', JSON.stringify(orderItem));
    navigate('/order');
  };

  return (
    <div className="transform transition-transform duration-200 hover:scale-105 mt-4">
      <div className="card w-96 bg-base-100 shadow-xl hover:scale-105 duration-200 mb-5 dark:bg-slate-900 dark:text-white dark:border">
        <figure>
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {item.name}
            <div className="badge badge-secondary">{item.category}</div>
          </h2>
          <p>{item.title}</p>
          <div className="card-actions justify-between items-center">
            <div className="badge badge-outline text-lg p-4">₹{item.price}</div>
            <button 
              onClick={handleBuyNow}
              className="px-4 py-2 rounded-full bg-yellow-600 text-white hover:bg-yellow-700 transition-all duration-200 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
              </svg>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
