import React from 'react'
import './ProductCard.css'

function ProductCard({name, description, image, price}) {

  return (
    <div>
        <div className='product-card-container'>
        <img src={image} alt="pic" className='product-image'/>
        <p className='product-card-title'>{name}</p>
        <p className='product-card-description'>{description}</p>
        {/* <hr/> */}
        <p className='price text-primary text-center'> Price : ₹{price}</p>
        <div className='text-center'>
        <button className='btn btn-primary px-5'>Buy Now</button>
</div>
        </div>
      
    </div>
  )
}

export default ProductCard