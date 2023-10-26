import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import User from "./models/User.js";

const app = express();

app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;

const connectMongoDB = async () => {
  const conn = await mongoose.connect(MONGODB_URI);

  if (conn) {
    console.log("Connected to MongoDB Successfully...");
  }
};
connectMongoDB();

//Post/login
app.post("/login", async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
   return res.json({
      success: false,
      message: "Please provide email and password",
    });
  }

  const user = await User.findOne({
    email: email,
    password : password
  })

  if(user){
    return res.json({
      success: true,
      data :user,
      message:"Login successful"
    });
    }
    else
    {
      return res.json({
        success:false,
        message:'Invalid credentials'
        })
  }
});

//Post/signup
app.post("/signup", async (req, res) => {
  const { name, email, password, mobile, address, gender } = req.body;

  //instance
  const user = new User({
    name: name,
    email: email,
    password: password,
    mobile: mobile,
    address: address,
    gender: gender,
  });

  try {
    const savedUser = await user.save();
    res.json({
      success: true,
      data: savedUser,
      message: "SignUp Successful",
    });
  } catch (err) {
    res.json({
      success: false,
      message: email.message,
    });
  }
});

//port
const PORT = process.env.PROT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on port 5000");
});
