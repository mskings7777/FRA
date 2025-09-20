import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function PieChartDisplay({ data }) {
  const pieData = [
    { name: "Forest Cover", value: 25.11, color: "#55DD33" },
    { name: "Non-Forest", value: 100 - 25.11, color: "#2E7D32" },
  ];

  return (
    <div>
      <div className="text-4xl">
        <div className="text-lg">
          Forest Coverage Distribution
        </div>
      </div>
      <div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PieChartDisplay;
