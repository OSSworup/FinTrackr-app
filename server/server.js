import express from 'express';
const app=express();
import 'dotenv/config';
import cors from 'cors';

import db from './utils/db.js';

import bodyParser from 'body-parser';
app.use(bodyParser.json());

const allowedOrigins = [
  'http://localhost:5173',
  'https://mern-finance-planner-frontend.onrender.com'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like curl or Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

import "./cron/recurringRunner.js";

const port=process.env.PORT || 4000;

import userRoute from './routes/userRoute.js'
app.use('/user',userRoute);

import transactionRoute from './routes/transactionRoute.js'
app.use('/transaction',transactionRoute);

import recurringTransactionRoute from './routes/recurringTransactionRoute.js'
app.use('/recurringTransaction',recurringTransactionRoute);

app.get('/',(req,res)=>{
    res.send("Expense Tracker & Forcast Web application")
})

app.listen(port,()=>{
    console.log('Listening to port 4000')
});
