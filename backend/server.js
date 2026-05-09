import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/mongoDB.js'
import userRouter from './routers/userRouter.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

connectDB();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
    origin: "https://expense-tracker-with-amit.netlify.app/",
    credentials: true,
})
)  

app.use('/api/user',userRouter);

app.listen(port,()=>{
    console.log(`sever is connected to port : ${port}`)
})     