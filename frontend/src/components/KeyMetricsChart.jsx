import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function KeyMetricsChart({ data }) {
  const chartData = [
    { name: "Forest Area", value: data.forestArea, color: "#4CAF50" },   // Tailwind green-500
    { name: "Population", value: Math.round(data.population / 1000), color: "#22C55E" }, // Tailwind green-600
    { name: "Claims", value: data.individualClaims, color: "#86EFAC" },  // Tailwind green-300
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
        {/* BAR Chart */}
      <div>
        <div className="text-lg font-semibold text-green-700 mb-2">
          Key Metrics Overview
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8F5E8" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#2E7D32", fontSize: 12 }}
              axisLine={{ stroke: "#4CAF50" }}
            />
            <YAxis
              tick={{ fill: "#2E7D32", fontSize: 12 }}
              axisLine={{ stroke: "#4CAF50" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#F1F8E9",
                border: "1px solid #4CAF50",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>

      </div>
    </div>
  );
}

export default KeyMetricsChart;
