"use client";

import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TrafficOverview = () => {
  // Example data
  const dailyTrafficData = [
    { day: "Mon", visitors: 1200, pageViews: 3000 },
    { day: "Tue", visitors: 1500, pageViews: 4000 },
    { day: "Wed", visitors: 1800, pageViews: 4200 },
    { day: "Thu", visitors: 2000, pageViews: 5000 },
    { day: "Fri", visitors: 2200, pageViews: 5200 },
    { day: "Sat", visitors: 1700, pageViews: 4000 },
    { day: "Sun", visitors: 1400, pageViews: 3200 },
  ];

  const trafficSourceData = [
    { source: "Direct", value: 40 },
    { source: "Search", value: 35 },
    { source: "Social", value: 15 },
    { source: "Referral", value: 10 },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

  // Example of reach metrics
  const totalUserReach = 5200;
  const newUserReach = 1500;
  const lostUserReach = 800; // New metric for lost reach

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Stylish Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-2 text-left">
          Traffic Overview
        </h1>
        <p className="text-lg text-gray-600 text-left">
          Monitor your website&apos;s performance and user interactions in real-time.
        </p>
        <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 mt-4 rounded"></div>
      </div>

      {/* Metrics at the top */}
      <div className="flex justify-between items-center mb-8">
        {/* Total User Reach */}
        <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg shadow-lg w-1/4">
          <h2 className="text-xl font-semibold text-white mb-4">
            Total User Reach
          </h2>
          <p className="text-4xl font-bold text-white">{totalUserReach}</p>
        </div>

        {/* New User Reach */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-lg shadow-lg w-1/4">
          <h2 className="text-xl font-semibold text-white mb-4">
            New User Reach
          </h2>
          <p className="text-4xl font-bold text-white">{newUserReach}</p>
        </div>

        {/* Lost User Reach */}
        <div className="bg-gradient-to-r from-red-500 to-yellow-500 p-6 rounded-lg shadow-lg w-1/4">
          <h2 className="text-xl font-semibold text-white mb-4">
            Lost User Reach
          </h2>
          <p className="text-4xl font-bold text-white">{lostUserReach}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-8">
        {/* Daily Traffic Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Daily Traffic
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyTrafficData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                dot={{ fill: "#8884d8", stroke: "#8884d8", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="pageViews"
                stroke="#82ca9d"
                dot={{ fill: "#82ca9d", stroke: "#82ca9d", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex justify-between mt-4 text-gray-700">
            <div>
              <strong>Visitors:</strong> 1,200
            </div>
            <div>
              <strong>Page Views:</strong> 3,000
            </div>
          </div>
        </div>

        {/* Traffic Sources Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Traffic Sources
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trafficSourceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="source" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-between mt-4 text-gray-700">
            <div>
              <strong>Direct:</strong> 40%
            </div>
            <div>
              <strong>Search:</strong> 35%
            </div>
            <div>
              <strong>Social:</strong> 15%
            </div>
            <div>
              <strong>Referral:</strong> 10%
            </div>
          </div>
        </div>
      </div>

      {/* Traffic Breakdown Pie Chart */}
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Traffic Breakdown
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={trafficSourceData}
              dataKey="value"
              nameKey="source"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {trafficSourceData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-between mt-4 text-gray-700">
          <div>
            <strong>Direct:</strong> 40%
          </div>
          <div>
            <strong>Search:</strong> 35%
          </div>
          <div>
            <strong>Social:</strong> 15%
          </div>
          <div>
            <strong>Referral:</strong> 10%
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficOverview;
