import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Home.css'

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  const searchProducts = async() =>{
    if(search === ''){
      loadData();
      return;
    }

    const response = await axios.get(`/search?q=${search}`);
    setProducts(response?.data?.data);
  }

  useEffect(()=>{
    searchProducts();
  },[search]);

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
  <input type='text'
  className='form-control w-25 mx-auto mt-5'
  placeholder='Search Here'
  value={search}
  onChange={(e)=>{
    setSearch(e.target.value);
  }}

  />

</div>
        <div>
            <h2 className='text-center'></h2>
            </div>
            <section className='product-card-content'>
                {
                    products?.map((product, index)=>{
                        const {_id, name, description, image, price} = product;
                        return(
                            <ProductCard
                             key={index}
                             name={name}
                             description={description}
                             image={image}
                             price={price}
                             _id={ _id }
                             />
                        )
                    })
                }
            </section>
    </div>
  )
}

export default Home

