import mongoose from "mongoose"

const incomeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    amount: { 
        type: Number,
        required: true,
        trim: true
    },
    type: {
        type:String,
        default:"income",
    },
    date: { 
        type:Date,
        required: true
    },
    category: {
        type: String,
        required: true
    }
},{timestamps:true})

const incomeModel = mongoose.models.Income || mongoose.models("income",incomeSchema)

export default incomeModel