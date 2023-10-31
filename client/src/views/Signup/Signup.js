import React, { useState } from "react";
import axios from "axios";
import showToast from "crunchy-toast";
import "./Signup.css";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("female");

  async function signupUser() {

    if (!name) {
      showToast("name is required", "alert", 5000);
      return;
    }
    if (!email) {
      showToast("email is required", "alert", 5000);
      return;
    }
    if (!password) {
      showToast("password is required", "alert", 5000);
      return;
    }
    if (!mobile) {
      showToast("mobile number is required", "alert", 5000);
      return;
    }
    if (!address) {
      showToast("address is required", "alert", 4000);
      return;
    }
    const response = await axios.post("/signup", {
      name: name,
      email: email,
      mobile: mobile,
      password: password,
      address: address,
      gender: gender,
    });
    console.log(response.data);


    if (response.data.success) 
    {
      showToast(response.data.message, "success", 3000);

      window.location.href = "/login";
    }
     else
      {
      showToast(response.data.message, "alert", 3000);
      setName("");
      setEmail("");
      setMobile("");
      setPassword("");
      setAddress("");
    }
  }
  return (
    <>

            <h2 className="text-center">SignUp </h2>
                <form>
                  <div className="">
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      placeholder="enter your fullname"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="">
                    <input
                      type="phone"
                      className="form-control"
                      id="mobile"
                      placeholder="Enter your mobile number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Enter your address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="d-flex justify-content-evenly">
                    <div>
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        className="gender"
                        checked={gender === "male"}
                        onClick={() => {
                          setGender("male");
                        }}
                      />
                      <label htmlFor="male">Male</label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        className="gender"
                        checked={gender === "female"}
                        onClick={() => {
                          setGender("female");
                        }}
                      />
                      <label htmlFor="female">Female</label>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn"
                    onClick={signupUser}>
                    <b>Signup</b>
                  </button>
                </form>
            
    </>
  );
}

export default SignUp;
