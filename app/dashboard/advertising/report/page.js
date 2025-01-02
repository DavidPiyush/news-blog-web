"use client"
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { FaDownload } from "react-icons/fa";

const ReportPage = () => {
  // Sample Data
  const performanceData = [
    { name: "Jan", clicks: 1200 },
    { name: "Feb", clicks: 1500 },
    { name: "Mar", clicks: 1700 },
    { name: "Apr", clicks: 2200 },
    { name: "May", clicks: 2800 },
    { name: "Jun", clicks: 3000 },
    { name: "Jul", clicks: 3400 },
  ];

  const audienceData = [
    { name: "18-24", value: 40 },
    { name: "25-34", value: 30 },
    { name: "35-44", value: 20 },
    { name: "45+", value: 10 },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

  const tableData = [
    {
      campaign: "Campaign 1",
      clicks: 1500,
      impressions: 30000,
      ctr: "5%",
      spend: "$500",
    },
    {
      campaign: "Campaign 2",
      clicks: 2200,
      impressions: 40000,
      ctr: "5.5%",
      spend: "$700",
    },
    {
      campaign: "Campaign 3",
      clicks: 800,
      impressions: 25000,
      ctr: "3.2%",
      spend: "$300",
    },
  ];

  const handleDownloadReport = () => {
    alert("Downloading report...");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Campaign Reports
      </h1>

      {/* Key Metrics Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Key Metrics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { label: "Impressions", value: "125,000" },
            { label: "Clicks", value: "7,500" },
            { label: "Conversions", value: "450" },
            { label: "CTR", value: "6%" },
            { label: "Total Spend", value: "$1,500" },
            { label: "Cost/Result", value: "$3.33" },
          ].map((metric, idx) => (
            <div
              key={idx}
              className="bg-white p-4 shadow-md rounded-lg text-center"
            >
              <p className="text-xl font-bold text-gray-800">{metric.value}</p>
              <p className="text-sm text-gray-500">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Performance Charts Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Performance Charts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Line Chart */}
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Clicks Over Time
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Audience Demographics
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={audienceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                  dataKey="value"
                >
                  {audienceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Campaign Data Table */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Campaign Details
        </h2>
        <div className="overflow-x-auto bg-white p-4 shadow-md rounded-lg">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-800">
                  Campaign
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-800">
                  Clicks
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-800">
                  Impressions
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-800">
                  CTR
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-800">
                  Spend
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">
                    {row.campaign}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {row.clicks}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {row.impressions}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {row.ctr}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {row.spend}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Download Report */}
      <section>
        <button
          onClick={handleDownloadReport}
          className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          <FaDownload className="mr-2" />
          Download Full Report
        </button>
      </section>
    </div>
  );
};

export default ReportPage;
