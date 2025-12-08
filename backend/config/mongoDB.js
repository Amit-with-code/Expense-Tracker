import mongoose from "mongoose";
 
const connectDB = async () =>{
    
    mongoose.connection.on('connected', ()=>console.log(`database connected`));
    const isConnect = await mongoose.connect(`${process.env.MONGODB_URL}/expenseTracker`)
    if (!isConnect)console.log("database is not connected")
        console.log('connected ✔️✔️✔️')
}

export default connectDB