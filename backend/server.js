import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/mongoDB.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

connectDB();

app.use(express.json())
app.use(cors())  



app.listen(port,()=>{
    console.log(`sever is connected to port : ${port}`)
})