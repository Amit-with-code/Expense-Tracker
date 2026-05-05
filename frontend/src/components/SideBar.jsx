import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-64 h-screen bg-white shadow-md p-5">
      <h2 className="text-xl font-bold mb-6">Expense Tracker</h2>

      <nav className="flex flex-col gap-4">
        <Link to="/">Dashboard</Link>

        {/* 🔐 If Logged In */}
        {token && (
          <>
            <Link to="/income">Income</Link>
            <Link to="/expense">Expense</Link>

            <button
              onClick={handleLogout}
              className="text-left text-red-500"
            >
              Logout
            </button>
          </>
        )}

        {/* 🔓 If NOT Logged In */}
        {!token && (
          <>
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
            <Link to="/register" className="text-green-500">
              Register
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}