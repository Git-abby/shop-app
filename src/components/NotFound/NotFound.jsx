import React from "react";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-screen border px-10">
    <h2 className="text-6xl font-bold text-white animate-spin">404</h2>
    <h1 className="text-4xl font-semibold text-white mt-4 animate-fadeIn">Page Not Found</h1>
    <p className="text-lg text-gray-400 mt-2 animate-fadeIn">
      The specified file was not found on this website. Please check the URL for mistakes and try again.
    </p>
    <a
      href="/"
      className="px-6 py-2 text-white rounded-md animate-fadeIn"
    >
      Go to Home
    </a>
  </div>
  );
}

export default NotFound;
