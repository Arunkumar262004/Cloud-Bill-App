// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center container p-3">
      <h1 className="text-6xl font-bold text-red-500 text-danger" >404</h1>
      <h2 className="text-2xl mt-2">Page Not Found</h2>
      <p className="text-gray-500 mt-2">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link to="/" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
