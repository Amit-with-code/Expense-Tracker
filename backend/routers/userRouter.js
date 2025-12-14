import express from 'express'
import { login, register } from '../controllers/userController.js'
import authMiddle from '../middlewares/authMiddleware.js'
import { addIncome, deleteIncome, getIncome, updateIncome } from '../controllers/incomeController.js'

const userRouter = express.Router()

userRouter.post('/register',register)
userRouter.post('/login',login)

userRouter.post('/add-income',authMiddle,addIncome)
userRouter.put('/update-income/:id',authMiddle,updateIncome)
userRouter.delete('/delete-income/:id',authMiddle,deleteIncome)
userRouter.get('/get-income',authMiddle,getIncome)  



export default userRouter