// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";


export default function Dashboard() {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const inc = await API.get("/user/get-income");
      const exp = await API.get("/user/get-expense");

      setIncome(inc.data.data || []);
      setExpense(exp.data.data || []);
    };

    fetchData();
  }, []);

  const totalIncome = income.reduce((a, b) => a + b.amount, 0);
  const totalExpense = expense.reduce((a, b) => a + b.amount, 0);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          Income: {totalIncome}
        </div>
        <div className="bg-white p-4 rounded shadow">
          Expense: {totalExpense}
        </div>
        <div className="bg-white p-4 rounded shadow">
          Balance: {totalIncome - totalExpense}
        </div>
      </div>
    </Layout>
  );
}