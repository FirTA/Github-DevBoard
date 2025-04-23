import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Tooltip,
  Pie,
  Cell,
  Legend,
} from "recharts";
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#8dd1e1",
];
const LanguageUsageCard = ({ repositories }) => {
  const [languageData, setLanguageData] = useState([]);

  useEffect(() => {
    console.log("Repositories data:", repositories);
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
  // Custom legend that won't get cut off
  const renderColorfulLegendText = (value, entry) => {
    const { color } = entry;
    const percentage = (
      ((languageData.find((item) => item.name === value)?.value || 0) / total) *
      100
    ).toFixed(0);

    return (
      <span style={{ color }}>
        {value} {percentage}%
      </span>
    );
  };

  if (languageData.length == 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Language Usage</h2>
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">No language data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Language Usage</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={languageData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {languageData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              formatter={renderColorfulLegendText}
              layout="vertical"
              verticalAlign="middle"
              align="right"
              wrapperStyle={{
                paddingLeft: "10px",
                fontSize: "12px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LanguageUsageCard;
