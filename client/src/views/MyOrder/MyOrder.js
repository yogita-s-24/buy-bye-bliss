import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'

function MyOrder() {
       const [userName, setuserName] = useState('');

       useEffect(()=>{
        const storageUser = JSON.parse(localStorage.getItem('user') || '{}');
        if(storageUser?.email){
            if(storageUser?.email){
                setuserName(storageUser);
            }
        }
        else{
         alert('Please login first 👍');
          window.location.href='/login';
        }
      },[]);

    return (
        <div>
            <Navbar />
            <h2>MyOrder</h2>
        </div>
    )
}

export default MyOrder