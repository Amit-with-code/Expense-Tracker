// src/pages/Dashboard.jsx

import { useEffect, useState, useMemo } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";
import ExpenseChart from "../components/ExpenseChart";
import MonthlyLineChart from "../components/MonthlyLineChart";
import { downloadReport } from "../utils/downloadReport";

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

  // ================= TOTALS =================

  const totalIncome = useMemo(() => {
    return Array.isArray(income)
      ? income.reduce((acc, item) => acc + item.amount, 0)
      : 0;
  }, [income]);

  const totalExpense = useMemo(() => {
    return Array.isArray(expense)
      ? expense.reduce((acc, item) => acc + item.amount, 0)
      : 0;
  }, [expense]);

  const balance = totalIncome - totalExpense;

  // ================= MONTHLY DATA =================

  const monthlyData = useMemo(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return months.map((month, index) => {
      const incomeTotal = income
        .filter((item) => new Date(item.date).getMonth() === index)
        .reduce((acc, item) => acc + item.amount, 0);

      const expenseTotal = expense
        .filter((item) => new Date(item.date).getMonth() === index)
        .reduce((acc, item) => acc + item.amount, 0);

      return {
        month,
        income: incomeTotal,
        expense: expenseTotal,
        balance: incomeTotal - expenseTotal,
      };
    });
  }, [income, expense]);

  return (
    <Layout>
      {/* ================= HEADER ================= */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Dashboard</h1>

        <p className="text-white/70 mt-2">
          Track your income and expenses easily
        </p>
      </div>

      <div className="flex justify-end mb-6">
        <button
          onClick={() =>
            downloadReport(income, expense, totalIncome, totalExpense)
          }
          className="bg-white text-indigo-600 px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition duration-300"
        >
          Download PDF
        </button>
      </div>

      {/* ================= CARDS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Income */}
        <div className="backdrop-blur-lg bg-white/20 border border-white/20 rounded-3xl p-6 shadow-2xl hover:scale-105 transition duration-300">
          <h2 className="text-white/70 text-lg mb-2">Total Income</h2>

          <h1 className="text-4xl font-bold text-green-300">₹ {totalIncome}</h1>
        </div>

        {/* Expense */}
        <div className="backdrop-blur-lg bg-white/20 border border-white/20 rounded-3xl p-6 shadow-2xl hover:scale-105 transition duration-300">
          <h2 className="text-white/70 text-lg mb-2">Total Expense</h2>

          <h1 className="text-4xl font-bold text-red-300">₹ {totalExpense}</h1>
        </div>

        {/* Balance */}
        <div className="backdrop-blur-lg bg-white/20 border border-white/20 rounded-3xl p-6 shadow-2xl hover:scale-105 transition duration-300">
          <h2 className="text-white/70 text-lg mb-2">Balance</h2>

          <h1 className="text-4xl font-bold text-blue-200">₹ {balance}</h1>
        </div>
      </div>

      {/* ================= CHARTS ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
        {/* Bar Chart */}
        <div className="backdrop-blur-lg bg-white/20 border border-white/20 rounded-3xl p-6 shadow-2xl">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Expense Overview
          </h2>

          <ExpenseChart income={totalIncome} expense={totalExpense} />
        </div>

        {/* Line Chart */}
        <div className="backdrop-blur-lg bg-white/20 border border-white/20 rounded-3xl p-6 shadow-2xl">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Monthly Analytics
          </h2>

          <MonthlyLineChart data={monthlyData} />
        </div>
      </div>

      {/* ================= RECENT SECTION ================= */}

      <div className="mt-8 backdrop-blur-lg bg-white/20 border border-white/20 rounded-3xl p-6 shadow-2xl">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Financial Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 rounded-2xl p-5">
            <p className="text-white/70 mb-2">Highest Income</p>

            <h1 className="text-3xl font-bold text-green-300">
              ₹ {Math.max(...income.map((i) => i.amount), 0)}
            </h1>
          </div>

          <div className="bg-white/10 rounded-2xl p-5">
            <p className="text-white/70 mb-2">Highest Expense</p>

            <h1 className="text-3xl font-bold text-red-300">
              ₹ {Math.max(...expense.map((e) => e.amount), 0)}
            </h1>
          </div>

          <div className="bg-white/10 rounded-2xl p-5">
            <p className="text-white/70 mb-2">Transactions</p>

            <h1 className="text-3xl font-bold text-blue-200">
              {income.length + expense.length}
            </h1>
          </div>
        </div>
      </div>
    </Layout>
  );
}