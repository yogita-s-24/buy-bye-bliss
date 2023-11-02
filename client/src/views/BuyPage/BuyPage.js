import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import axios from 'axios';
import './BuyPage.css';

function BuyPage() {
    const {_id} = useParams();

    const [product, setProduct] = useState({});

    const loadProductData= async () =>{
        if(!_id){
            return;
        }
        try{
            const response = await axios.get(`/product/${_id}`);
           //  console.log(response);
           setProduct(response?.data?.data);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        loadProductData();
    })

  return (
    <div>
    <Navbar/>
    
    <div className='buy-product-container'>
    <img src={product.image} alt="image" className='buy-product-image'/>
    <h1>{product.name}</h1>
    <p>{product.description}</p>

    </div>
    </div>
  )
}

export default BuyPage