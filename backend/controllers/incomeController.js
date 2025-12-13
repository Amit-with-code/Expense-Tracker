import incomeModel from "../models/incomeSchema";

const addIncome = async (req,res) => {
    const userId =  req.user?.userId

    const { title,amount,type,date,category,description } = req.body

    const parsedAmount = Number(amount)

    try {
        if(!title || !amount || !type || !date || !category || !description ){
            return res.status(400).json({success:false,message:" required all fields"})
        }
        if(isNaN(parsedAmount) || parsedAmount <= 0){
            return res.status(400).json({success:false,message:"Amount must be a postive integer"})
        }        

        const newIncome = new incomeModel({
            userId,
            title,
            amount,
            category,
            date,
            description,
            income 
        })

        await newIncome.save()

        res.status(200).json({ success:true, message:" Income is Added ", data: newIncome})


    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Internal Surver Error"})        
    }
}

const deleteIncome = async (req,res) =>{

    const { id } = req.params

    try {

        const income = await incomeModel.findByIdAndDelete(id)
        
        if(!income){
            return res.status(404).json({success:false,message:"Income Not Found"})
        }

        res.status(200).json({ success:true,message:"Income Deleted Successfully",income })

    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Internal Surver Error"})        
    }

}

const updateIncome = async (req,res) => {
    const {id} = req.params
    const { title,amount,type,income,date,category,description } = req.body

    try {
        const income = await incomeModel.findById(id)
        if(!income){
            returnres.status(404).json({success:false,message:"Income Not Found to Update"})
        }

        income.title = title || income.title
        income.amount = amount || income.amount
        income.category = category || income.category
        income.type = type || income.type
        income.date = date  || income.date 
        income.description = description || income.description
        income.income = income || income.income
        
        await income.save()

        res.status(200).json({success:true,message:"Income Updated",data: expense})

    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:" Internal Server Error"})  
    }

}

export {addIncome,deleteIncome,updateIncome}