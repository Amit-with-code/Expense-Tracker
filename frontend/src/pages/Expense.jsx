// src/pages/Income.jsx
import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";

export default function Income() {
  const [income, setIncome] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const fetchIncome = async () => {
    const res = await API.get("/user/get-expense");
    setIncome(res.data.data || []);
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  // 🔥 Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      amount: Number(form.amount),
    };

    try {
      if (editId) {
        await API.put(`/user/update-expense/${editId}`, payload);
      } else {
        await API.post("/user/add-expense", payload);
      }

      resetForm();
      fetchIncome();
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  // 🔥 Set Edit Mode
  const handleEdit = (item) => {
    setEditId(item._id);
    setForm({
      title: item.title,
      amount: item.amount,
      category: item.category,
      description: item.description,
      date: item.date?.slice(0, 10),
    });
  };

  // 🔥 Delete
  const handleDelete = async (id) => {
    await API.delete(`/user/delete-expense/${id}`);
    fetchIncome();
  };

  // 🔥 Reset
  const resetForm = () => {
    setEditId(null);
    setForm({
      title: "",
      amount: "",
      category: "",
      description: "",
      date: "",
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Expense</h1>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-5 rounded-xl shadow mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input className="border p-2 rounded" placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input type="number" className="border p-2 rounded" placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />

          <input className="border p-2 rounded" placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <input type="date" className="border p-2 rounded"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <input className="border p-2 rounded md:col-span-2" placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <button className={`p-2 rounded text-white md:col-span-2 ${
            editId ? "bg-red-500" : "bg-red-700"
          }`}>
            {editId ? "Update Expense" : "Add Expense"}
          </button>
        </form>

        {/* LIST */}
        <div className="space-y-3">
          {income.map((item) => (
            <div key={item._id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-500">
                  {item.category} • {new Date(item.date).toLocaleDateString()}
                </p>
                <p className="text-sm">{item.description}</p>
              </div>

              <div className="text-right">
                <p className="text-red-500 font-bold">₹{item.amount}</p>

                <div className="flex gap-2 mt-2 justify-end">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-500 text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}