// src/pages/Register.jsx

import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/user/register", form);

      console.log(res.data);

      toast.success("Register successful 🎉");

      navigate("/login");
    } catch (err) {
      console.log("ERROR:", err.response?.data);

      toast.error(
        err.response?.data?.message || "Register failed ❌"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 px-4">
      
      {/* Register Card */}
      <div className="w-full max-w-md backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-3xl p-10">
        
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">
            Create Account
          </h1>

          <p className="text-white/80 text-lg">
            Start managing your expenses
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-6">
          
          {/* Name */}
          <div>
            <label className="block text-white mb-2 font-medium">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full px-5 py-4 rounded-2xl bg-white/20 text-white placeholder-white/70 border border-white/30 outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-white mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full px-5 py-4 rounded-2xl bg-white/20 text-white placeholder-white/70 border border-white/30 outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-white mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full px-5 py-4 rounded-2xl bg-white/20 text-white placeholder-white/70 border border-white/30 outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-white text-indigo-600 font-bold py-4 rounded-2xl text-xl hover:scale-105 transition duration-300 shadow-lg"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-white/90 mt-8 text-lg">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold underline hover:text-white"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}