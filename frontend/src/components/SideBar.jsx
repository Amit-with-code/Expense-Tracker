// src/components/Sidebar.jsx
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white shadow-md p-5">
      <h2 className="text-xl font-bold mb-6">Expense Tracker</h2>

      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:text-blue-500">Dashboard</Link>
        <Link to="/income" className="hover:text-blue-500">Income</Link>
        <Link to="/expense" className="hover:text-blue-500">Expense</Link>
      </nav>
    </div>
  );
}