import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Tooltip,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { BarChart2 } from "lucide-react";

const COLORS = [
  "#3b82f6", // blue-500
  "#10b981", // emerald-500
  "#f59e0b", // amber-500
  "#ef4444", // red-500
  "#8b5cf6", // violet-500
  "#ec4899", // pink-500
  "#06b6d4", // cyan-500
  "#f97316", // orange-500
];
const LanguageUsageCard = ({ repositories }) => {
  const [languageData, setLanguageData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Track window width for responsive adjustments
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const languages = {};
    repositories.forEach((repo) => {
      if (repo.language)
        languages[repo.language] = (languages[repo.language] || 0) + 1;
    });
    const chartData = Object.entries(languages)
      .map(([name, value]) => ({
        name,
        value,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
    setLanguageData(chartData);
  }, [repositories]);
  const total = languageData.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / total) * 100).toFixed(1);
      return (
        <div className="bg-white p-3 rounded shadow-md border border-gray-200">
          <p className="font-medium">{data.name}</p>
          <p className="text-gray-700">
            {data.value} repos ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom Legend with perventages
  const renderLegendText = (value, entry) => {
    const { color } = entry;
    const item = languageData.find((item) => item.name === value);
    const percentage = item ? ((item.value / total) * 100).toFixed(0) : 0;

    return (
      <span className="text-gray-800">
        {value} <span className="text-gray-500 text-sm">({percentage}%)</span>
      </span>
    );
  };

  if (languageData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
          <BarChart2 size={20} className="mr-2 text-blue-500" />
          Language Usage
        </h2>
        <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No language data available</p>
        </div>
      </div>
    );
  }
  const isSmallScreen = windowWidth < 640;
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
        <BarChart2 size={20} className="mr-2 text-blue-500" />
        Language Usage
      </h2>
      <div className="h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={languageData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={isSmallScreen ? 60 : 80}
              innerRadius={isSmallScreen ? 40 : 50}
              fill="#8884d8"
              dataKey="value"
              paddingAngle={2}
            >
              {languageData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="white"
                  strokeWidth={1}
                />
              ))}
            </Pie>
            <Tooltip content={CustomTooltip} />
            <Legend
              iconType="circle"
              formatter={renderLegendText}
              layout={isSmallScreen ? "horizontal" : "vertical"}
              verticalAlign={isSmallScreen ? "bottom" : "middle"}
              align={isSmallScreen ? "center" : "right"}
              wrapperStyle={{
                paddingLeft: isSmallScreen ? 0 : "10px",
                fontSize: "12px",
                maxHeight: "100%",
                overflowY: "auto",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LanguageUsageCard;
