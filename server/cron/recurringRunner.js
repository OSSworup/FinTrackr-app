import cron from "node-cron";
import Recurring from "../models/recurringTransaction.js";
import Transaction from "../models/transaction.js";
import mongoose from "mongoose";


function stripToUTC(date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}


cron.schedule("5 0 * * *", async () => {
  console.log("🔁 Recurring cron job started");

  const todayUTC = stripToUTC(new Date());   

  const recList = await Recurring.find({
    startDate: { $lte: todayUTC },
    $or: [
      { endDate: { $eq: null } },
      { endDate: { $gte: todayUTC } },
    ],
  });


  for (const rec of recList) {
    const nextDate = getNextRunDate(rec.startDate, rec.recurrence, rec.lastRun);

    if (nextDate.getTime() === todayUTC.getTime()) {
      console.log(`📌 Processing recurring: ${rec.label}`);

      await Transaction.create({
        userID: rec.userID,
        label: rec.label,
        amount: rec.amount,
        type: rec.type,
        date: todayUTC,
        sourceRecurring: rec._id,
      });

      rec.lastRun = todayUTC;
      await rec.save();

      console.log(`✅ Created normal transaction for ${rec.label}`);
    }
  }

  console.log("✅ Recurring cron job finished");
});

function getNextRunDate(startDate, recurrence, lastRun) {
  if (!lastRun) {
    return stripToUTC(new Date(startDate));
  }

  const base = new Date(lastRun);

  if (recurrence === "Daily")   base.setDate(base.getDate() + 1);
  if (recurrence === "Weekly")  base.setDate(base.getDate() + 7);
  if (recurrence === "Monthly") base.setMonth(base.getMonth() + 1);

  return stripToUTC(base);
}

