import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
    default: 0,
  },

  price: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },

  deliveryCharges: {
    type: Number,
    required: true,
  },
  
  shippingAddress: {
    type: String,
    required: true,
  },
});

const Order = model("Order", orderSchema);

export default Order;
