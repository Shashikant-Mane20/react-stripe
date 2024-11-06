import React from 'react';

const Cancel = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-red-50">
      <div className="text-center p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold text-red-600 mb-4">Payment Canceled</h1>
        <p className="text-lg text-gray-700 mb-4">Your payment was not completed. Please try again.</p>
        <button 
          className="px-6 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
          onClick={() => window.location.href = '/'}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Cancel;

