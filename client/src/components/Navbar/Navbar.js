import React, { useEffect, useState } from "react";
import { Link, json } from "react-router-dom";
import './Navbar.css'

function Navbar() {
    //its show for userName 
    const [userName, setuserName] = useState('');

    useEffect(()=>{
     const userFromLocalStorage =  JSON.parse(localStorage.getItem('user') || "{}");
     setuserName(userFromLocalStorage);
    },[]);

    return (
        <>
            <div className="sticky-top">
                <nav className="navbar navbar-expand-lg navbar-light d-flex justify-content-between align-items-center px-5 py-3"
                style={{backgroundColor:'#b3d1ff'}}
                >

                  

                        <div>
                            <Link to="/" className="text-decoration text-dark "><h6 className="fs-5"><b><i>Buy-Bye-Bliss</i>🛒</b></h6></Link>
                        </div>

                        <div className="text-decoration">
                            <Link to='/' className="me-4 fs-5 text-decoration text-dark ">Home</Link>
                            <Link to='/login' className="me-4 fs-5 text-decoration text-dark">Login</Link>
                            <Link to='/signup' className="me-4 fs-5 text-decoration text-dark">SignUp</Link>
                            <Link to='/myorder' className="me-4 fs-5 text-decoration text-dark">MyOrders</Link>
                        </div>

                        <div>
                            Hello, { userName.name || " User "} !
                            {
                                userName?.name ? 
                                (
                                    <span className="" onClick={()=>{
                                        localStorage.removeItem("user");
                                        window.location.href='/login';
                                    }}> Logout</span> 
                                ) 
                                : 
                                null
                            }
                        </div>

                 

                </nav >
            </div>
        </>
    );
}

export default Navbar;
