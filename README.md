# 💰 MERN Finance Planner

A full-stack personal finance planner built with the MERN stack (MongoDB, Express, React, Node.js).  
Track your income, expenses, and automate recurring transactions with a clean dashboard UI and powerful backend logic.

> Built by **Omm Subham Sworup Ojha**

---

## 🚀 Features

### ✅ Core Functionality
- User authentication using JWT & bcrypt
- Add, edit, and delete income and expense transactions
- Balance summary and transaction history
- Automatic handling of recurring transactions via backend cron job
- Secure user-specific data isolation

### 🔁 Recurring Transactions
- Add recurring transactions (Daily / Weekly / Monthly)
- Stored in a separate collection (`recurringTransaction`)
- Backend cron job (node-cron) runs daily at **12:05 AM UTC**
- Automatically creates normal transactions on their scheduled dates
- `lastRun` field prevents duplicate entries

### 🧠 Planned Features
- Forecast future balance
- Filter and sort transactions
- Graphs & charts for spending visualization

---

## 🧱 Tech Stack

### Frontend
- **React 19** with **Vite**
- TailwindCSS
- React Query (`@tanstack/react-query`)
- React Hook Form
- Axios
- Lucide Icons + React Icons
- React Router DOM

### Backend
- **Node.js + Express 5**
- MongoDB with Mongoose
- JWT Auth + bcrypt for password hashing
- node-cron for background recurring logic
- dotenv, CORS, nodemon

---

## 🖼 Dashboard UI Components

- `Header` – Logout + App Name
- `BalanceCard` – Shows total current balance
- `TransactionForm` – Add/edit normal transactions
- `TransactionTable` – View, edit, delete normal transactions
- `RecurringTable` – View, edit, delete recurring transactions

---

## 🔐 Authentication

- User registration and login with secure JWT tokens
- Passwords are hashed using bcrypt
- Frontend stores the token in `localStorage`
- All protected routes verify token on frontend and backend

---

## 🗃 Database Models

### User
Basic user info + hashed password

### Transaction
```js
{
  userID,
  label,
  amount,
  type: 'credit' | 'debit',
  date,
  sourceRecurring: optional,
}

```
### Recurring Transaction

```js

{
  userID,
  label,
  amount,
  type: 'credit' | 'debit',
  recurrence: 'Daily' | 'Weekly' | 'Monthly',
  startDate,
  endDate: optional,
  lastRun: optional
}
```

### Running Locally
### Prerequisites
Node.js + npm

MongoDB URI (MongoDB Atlas or local)

### Environment Variables
In server/.env:

MONGODB_URL=your_mongo_uri
JWT_SECRET=your_jwt_secret

### Install dependencies
git clone [https://github.com/your-username/mern-finance-planner](https://github.com/OSSworup/mern-finance-planner).git
cd mern-finance-planner

npm install           # installs root dependencies (concurrently)
cd client && npm install
cd ../server && npm install
cd ..

### Run the full app

npm run dev


### Cron Job Logic
Uses node-cron

Scheduled to run: "5 0 * * *" (12:05 AM UTC every day)

On match date:

Creates a normal transaction

Updates lastRun to prevent duplicate processing

Uses UTC date matching to avoid timezone issues

### Testing
During testing:

Cron was set to run every minute (* * * * *)

Logs confirmed correct insertions

After testing, reverted to production schedule ("5 0 * * *")


### 👤 Author
Omm Subham Sworup Ojha

BSc Computer Science Graduate

Aspiring Full-Stack Web Developer

