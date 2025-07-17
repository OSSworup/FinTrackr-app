import cron from "node-cron";
import Recurring from "../models/recurringTransaction.js";
import Transaction from "../models/transaction.js";



function getIstDate(date=new Date()){
  const IST_OFFSET=5.5 * 60 * 60 * 1000;
  const ist=new Date(date.getTime() + IST_OFFSET);

  return new Date(Date.UTC(ist.getUTCFullYear(),ist.getUTCMonth(),ist.getUTCDate()));
}


cron.schedule("35 18 * * *", async () => {
  console.log("🔁 Recurring cron job started");

  const todayIST = getIstDate();

  console.log(`📅 Today (IST): ${todayIST.toISOString()}`);
  console.log(`🕓 Raw UTC Now: ${new Date().toISOString()}`);

  const recList = await Recurring.find({
    startDate: { $lte: todayIST },
    $or: [
      { endDate: { $eq: null } },
      { endDate: { $gte: todayIST } },
    ],
  });

  console.log(`🔍 Found ${recList.length} recurring transactions eligible for today`);
  if (recList.length === 0) {
    console.log("⚠️ No recurring transactions matched the date conditions.");
  }

  for (const rec of recList) {
    try{

      const nextDate = getNextRunDate(rec.startDate, rec.recurrence, rec.lastRun);

      if (nextDate.getTime() === todayIST.getTime()) {
        console.log(`📌 Processing recurring: ${rec.label}`);

        console.log(`🧾 Creating transaction for userID: ${rec.userID}, amount: ${rec.amount}, type: ${rec.type}`);
        await Transaction.create({
          userID: rec.userID,
          label: rec.label,
          amount: rec.amount,
          type: rec.type,
          date: todayIST,
          sourceRecurring: rec._id,
        });

        rec.lastRun = todayIST;
        await rec.save();

        console.log(`✅ Created normal transaction for ${rec.label}`);
      }else{
        console.log(`⏳ Skipped ${rec.label} — nextDate: ${nextDate.toISOString()}, todayIST: ${todayIST.toISOString()}`);
      }
    }catch(err){
      console.log(`❌ Error processing recurring ${rec.label}:`, err);
    }
  }

  console.log("✅ Recurring cron job finished");
});

function getNextRunDate(startDate, recurrence, lastRun) {
  if (!lastRun) {
    return getIstDate(new Date(startDate));
  }

  const base = new Date(lastRun);

  if (recurrence === "Daily")   base.setDate(base.getDate() + 1);
  if (recurrence === "Weekly")  base.setDate(base.getDate() + 7);
  if (recurrence === "Monthly") base.setMonth(base.getMonth() + 1);

  return getIstDate(base);
}

