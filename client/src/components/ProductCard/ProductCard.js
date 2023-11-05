import React from 'react'
import './ProductCard.css'
import { Link } from 'react-router-dom'

function ProductCard({_id, name, description, image, price}) {

  return (
    <div className='mt-5'>
        <div className='product-card-container'>
        <img src={image} alt="pic" className='product-image'/>
        <p className='product-card-title'>{name}</p>
        <p className='product-card-description'>{description}</p>
        {/* <hr/> */}
        <p className='price text-primary text-center'> Price : ₹{price}</p>
        <div className='text-center'>
        <Link to={`/buy/${_id}`} className='btn btn-primary px-5'>
          Buy Now
        </Link>
</div>
        </div>
      
    </div>
  )
}

export default ProductCard