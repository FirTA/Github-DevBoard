import React from "react";

export const StatBox = ({ value, label, icon, bgColor, textColor }) => (
  <div
    className={`${bgColor} rounded-lg p-4 transition-all duration-200 hover:shadow-md`}
  >
    <div className="flex items-center mb-2">
      <span className={`${textColor} mr-2`}>{icon}</span>
      <span className="text-gray-700 text-sm font-medium">{label}</span>
    </div>
    <div className={`text-2xl font-bold ${textColor}`}>
      {value.toLocaleString()}
    </div>
  </div>
);
