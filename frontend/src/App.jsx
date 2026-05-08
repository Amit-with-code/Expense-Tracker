import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
  <Route path="/" element={<Dashboard />} />   {/* ✅ public */}

  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  {/* 🔒 Protected */}
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