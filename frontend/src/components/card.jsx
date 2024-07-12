import React from "react";

function Card({ item }) {
  return (
    <div className="transform transition-transform duration-200 hover:scale-105 mt-4">
      <div className="card w-96 bg-base-100 shadow-xl hover:scale-105 duration-200 mb-5 dark:bg-slate-900 dark:text-white dark:border">
        <figure>
          <img
            src={item.image}
            alt={item.name}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {item.name}
            <div className="badge badge-secondary">{item.category}</div>
          </h2>
          <p>{item.title}</p>
          <div className="card-actions justify-between">
            <div className="badge badge-outline">{item.price}</div>
            <div className="cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200">Buy Now</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
