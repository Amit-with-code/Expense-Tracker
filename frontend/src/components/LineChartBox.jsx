// src/components/LineChartBox.jsx

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function LineChartBox({ income, expense }) {
  const balance = income - expense;

  const data = [
    {
      name: "Stats",
      income: income,
      expense: expense,
      balance: balance,
    },
  ];

  return (
    <div className="w-full h-[300px]">
      <h2 className="text-lg font-semibold mb-4">Overview Trend</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />
          <YAxis />

          <Tooltip cursor={{ stroke: "transparent" }} />

          {/* ✅ Income */}
          <Line
            type="monotone"
            dataKey="income"
            stroke="#22c55e"
            strokeWidth={3}
          />

          {/* ✅ Expense */}
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#ef4444"
            strokeWidth={3}
          />

          {/* ✅ Balance */}
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#3b82f6"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}