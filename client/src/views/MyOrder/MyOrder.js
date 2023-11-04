import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useParams } from "react-router-dom";
import "./MyOrder.css";

function MyOrder() {
  const [userName, setuserName] = useState("");
  const [orders, setOrder] = useState([]);


  const loadProductData = async () => {
    const localUserId = userName._id;
    if (!localUserId) {
      return;
    }
    // const response = await axios.get(`/order/user/${userName._id}`);
    // OR
    const response = await axios.get(`/order/user/${localUserId}`);
    console.log(response);
    setOrder(response?.data?.data);
  };

  useEffect(() => {
    loadProductData();
  }, [userName]);

  useEffect(() => {
    const storageUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storageUser?.email) {
      if (storageUser?.email) {
        setuserName(storageUser);
      }
    } else {
      alert("Please login first 👍");
      window.location.href = "/login";
    }
  }, []);

  return (
    <div>
      <Navbar />
      <h2 className="text-center mt-3">My Order</h2>
      <div className="main-container">
        {orders?.map((order, i) => {
          const { product, quantity, status, deliveryCharges } = order;
          return (
            <div className="order-container d-flex">
              <div className="">
                <img src={product.image} className="order-product-image" />
              </div>
              <div className="ms-5 mt-4 container">
                <p>{product.name}</p>
                <p>
                  {quantity} x {product.price} = ₹{quantity * product.price}
                </p>
                <p>Delivery Charges: Rs{deliveryCharges}</p>
                <p className="show-status">{status}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyOrder;
