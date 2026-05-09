import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/income"
        element={
          <ProtectedRoute>
            <Income />
          </ProtectedRoute>
        }
      />

      <Route
        path="/expense"
        element={
          <ProtectedRoute>
            <Expense />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;