import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Income from "./pages/Income";
import Expense from "./pages/Expense";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/income" element={<Income />} />
      <Route path="/expense" element={<Expense />} />
    </Routes>
  );
}

export default App;