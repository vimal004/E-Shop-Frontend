import React, { useStatet } from "react";
import { useSelector } from "react-redux";

const Footer = () => {
  const currmode = useSelector((state) => state.mode);

  const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`py-6 border-t border-gray-300 shadow-lg ${
        currmode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div
        className={`text-center mb-4 ${
          currmode ? "text-white" : "text-gray-800"
        }`}
      >
        <a
          href="#"
          onClick={scrollToTop}
          className={`inline-flex items-center px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition duration-300 ${
            currmode
              ? "bg-blue-600 text-white hover:text-gray-300"
              : "bg-blue-200 text-blue-600 hover:bg-blue-300 hover:text-blue-700"
          }`}
        >
          <span className="mr-2">Back to the top</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </a>
      </div>
      <div
        className={`flex justify-center space-x-6 mb-4 ${
          currmode ? "text-white" : "text-gray-700"
        }`}
      >
        <a
          href="#"
          className={`hover:text-blue-500 transition duration-300 ${
            currmode ? "text-gray-400" : ""
          }`}
        >
          Conditions of Use & Sale
        </a>
        <a
          href="#"
          className={`hover:text-blue-500 transition duration-300 ${
            currmode ? "text-gray-400" : ""
          }`}
        >
          Privacy Notice
        </a>
      </div>
      <div
        className={`text-center ${
          currmode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        <h6>© 1996-2024, Eshop.com, Inc. or its affiliates</h6>
      </div>
    </div>
  );
};

export default Footer;
