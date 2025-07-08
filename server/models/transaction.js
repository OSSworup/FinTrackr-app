import mongoose from "mongoose";

const transactionSchema=new mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    type:{
        type:String,
        enum:['credit','debit'],
        required:true
    },

    amount:{
        type:Number,
        required:true,
        min:0
    },

    label:{
        type:String,
        required:true,
        trim:true
    },

    date:{
        type:Date,
        required:true
    },

    category:{
        type:String,
        default:'General'
    },

    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Transaction=mongoose.model('Transaction',transactionSchema);

export default Transaction;