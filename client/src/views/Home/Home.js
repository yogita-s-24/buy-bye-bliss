import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../../components/ProductCard/ProductCard';

function Home() {
  const [products, setProducts] = useState([]);

  const loadData = async ()=>{
    const response = await axios.get('/products');
     console.log(response?.data?.data);
  setProducts(response?.data?.data)
}

useEffect (()=>{
  loadData();
},[]);
  return (
    <div>
        <Navbar/>

        <div>
            <h2 className='text-center mt-3'></h2>
            </div>
            <section className='d-flex justify-content-evenly mt-5'>
                {
                    products?.map((product, index)=>{
                        const {name, description, image, price} = product;
                        return(
                            <ProductCard
                             key={index} 
                             name={name}
                             description={description}
                             image={image}
                             price={price}
                             />
                        )
                    })
                }
            </section>
    </div>
  )
}

export default Home