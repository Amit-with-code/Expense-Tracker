/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [token, setToken] = useState(Cookies.get("token") || null);

  const backendUrl = 'http://localhost:4000';

  // HELPER: Always gets the most recent token from cookies
  const getAuthHeader = useCallback(() => {
    const currentToken = Cookies.get('token');
    return currentToken ? { Authorization: `Bearer ${currentToken}` } : {};
  }, []);

  const fetchIncome = async () => {
    try {
      const currentToken = Cookies.get('token');
      if (!currentToken) return;

      const { data } = await axios.get(`${backendUrl}/api/user/get-income`, {
        headers: getAuthHeader()
      });

      if (data.success) setIncomeData(data.data);
    } catch (error) {
      console.error("Fetch Income Error:", error);
    }
  };

  const fetchExpense = async () => {
    try {
      const currentToken = Cookies.get('token');
      if (!currentToken) return;

      const { data } = await axios.get(`${backendUrl}/api/user/get-expenses`, {
        headers: getAuthHeader()
      });

      if (data.success) setExpenseData(data.data);
    } catch (error) {
      console.error("Fetch Expense Error:", error);
    }
  };

  const addIncome = async (formData) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/add-income`, formData, {
        headers: getAuthHeader()
      });
      if (data.success) {
        toast.success(data.message);
        fetchIncome();
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding income");
    }
  };

  const updateIncome = async (id, updatedFields) => {
    try {
      const { data } = await axios.put(`${backendUrl}/api/user/update-income/${id}`, updatedFields, {
        headers: getAuthHeader()
      });
      if (data.success) {
        toast.success(data.message);
        fetchIncome();
        navigate('/');
      }
    } catch (error) {
      toast.error("Error updating income");
    }
  };

  const deleteIncome = async (id) => {
    try {
      const { data } = await axios.delete(`${backendUrl}/api/user/delete-income/${id}`, {
        headers: getAuthHeader()
      });
      if (data.success) {
        toast.success(data.message);
        fetchIncome();
      }
    } catch (error) {
      toast.error("Error deleting income");
    }
  };

  const addExpense = async (formData) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/add-expenses`, formData, {
        headers: getAuthHeader()
      });
      if (data.success) {
        toast.success(data.message);
        fetchExpense();
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding expense");
    }
  };

  const updateExpense = async (id, updatedFields) => {
    try {
      const { data } = await axios.put(`${backendUrl}/api/user/update-expense/${id}`, updatedFields, {
        headers: getAuthHeader()
      });
      if (data.success) {
        toast.success(data.message);
        fetchExpense();
        navigate('/');
      }
    } catch (error) {
      toast.error("Error updating expense");
    }
  };

  const deleteExpense = async (id) => {
    try {
      const { data } = await axios.delete(`${backendUrl}/api/user/delete-expense/${id}`, {
        headers: getAuthHeader()
      });
      if (data.success) {
        toast.success(data.message || "Expense deleted");
        fetchExpense();
      }
    } catch (error) {
      toast.error("Error deleting expense");
    }
  };

  const handleRegister = async (name, email, password) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
      if (data.success) {
        Cookies.set("token", data.token, { expires: 7 });
        setToken(data.token);
        toast.success(data.message || "Register successful");
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password });
      if (data.success) {
        Cookies.set("token", data.token, { expires: 7 });
        setToken(data.token);
        toast.success(data.message || "Login successful");
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setToken(null);
    setIncomeData([]);
    setExpenseData([]);
    navigate("/login");
  };

  // Automatically fetch data when the app loads or token changes
  useEffect(() => {
    if (token) {
      fetchIncome();
      fetchExpense();
    }
  }, [token]);

  const values = {
    backendUrl,
    expenseData,
    incomeData,
    token,
    setToken,
    fetchExpense,
    fetchIncome,
    handleLogin,
    handleRegister,
    handleLogout,
    addExpense,
    addIncome,
    updateIncome,
    deleteIncome,
    deleteExpense,
    updateExpense,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppContextProvider; 