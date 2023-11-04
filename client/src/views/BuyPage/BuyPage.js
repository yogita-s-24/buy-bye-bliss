import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import "./BuyPage.css";

function BuyPage() {
    const { _id } = useParams();

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [shippingAddress, setShippingAddress] = useState("");
    const [deliveryCharges, setDeliveryCharges] = useState(0);

    const loadProductData = async () => {
        if (!_id) {
            return;
        }
        try {
            const response = await axios.get(`/product/${_id}`);
            //  console.log(response);
            setProduct(response?.data?.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadProductData();
    }, [_id]);

    const decQuantity = () => {
        if (quantity === 1) return;
        setQuantity(quantity - 1);
    };
    const incQuantity = () => {
        setQuantity(quantity + 1);
    };

    const placeOrder = async () => {
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

        const orderDetails = {
            user: currentUser._id,
            product: _id,
            quantity: quantity,
            shippingAddress: shippingAddress,
            deliveryCharges: deliveryCharges,
            price : product.price
        };

        const response = await axios.post("/order", orderDetails);
        alert("Your Order has been placed successfully!");
        if (response?.data?.data) {
            window.location.href='/myorder';
        }
    };

    return (
        <div>
            <Navbar />

            <div className="buy-product-container">
                <div className="buy-product-info">
                    <div>
                        <img
                            src={product.image}
                            alt="image"
                            className="buy-product-image"
                        />
                    </div>
                    <div className="m-5">
                        <h4>₹ {product.price}</h4>
                        <h1>{product.name}</h1>
                        <p>{product.description}</p>

                   

                        <div className="btn-container m-0 ">
                            <span
                                className="btn-decrease-quantity p-1 mx-3 shadow"
                                onClick={decQuantity}>
                                ➖
                            </span>
                            <span className="quantity-text fs-3">{quantity}</span>
                            <span
                                className="btn-increase-quantity p-1 mx-3 shadow"
                                onClick={incQuantity}>
                                ➕
                            </span>
                        </div>
                        <div className="delivery-container p-2 shadow mt-3">
                            <div className="">
                                <input
                                    type="radio"
                                    id="40"
                                    name=""
                                    className="me-1"
                                    checked={deliveryCharges === 40}
                                    onClick={() => {
                                        setDeliveryCharges(40);
                                    }}
                                />
                                <label htmlFor="40"> Delivery in 3 days in Rs 40</label>
                            </div>

                            <div>
                                <input
                                    type="radio"
                                    id="100"
                                    name=""
                                    className=" me-1"
                                    checked={deliveryCharges === 100}
                                    onClick={() => {
                                        setDeliveryCharges(100);
                                    }}
                                />
                                <label htmlFor="100">Fast Delivery in Rs 100 </label>
                            </div>

                        </div>


                        <div>
                            <input
                                type="text"
                                className="mt-3 input-box-field shadow"
                                placeholder="Enter Your Shipping Address"
                                onChange={(e) => {
                                    setShippingAddress(e.target.value);
                                }}
                            />
                        </div>
                        <button className="btn btn-primary px-5 mt-4" onClick={placeOrder}>
                            Place Order
                        </button>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default BuyPage;
