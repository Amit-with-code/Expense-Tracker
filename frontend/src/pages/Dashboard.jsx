// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";
import ExpenseChart from "../components/ExpenseChart";
import LineChartBox from "../components/LineChartBox";

export default function Dashboard() {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const inc = await API.get("/user/get-income");
        const exp = await API.get("/user/get-expense");

        setIncome(inc.data.data || []);
        setExpense(exp.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // ✅ Safe calculations
  const totalIncome = Array.isArray(income)
    ? income.reduce((acc, item) => acc + item.amount, 0)
    : 0;

  const totalExpense = Array.isArray(expense)
    ? expense.reduce((acc, item) => acc + item.amount, 0)
    : 0;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">Income: {totalIncome}</div>

        <div className="bg-white p-4 rounded shadow">
          Expense: {totalExpense}
        </div>

        <div className="bg-white p-4 rounded shadow">
          Balance: {totalIncome - totalExpense}
        </div>
      </div>

      {/* Chart (separate section) */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT - Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <ExpenseChart income={totalIncome} expense={totalExpense} />
        </div>

        {/* RIGHT - Empty / Future / Chat */}
        <div className="bg-white p-6 rounded-xl shadow">
          <LineChartBox income={totalIncome} expense={totalExpense} />
        </div>
      </div>
    </Layout>
  );
}