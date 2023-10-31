import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import showToast from "crunchy-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () =>{
    if(email === ""){
      showToast('Please field password',"alert",3000);
    }

    if(password === ""){
      showToast('Please field Email',"alert",3000);
    }
    const response = await axios.post("/login",{email,password});

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
  

  return (
    <div>
      <section class="form mx-5 my-4">
        <div class="container w-50 ">
          <div class="row border shadow ">
            <h1 className="text-center">
              <i>"Buy-Bye-Bliss"</i>
            </h1>
            <h2 className="text-center text-secondary">Login Here </h2>
            <div className="mt-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-3">
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
              <button type="button" className="btn btn-primary my-3 px-5" onClick={loginUser}>
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
