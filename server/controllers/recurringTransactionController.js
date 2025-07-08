import RecurringTransaction from "../models/recurringTransaction.js";

export const addRecurringTransaction=async (req,res)=>{
    try{
        const user=req.user;
        const data=req.body;
        const newRecurringTransaction=new RecurringTransaction({
            userID:user.id,
            ...data
        });

        const response=await newRecurringTransaction.save();
        console.log("Recurring Transaction added");
        res.status(200).json({Message:'Recurring Transaction Added',response});
    }catch(error){
        console.log(error);
        res.status(500).json({Message:'Internal Server Error'})
    }
}

export const getAllRecurringTransaction=async (req,res)=>{
    try{
        const id=req.user.id;
        const recurringTransactions=await RecurringTransaction.find({userID:id});
        res.status(200).json({Message:'RecurringTransactions:',recurringTransactions});
    }catch(error){
        res.status(500).json({Error:"Internal Server error"});
        console.log(error);
    }
}


export const updateRecurringTransaction=async (req,res)=>{
    try{
        const id=req.params.id;
        const data=req.body;

        const response=await RecurringTransaction.findByIdAndUpdate(id,data,{
            new:true,
            runValidators:true
        });

        if(!response){
            res.status(404).json({Error:"Recurring Transaction Does not exist"});
        }
        console.log('Recurring Transaction updated');
        res.status(200).json(response);
    }catch(error){
        res.status(500).json({Error:"Internal Server error"});
        console.log(error);
    }
}

export const deleteRecurringTransaction=async (req,res)=>{
    try{
        const id=req.params.id;
        const response=await RecurringTransaction.findByIdAndDelete(id);

        if(!response){
            res.status(404).json({Error:"Recurring Transaction does not exist"});
        }

        console.log("Recurring Transaction removed");
        res.status(200).json({Message:"Recurring Transaction removed"});
    }catch(error){
        res.status(500).json({Error:"Internal Server error"});
        console.log(error);
    }
}