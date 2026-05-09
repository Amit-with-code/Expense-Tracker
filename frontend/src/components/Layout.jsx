// src/components/Layout.jsx

import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Layout({ children }) {
  const location = useLocation();

  const { logout, token } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    toast.success("Logout successful 👋");
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600">

      {/* ================= SIDEBAR ================= */}

      <div className="w-64 h-screen fixed left-0 top-0 backdrop-blur-lg bg-white/10 border-r border-white/20 shadow-2xl p-6 flex flex-col">

        {/* Logo */}
        <h1 className="text-3xl font-bold text-white mb-10">
          ExpenseTracker
        </h1>

        {/* Navigation */}
        <nav className="flex flex-col gap-4">

          <Link
            to="/dashboard"
            className={`px-4 py-3 rounded-2xl transition duration-300 ${
              location.pathname === "/dashboard"
                ? "bg-white text-indigo-600 font-semibold"
                : "text-white hover:bg-white/20"
            }`}
          >
            Dashboard
          </Link>

          {/* Only show when logged in */}
          {token && (
            <>
              <Link
                to="/income"
                className={`px-4 py-3 rounded-2xl transition duration-300 ${
                  location.pathname === "/income"
                    ? "bg-white text-indigo-600 font-semibold"
                    : "text-white hover:bg-white/20"
                }`}
              >
                Income
              </Link>

              <Link
                to="/expense"
                className={`px-4 py-3 rounded-2xl transition duration-300 ${
                  location.pathname === "/expense"
                    ? "bg-white text-indigo-600 font-semibold"
                    : "text-white hover:bg-white/20"
                }`}
              >
                Expense
              </Link>
            </>
          )}
        </nav>

        {/* ================= BOTTOM AREA ================= */}

        <div className="mt-auto">

          {/* If Logged In */}
          {token ? (
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl transition duration-300 font-semibold shadow-lg"
            >
              Logout
            </button>
          ) : (
            <div className="flex flex-col gap-3">

              <Link
                to="/login"
                className="w-full text-center bg-white text-indigo-600 py-3 rounded-2xl font-semibold hover:scale-105 transition duration-300"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="w-full text-center bg-indigo-700 text-white py-3 rounded-2xl font-semibold hover:scale-105 transition duration-300"
              >
                Register
              </Link>

            </div>
          )}
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}

      <div className="flex-1 ml-64 p-8 overflow-y-auto min-h-screen">
        {children}
      </div>
    </div>
  );
}