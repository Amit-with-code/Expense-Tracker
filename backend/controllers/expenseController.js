import expenseModel from "../models/expenseSchema.js";

const addExpense = async (req, res) => {
  const userId = req.user?.id;

  const { title, amount, income, date, category, description } = req.body;

  const parsedAmount = Number(amount);

  try {
    if (!title || !amount || !date || !category || !description ) {
      return res.status(400).json({success: false,message: "All fields are required"});
    }

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({success: false,message: "Amount must be a positive number"});
    }

    const newExpense = new expenseModel({
      userId,
      title,
      amount: parsedAmount,
      income,
      category,
      date,
      description,
    });

    await newExpense.save();

    return res.status(200).json({success: true,message: "Expense added successfully",data: newExpense});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteExpense = async (req,res) =>{

    const { id } = req.params

    try {

        const expense = await expenseModel.findByIdAndDelete(id)
        
        if(!expense){
            return res.status(404).json({success:false,message:"Expense Not Found"})
        }

        res.status(200).json({ success:true,message:"Expense Deleted Successfully",expense })

    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Internal Surver Error"})        
    }

}

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { title, amount, type, date, category, description } = req.body;

  try {
    const expenseUpdating = await expenseModel.findById(id);

    if (!expenseUpdating) {
      return res.status(404).json({ success: false, message: "Expense not found" });
    }

    // Update only provided fields
    if (title) expenseUpdating.title = title;
    if (amount) expenseUpdating.amount = amount;
    if (type) expenseUpdating.type = type;
    if (category) expenseUpdating.category = category;
    if (date) expenseUpdating.date = date;
    if (description) expenseUpdating.description = description;

    await expenseUpdating.save();

    return res.status(200).json({success: true,message: "Expense updated successfully",data: expenseUpdating,
    });
  } catch (error) {
    console.log("UPDATE EXPENSE ERROR:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getExpense = async (req,res) => { 
    
    try {        
        const userId = req.user?.id
        const expenseGeting = await expenseModel.find({userId:userId})
        if(!expenseGeting){
            return res.status(404).json({success:false,message:" Expense Not Found "})
        }

        res.status(200).json({success:true,data:expenseGeting})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Internal Server Error"})        
    }
}

export {addExpense,deleteExpense,updateExpense,getExpense}