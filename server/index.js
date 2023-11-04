import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//models
import User from "./models/User.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";

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
    password: password,
  });

  if (user) {
    return res.json({
      success: true,
      data: user,
      message: "Login successful",
    });
  } else {
    return res.json({
      success: false,
      message: "Invalid credentials",
    });
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

//GET  - get/products
app.get("/products", async (req, res) => {
  const allproducts = await Product.find();

  res.json({
    success: true,
    data: allproducts,
    message: "All products get successfully",
  });
});

//POST - post/product

app.post("/product", async (req, res) => {
  const { name, description, price, image, category, brand } = req.body;

  //instance
  const newproduct = new Product({
    name: name,
    description: description,
    price: price,
    image: image,
    category: category,
    brand: brand,
  });

  try {
    const saveproduct = await newproduct.save();

    res.json({
      success: true,
      data: saveproduct,
      message: "Product created successfuly",
    });
  } catch (err) {
    res.json({
      success: false,
      error: err,
    });
  }
});

//GET - get/product/:id

app.get("/product/:id", async (req, res) => {
  const { id } = req.params;

  const findProduct = await Product.findById({ _id: id });

  res.json({
    success: true,
    data: findProduct,
    message: "Product find successful using ID.",
  });
});

//DELETE - delete/product/:id

app.delete("/product/:id", async (req, res) => {
  const { id } = req.params;
  await Product.deleteOne({ _id: id });

  res.json({
    success: true,
    message: "Product deleted successfuly",
  });
});

// //PUT - put/product/:id

app.put("/product/:id", async (req, res) => {
  const { id } = req.params;

  const { name, price, description, category, quantity, image, brand } =
    req.body;

  await Product.updateOne(
    { _id: id },
    {
      $set: {
        name,
        price,
        description,
        category,
        quantity,
        image,
        brand,
      },
    }
  );

  try {
    const findProduct = await Product.findOne({ _id: id });
    res.json({
      success: true,
      data: findProduct,
      message: "Product updated successfully.",
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Not find updated product.",
    });
  }
});

//GET - get/product/search/query

app.get("/search", async (req, res) => {
  const { q } = req.query;

  const productSearch = await Product.findOne({
    name: { $regex: q, $options: "i" },
  });

  res.json({
    success: true,
    data: productSearch,
    message: "Product fetch Successfully",
  });
});

// //POST - /order
app.post("/order", async (req, res) => {
  const { user, product, quantity, price, deliveryCharges, shippingAddress } =
    req.body;

  const order = new Order({
    user,
    product,
    quantity,
    price,
    deliveryCharges,
    shippingAddress,
  });

  try {
    const saveUserOrder = await order.save();
    res.json({
      success: true,
      data: saveUserOrder,
      message: "Order save Successfuly.",
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
});

//GET /orders/:id
app.get("/order/:id", async (req, res) => {
  const { id } = req.params;
  const findOrder = await Order.findById(id).populate("user product");

  //This not show in order
  findOrder.user.password = undefined;

  res
    .json({
      success: true,
      data: findOrder,
      message: "Order successfully found",
    })
    .populate("user product");
});

//GET - /orders/user/:id
//how many orders are ordered by one user

app.get("/order/user/:_id", async (req, res) => {
  const { _id } = req.params;
  const ordersByUserId = await Order.find({ user: _id }).populate(
    "user product"
  );

  res.json({
    success: true,
    data: ordersByUserId,
    message: "Orders by User ID",
  });
});

//PATCH - /order/status/:id
app.patch("/order/status/:id", async (req, res) => {
  const { id } = req.params;
  const {status} = req.body;

  const STATUS_PRIORITY_MAP = {
    pending: 0,
    shipped: 1,
    delivered: 2,
    returned: 3,
    cancelled: 4,
    rejected: 5,
  };

  const order = await Order.findById(id);
  const currentStatus = order.status; 

  const currentPriority = STATUS_PRIORITY_MAP[currentStatus];

  const newPriority = STATUS_PRIORITY_MAP[status];

  await Order.updateOne({ _id: id }, { $set: { status: status }});

  if(currentPriority > newPriority){
    return res.json({
      success: false,     
    })
  }

  res.json({
    success: true,
    message: "Order status updated",
  });
});

//GET - /orders

app.get("/orders", async (req, res) => {
  const allOrders = await Order.find().populate("user product");

  allOrders.forEach((order) => {
    order.user.password = undefined;
  });

  try {
    res.json({
      success: true,
      data: allOrders,
      message: "Orders fetched successfuly",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Orders not fetched successfuly",
    });
  }
});

//port
const PORT = process.env.PROT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on port 5000");
});
