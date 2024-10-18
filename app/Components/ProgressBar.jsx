// components/ProgressBar.jsx
import React from 'react';

const ProgressBar = ({ raised, goal }) => {
  const percentage = Math.min((raised / goal) * 100, 100); // Calculate the percentage

  return (
    <div className="flex flex-col items-center my-4 md:my-10 px-6 py-6 md:py-8 rounded-[90px] border border-gray-400 relative">
      <div className="w-full  bg-gray-300 rounded-full h-2">
        <div
          className="bg-[#c85120] h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between w-full px-6 text-sm md:text-base text-[#757277] absolute bottom-0 md:bottom-1">
        <span>Raised ₹{raised}</span>
        <span>Goal ₹{goal}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
