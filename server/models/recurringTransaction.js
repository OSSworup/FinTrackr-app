import mongoose from 'mongoose';

const recurringTransactionSchema=new mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    label:{
        type:String,
        required:true
    },

    amount:{
        type:Number,
        required:true
    },

    type:{
        type:String,
        enum:['credit','debit'],
        required:true
    },

    recurrence:{
        type:String,
        enum:['Daily','Weekly','Monthly'],
        required:true
    },

    startDate:{
        type:Date,
        required:true
    },

    endDate:{
        type:Date,
        default:null
    },

    lastRun: {
        type: Date,
        default: null,
    },

    createdAt:{
        type:Date,
        default:Date.now
    }
});

const RecurringTransaction=new mongoose.model('RecurringTransaction',recurringTransactionSchema);

export default RecurringTransaction;