import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import axios from 'axios';
import './BuyPage.css';

function BuyPage() {
    const { _id } = useParams();

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [shippingAddress, setShippingAddress] = useState('');

    const loadProductData = async () => {
        if (!_id) {
            return;
        }
        try {
            const response = await axios.get(`/product/${_id}`);
            //  console.log(response);
            setProduct(response?.data?.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadProductData();
    })

    const decQuantity=()=>{
        if(quantity===1)
        return;
        setQuantity(quantity-1);
    }
    const incQuantity=()=>{
        setQuantity(quantity+1);
    }

    const placeOrder = async ()=>{
        const currentUser = JSON.parse(localStorage.getItem("User") || '{}');

        const orderDetails = {
            user : currentUser._id,
            product: _id,
            quantity: quantity,
            shippingAddress: shippingAddress
        }

        const response = await axios.post('/order', orderDetails);
        alert('Your Order has been placed successfully!')
        if(response?.data?.data){
            window.location.href='/orders'
        }
    } 

    return (
        <div>
            <Navbar />

            <div className='buy-product-container '>
                <div className='buy-product-info'>
                    <div>
                        <img src={product.image} alt="image" className='buy-product-image' />

                    </div>
                    <div className='m-5'>
                        <h4>₹ {product.price}</h4>
                        <h1>{product.name}</h1>
                        <p>{product.description}</p>
                    <div className='d-inline p-2 btn-container shadow'>
                        <span className='btn-decrease-quantity shadow p-1 mx-2' onClick={decQuantity}>➖</span>
                        <span className='quantity-text fs-3'>{quantity}</span>
                        <span className='btn-increase-quantity shadow p-1 mx-2' onClick={incQuantity}>➕</span>
                    </div>
                    <div>
                    <input type="text" 
                    className='mt-3 input-box-field shadow' 
                    placeholder='Enter Your Shipping Address'
                    onChange={(e)=>{
                        setShippingAddress(e.target.value)
                    }}
                    />

                    </div>
                    </div>


                </div>
                <div className='text-center'>
                    <button className='btn btn-primary px-5'onClick={placeOrder}>Place Order</button>
                </div>
            </div>
        </div>
    )
}

export default BuyPage