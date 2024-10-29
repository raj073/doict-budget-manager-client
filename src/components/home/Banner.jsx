import React from "react";

const Banner = () => {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-blue-500 to-teal-500 text-white py-10 px-5 md:px-20 lg:px-40 rounded-lg shadow-lg mt-10">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-2">
          Budget Management System (BMS)
        </h1>
        <p className="text-xl font-medium">For Department of ICT Officials</p>
      </div>

      <div className="flex flex-col items-center mb-6">
        <h2 className="text-2xl font-semibold mb-2">Core Features</h2>
        <ul className="text-lg space-y-1 text-center">
          <li>🔒 Secure Login & Personalized Dashboard</li>
          <li>📊 Efficient Budget Tracking & Approval</li>
          <li>📱 Fully Responsive for Desktop & Mobile</li>
          <li>💾 24-Hour Database Backup</li>
        </ul>
      </div>
    </div>
  );
};

export default Banner;
