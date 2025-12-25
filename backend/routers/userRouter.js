import express from 'express'
import { login, register } from '../controllers/userController.js'
import authMiddle from '../middlewares/authMiddleware.js'
import { addIncome, deleteIncome, getIncome, updateIncome } from '../controllers/incomeController.js'
import { addExpense, deleteExpense, getExpenses, updateExpense } from '../controllers/expenseController.js'

const userRouter = express.Router()

userRouter.post('/register',register)
userRouter.post('/login',login)

userRouter.post('/add-income',authMiddle,addIncome)
userRouter.put('/update-income/:id',authMiddle,updateIncome)
userRouter.delete('/delete-income/:id',authMiddle,deleteIncome)
userRouter.get('/get-income',authMiddle,getIncome)  

userRouter.post('/add-expense',authMiddle,addExpense)
userRouter.put('/update-expense/:id',authMiddle,updateExpense)
userRouter.delete('/delete-expense/:id',authMiddle,deleteExpense)
userRouter.get('/get-expense',authMiddle,getExpenses)

export default userRouter