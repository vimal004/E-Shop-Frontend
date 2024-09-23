import React from "react";
import { Link } from "react-router-dom";

const Card = ({ name, imageLink, rating, price, mode, qty }) => {
  return (
    <div
      className={`w-full max-w-sm h-40 flex rounded-sm overflow-hidden shadow-lg  transform transition-transform duration-300 hover:scale-105 ${
        mode ? "bg-gray-800" : "bg-white"
      } ${mode ? "hover:shadow-2xl" : ""} mb-6`}
    >
      <img className="w-2/5 h-full object-cover" src={imageLink} alt={name} />
      <div
        className={`w-3/5 p-4 flex flex-col justify-between ${
          mode ? "text-white" : "text-gray-800"
        }`}
      >
        <div>
          <div
            className={`font-bold text-lg mb-2 ${
              mode ? "text-white" : "text-gray-800"
            } hover:text-gray-400 cursor-pointer`}
          >
            <Link to={`/cart/${name}`}>{name}</Link>
          </div>
          <p className={`text-sm ${mode ? "text-gray-300" : "text-gray-700"}`}>
            Rating: {rating}
          </p>
          <p className={`text-sm ${mode ? "text-gray-300" : "text-gray-700"}`}>
            Price: {price}
          </p>
          <p className={`text-sm ${mode ? "text-gray-300" : "text-gray-700"}`}>
            Quantity: {qty || 1}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
