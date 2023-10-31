import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import showToast from "crunchy-toast";
import Navbar from "../../components/Navbar/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () =>{
    if(email === ""){
      showToast(response.data.message,"alert",3000);
    }

    if(password === ""){
      showToast(response.data.message ,"alert",3000);
    }
    const response = await axios.post("/login",{
      email,
      password
    });

    console.log(response?.data);

    if(response?.data.success){
      showToast(response.data.message, "success" , 3000);
      localStorage.setItem('user', JSON.stringify(response?.data.data));
      window.location.href="/";
    }
    else{
      showToast(response.data.message, "warning" , 3000);
    }
  }
  
  useEffect(()=>{
    const storageUser = JSON.parse(localStorage.getItem('user') || '{}');
    if(storageUser?.email){
     alert('You are already Logged In.');
      window.location.href='/';
    }
  },[]);

  return (
    <div>
      <Navbar/>
      <section class="form mx-2 my-4">
        <div class="container w-50 ">
          <div class="row shadow rounded-3 mx-auto" style={{border:"1px solid grey", width:"28rem"}} >
          <h3 className="text-center mt-4"><i>"Buy-Bye-Bliss Shopee"</i> </h3>
              <h4 className="text-center text-secondary">Login Here </h4>
            <div className="mt-3 w-75 mx-auto">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-3 w-75 mx-auto">
              <input
                type="password"
                className="form-control "
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="text-center">
              <button type="button" className="btn btn-primary my-4 px-5" onClick={loginUser}>
                <b>Login </b>
              </button>
              <p className="text-center">
                <Link to="/signup">Don't have an account? Sign up now.</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      


       

      </div>
     
  
  );
}

export default Login;
