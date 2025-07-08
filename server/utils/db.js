import mongoose from 'mongoose';

const mongoURL=process.env.MONGODB_URL;

mongoose.connect(mongoURL).then(()=>console.log("Connected to Database")).catch((error)=>console.log("Database Connection error",error));

const db=mongoose.connection;

db.on('error',(err)=>{
    console.log("MongoDB Error",err);
})

db.on('disconnected',()=>{
    console.log("Disconnected to mongodb");
});

export default db;
