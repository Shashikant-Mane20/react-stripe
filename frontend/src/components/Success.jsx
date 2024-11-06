import React from 'react';

const Success = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-green-50">
      <div className="text-center p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-lg text-gray-700 mb-4">Your payment has been processed successfully.</p>
        <button 
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
          onClick={() => window.location.href = '/'}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Success;
