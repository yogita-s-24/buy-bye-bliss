import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

const connectMongoDB = async () => {
    const conn = await mongoose.connect(MONGODB_URI);
  
    if (conn) {
      console.log("Connected to MongoDB Successfully...");
    }
  };
  connectMongoDB();

  app.listen(PORT, ()=>{
    console.log('Server is running on port 5000');
  })