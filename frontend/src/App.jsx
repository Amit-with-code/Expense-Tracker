/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import {useLocation} from 'react-router-dom'
import AppContext from './context/AppContext'
import { ToastContainer } from 'react-toastify'
import SideBar from './components/SideBar'
import DeshBoard from './pages/DeshBoard'
import History from './components/History'
import ViewTransactions from './pages/ViewTransactions'
import Income from './pages/Income'
import Expenses from './pages/Expenses'
const App = () => {
  const location = useLocation()
  const { token, fetchIncome , fetchExpense } = useContext(AppContext)

  const hideMainLayout = []

  return (
    <div className='flex flex-row'>
      <ToastContainer />
      <SideBar />
      {
        !hideMainLayout ? (
          <div className='flex flex-row w-full overflow-auto'>
            <div className="flex-1 w-1/2">
            <Routes>
              <Route path='/' element={<DeshBoard />} />
            </Routes>
            </div>
            <div className='flex-2 flex-col md:w-1/3 hidden lg:flex overflow-auto'>
            <Routes>
              <Route path='/' element={<History />} />
            </Routes>
            </div>
          </div>
        ):(
          <div className='flex-1 max-h-screen w-full overflow-auto'>
            <Routes>
              <Route path='/view-transaction' element={<ViewTransactions />} />
              <Route path='/add-income' element={<Income />} />
              <Route path='/add-expense' element={<Expenses />} />
              <Route path='/add-expense' element={<Expenses />} />
            </Routes>
          </div>
        )}
    </div>
  )
}

export default App
