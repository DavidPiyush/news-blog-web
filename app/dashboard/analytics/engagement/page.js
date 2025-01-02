"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as PieTooltip,
  LabelList,
} from "recharts";
import { FaThumbsUp, FaShareAlt, FaCommentAlt, FaUsers } from "react-icons/fa";

const EngagementPage = () => {
  // Example engagement data
  const engagementData = {
    totalEngagements: 4567,
    totalComments: 1200,
    totalShares: 1345,
    totalLikes: 1022,
    avgSessionTime: "3m 30s",
    activeUsers: 1023,
    engagementRate: 78.5, // in percentage
  };

  // Chart Data for Line Chart (Engagement Over Time)
  const chartData = [
    { month: "Jan", engagements: 400 },
    { month: "Feb", engagements: 550 },
    { month: "Mar", engagements: 500 },
    { month: "Apr", engagements: 700 },
    { month: "May", engagements: 600 },
    { month: "Jun", engagements: 800 },
    { month: "Jul", engagements: 900 },
  ];

  // Pie chart data for engagement type breakdown
  const engagementTypes = [
    { name: "Likes", value: engagementData.totalLikes },
    { name: "Shares", value: engagementData.totalShares },
    { name: "Comments", value: engagementData.totalComments },
  ];

  const COLORS = ["#3490dc", "#38c172", "#ffed4a"];

  const handlePieClick = (data) => {
    alert(`You clicked on: ${data.name} with value: ${data.value}`);
  };

  // Most Engaged Articles (Example Data)
  const mostEngagedArticles = [
    {
      title: "How to Build a Website",
      views: 3400,
      comments: 400,
      shares: 200,
      image: "/path/to/image1.jpg",
    },
    {
      title: "Understanding SEO",
      views: 2500,
      comments: 350,
      shares: 150,
      image: "/path/to/image2.jpg",
    },
    {
      title: "The Future of Web Development",
      views: 2000,
      comments: 300,
      shares: 180,
      image: "/path/to/image3.jpg",
    },
    {
      title: "10 Tips for Designing UX",
      views: 1500,
      comments: 250,
      shares: 100,
      image: "/path/to/image4.jpg",
    },
  ];

  // User Engagement Activity (Example Data)
  const userEngagementActivity = [
    {
      activity: "User Login",
      timestamp: "2024-12-20 10:30 AM",
      type: "login",
      link: "/login",
    },
    {
      activity: "Commented on 'How to Build a Website'",
      timestamp: "2024-12-20 10:25 AM",
      type: "comment",
      link: "/article/how-to-build-a-website",
    },
    {
      activity: "Shared 'Understanding SEO'",
      timestamp: "2024-12-20 10:20 AM",
      type: "share",
      link: "/article/understanding-seo",
    },
    {
      activity: "Liked 'The Future of Web Development'",
      timestamp: "2024-12-20 10:15 AM",
      type: "like",
      link: "/article/the-future-of-web-development",
    },
  ];

  // Engagement Metric Cards with Gradient Backgrounds
  const metricCards = [
    {
      title: "Total Engagements",
      value: engagementData.totalEngagements,
      gradient: "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600",
    },
    {
      title: "Active Users",
      value: engagementData.activeUsers,
      gradient: "bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600",
    },
    {
      title: "Avg. Session Time",
      value: engagementData.avgSessionTime,
      gradient: "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600",
    },
    {
      title: "Engagement Rate (%)",
      value: `${engagementData.engagementRate}%`,
      gradient: "bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-r from-blue-200 via-teal-200 to-yellow-200 rounded-lg shadow-xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          Engagement Dashboard
        </h1>
        <p className="text-lg text-gray-600">
          Analyze user engagement with your content and track key metrics.
        </p>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {metricCards.map((card, index) => (
          <div
            key={index}
            className={`rounded-lg shadow-lg p-6 ${card.gradient}`}
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              {card.title}
            </h3>
            <p className="text-2xl font-bold text-white">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Engagement Chart (Line Chart) */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Engagement Over Time
        </h2>
        <div className="bg-white rounded-lg shadow-lg p-6 flex items-center">
          {/* Graph */}
          <div className="flex-1">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="engagements"
                  stroke="url(#gradientColor)"
                  strokeWidth={3}
                  activeDot={{ r: 8 }}
                >
                  {chartData.map((entry, index) => (
                    <Label
                      key={index}
                      position="top"
                      value={`${entry.month}: ${entry.engagements}`}
                      style={{
                        fill: "#888",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                      offset={15}
                    />
                  ))}
                </Line>
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Graph Data on the Side */}
          <div className="ml-8 text-sm text-gray-600">
            <h3 className="font-semibold">Engagement Data Breakdown:</h3>
            {chartData.map((entry, index) => (
              <div key={index} className="mb-2">
                <span className="font-medium">{entry.month}: </span>
                <span className="font-bold">{entry.engagements}</span>{" "}
                engagements
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gradient Definition for Line Chart */}
      <svg width="0" height="0">
        <defs>
          <linearGradient
            id="gradientColor"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="5%"
              style={{ stopColor: "#3490dc", stopOpacity: 1 }}
            />
            <stop
              offset="95%"
              style={{ stopColor: "#38c172", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
      </svg>

      {/* Engagement Type Breakdown (Pie Chart) */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Engagement Breakdown
        </h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={engagementTypes}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                onClick={handlePieClick}
              >
                {engagementTypes.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
                <LabelList dataKey="value" position="outside" />
              </Pie>
              <PieTooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm text-gray-600">
            <h3 className="font-semibold">Engagement Types Breakdown:</h3>
            {engagementTypes.map((entry, index) => (
              <div key={index} className="mb-2">
                <span className="font-medium">{entry.name}: </span>
                <span className="font-bold">{entry.value}</span> engagements
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent User Engagement Activity */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Recent User Engagement Activity
        </h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <ul className="space-y-4">
            {userEngagementActivity.map((activity, index) => (
              <li key={index} className="border-b border-gray-200 pb-4">
                <a
                  href={activity.link}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <div className="font-semibold text-gray-800">
                    {activity.activity}
                  </div>
                  <div className="text-sm text-gray-600">
                    {activity.timestamp}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Most Engaged Articles */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Most Engaged Articles
        </h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <ul className="space-y-4">
            {mostEngagedArticles.map((article, index) => (
              <li key={index} className="border-b border-gray-200 pb-4">
                <a href="#" className="flex items-center">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-16 h-16 rounded-lg mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {article.title}
                    </h3>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Views: </span>
                      {article.views} |
                      <span className="font-medium"> Comments: </span>
                      {article.comments} |
                      <span className="font-medium"> Shares: </span>
                      {article.shares}
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EngagementPage;
