'use client';
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default Layout;