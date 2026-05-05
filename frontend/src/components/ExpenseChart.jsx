import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function ExpenseChart({ income, expense }) {
  const data = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  const colors = ["#22c55e", "#ef4444"]; // green & red

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Overview</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          barCategoryGap="40%"
          isAnimationActive={false}
          activeBar={false}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          {/* 👇 control width here */}
          <Bar dataKey="value" barSize={40}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}