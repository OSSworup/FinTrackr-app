import express from 'express';
const app=express();
import 'dotenv/config';
import cors from 'cors';

import db from './utils/db.js';

import bodyParser from 'body-parser';
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:5173', 
  credentials: true 
}))

import "./cron/recurringRunner.js";

import userRoute from './routes/userRoute.js'
app.use('/user',userRoute);

import transactionRoute from './routes/transactionRoute.js'
app.use('/transaction',transactionRoute);

import recurringTransactionRoute from './routes/recurringTransactionRoute.js'
app.use('/recurringTransaction',recurringTransactionRoute);

app.get('/',(req,res)=>{
    res.send("Expense Tracker & Forcast Web application")
})

app.listen(4000,()=>{
    console.log('Listening to port 4000')
});