// src/Utilities/shimmercard.jsx
import React from "react";

const ShimmerCard = () => {
  return (
    <div className="w-72 h-96 bg-gray-300 rounded-lg overflow-hidden relative">
      <div className="w-full h-3/5 bg-gray-400 animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%]"></div>
      <div className="p-4 space-y-2">
        <div className="w-4/5 h-6 bg-gray-400 animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%]"></div>
        <div className="w-full h-6 bg-gray-400 animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%]"></div>
        <div className="w-3/4 h-6 bg-gray-400 animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%]"></div>
      </div>
    </div>
  );
};

export default ShimmerCard;
