import Transaction from "../models/transaction.js";


export const addTransaction=async (req,res)=>{
    try{
        const user=req.user;
        const data=req.body;
        const newTransaction=new Transaction({
            userID:user.id,
            ...data
        });

        const response=await newTransaction.save();
        res.status(200).json({Message:'Transaction added',response});
    }catch(error){
        res.status(500).json({Error:"Internal Server error"});
        console.log(error);
    }
}

export const getAllTransaction=async (req,res)=>{
    try{
        const id=req.user.id;
        const transactions=await Transaction.find({userID:id});
        res.status(200).json({Message:'Transactions:',transactions});
    }catch(error){
        res.status(500).json({Error:"Internal Server error"});
        console.log(error);
    }
}

export const updateTransaction=async (req,res)=>{
    try{
        const id=req.params.id;
        const data=req.body;

        const response=await Transaction.findByIdAndUpdate(id,data,{
            new:true,
            runValidators:true
        });

        if(!response){
            res.status(404).json({Error:"Transaction Does not exist"});
        }
        console.log('Transaction updated');
        res.status(200).json(response);
    }catch(error){
        res.status(500).json({Error:"Internal Server error"});
        console.log(error);
    }
}

export const deleteTransaction=async (req,res)=>{
    try{
        const id=req.params.id;
        const response=await Transaction.findByIdAndDelete(id);

        if(!response){
            res.status(404).json({Error:"Transaction does not exist"});
        }

        console.log("Transaction removed");
        res.status(200).json({Message:"Transaction removed"});
    }catch(error){
        res.status(500).json({Error:"Internal Server error"});
        console.log(error);
    }
}
