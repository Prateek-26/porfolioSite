import React, { useState } from "react";
import SigninPic from "../images/signin.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Signin() {
  const history = useNavigate();

  const [userkey, setUserKey] = useState({
    email: "",
    password: "",
  });

  // let email

  const handleChange = (e) => {
    // console.log("Changed!");
    setUserKey({
      ...userkey,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/signin",
        {
          userkey,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        window.alert("Successfully Logged In!");
        history("/");
      }
    } catch (err) {
      window.alert("User not logged In. Please try again!");
      history("/signin");
      console.log(`Error (by login FE) ${err}`);
    }
  };

  return (
    <>
      <section className="signup">
        <div className="row signup-content-container">
          <div className="col-sm-6 signup-form">
            <h1>SIGN IN</h1>
            <form method="POST" onSubmit={handleSubmit}>
              <div className="mb-3">
                <i className="fa-solid fa-envelope"></i>
                <input
                  type="email"
                  value={userkey.email}
                  onChange={handleChange}
                  className="form-control shadow-none"
                  placeholder="Your Email"
                  name="email"
                  required
                />
              </div>
              <div className="mb-3">
                <i className="fa-solid fa-lock"></i>
                <input
                  type="password"
                  value={userkey.password}
                  onChange={handleChange}
                  className="form-control shadow-none"
                  placeholder="Password"
                  name="password"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                name="login-btn"
              >
                Log In
              </button>
            </form>
          </div>
          <div className="col-sm-6 signup-image">
            <img src={SigninPic} height="400px" alt="login" srcSet="" />
            <NavLink to="/signup">
              <span>Create an Account</span>
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signin;
