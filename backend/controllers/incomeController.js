import incomeModel from "../models/incomeSchema.js";

const addIncome = async (req, res) => {
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

    const newIncome = new incomeModel({
      userId,
      title,
      amount: parsedAmount,
      income,
      category,
      date,
      description,
    });

    await newIncome.save();

    return res.status(200).json({success: true,message: "Income added successfully",data: newIncome});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

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

const updateIncome = async (req, res) => {
  const { id } = req.params;
  const { title, amount, type, date, category, description } = req.body;

  try {
    const incomeUpdating = await incomeModel.findById(id);

    if (!incomeUpdating) {
      return res.status(404).json({ success: false, message: "Income not found" });
    }

    // Update only provided fields
    if (title) incomeUpdating.title = title;
    if (amount) incomeUpdating.amount = amount;
    if (type) incomeUpdating.type = type;
    if (category) incomeUpdating.category = category;
    if (date) incomeUpdating.date = date;
    if (description) incomeUpdating.description = description;

    await incomeUpdating.save();

    return res.status(200).json({success: true,message: "Income updated successfully",data: incomeUpdating,
    });
  } catch (error) {
    console.log("UPDATE INCOME ERROR:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getIncome = async (req,res) => { 
    
    try {        
        const userId = req.user?.id
        const incomeGeting = await incomeModel.find({userId:userId})
        if(!incomeGeting){
            return res.status(404).json({success:false,message:" Income Not Found "})
        }

        res.status(200).json({success:true,data:incomeGeting})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Internal Server Error"})        
    }
}

export {addIncome,deleteIncome,updateIncome,getIncome}