import React from "react";
import { Button } from "@mui/material";

const Card = ({ name, imageLink, rating, price, mode, qty }) => {
  return (
    <div
      className={`w-72 h-96 rounded-md overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 ${
        mode ? "bg-gray-800" : "bg-white"
      } ${mode ? "hover:shadow-2xl" : ""} mb-6`}
    >
      <img className="w-72 h-3/5 object-cover" src={imageLink} alt={name} />
      <div className={`px-6 py-4 ${mode ? "text-white" : "text-gray-800"}`}>
        <div
          className={`font-bold text-xl mb-2 ${
            mode ? "text-white" : "text-gray-800"
          } hover:text-gray-400 cursor-pointer`}
        >
          {name}
        </div>
        <p className={`text-base ${mode ? "text-gray-300" : "text-gray-700"}`}>
          Rating: {rating}
        </p>
        <p className={`text-base ${mode ? "text-gray-300" : "text-gray-700"}`}>
          Price: {price}
        </p>
      </div>
      <div
        className={`bg-gradient-to-t ${
          mode ? "from-gray-800 to-transparent" : "from-white to-transparent"
        } py-2 px-4`}
      ></div>
    </div>
  );
};

export default Card;
