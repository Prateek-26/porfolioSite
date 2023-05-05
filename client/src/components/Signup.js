import React, { useState } from "react";
import loginPic from "../images/login2.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {

  const history = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  let name, value;

  const handleChanges = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { name, email, phone, work, password, cpassword } = user;

    // let respose;

    try {
      const response = await axios.post("http://localhost:8080/signup", {
        user,
      });
      console.log(response);

      if(response.status === 201){
        console.log("Successfull Registration");
        window.alert("Successfull Registration!");
        history("/login");
      }
      
    } catch (error) {
      console.log("Error (React):" + error);
      window.alert("Registration Unsuccessfull")
    }
  };

  return (
    <>
      <section className="signup">
        <div className="row signup-content-container">
          <div className="col-sm-6 signup-form">
            <h1>REGISTER</h1>
            <form method="POST" onSubmit={PostData}>
              <div className="mb-3">
                <i className="fa-solid fa-user"></i>
                <input
                  type="text"
                  value={user.name}
                  onChange={handleChanges}
                  className="form-control shadow-none"
                  id="name"
                  placeholder="Your Name"
                  name="name"
                  required
                />
              </div>
              <div className="mb-3">
                <i className="fa-solid fa-envelope"></i>
                <input
                  type="email"
                  value={user.email}
                  onChange={handleChanges}
                  className="form-control shadow-none"
                  placeholder="Your Email"
                  name="email"
                  required
                />
              </div>
              <div className="mb-3">
                <i className="fa-solid fa-phone"></i>
                <input
                  type="number"
                  value={user.phone}
                  onChange={handleChanges}
                  className="form-control shadow-none"
                  id="phone"
                  placeholder="Mobile Number"
                  name="phone"
                  required
                />
              </div>
              <div className="mb-3">
                <i className="fa-solid fa-user-tie"></i>
                <input
                  type="text"
                  value={user.work}
                  onChange={handleChanges}
                  className="form-control shadow-none"
                  name="work"
                  placeholder="Your Profession"
                  required
                />
              </div>
              <div className="mb-3">
                <i className="fa-solid fa-lock"></i>
                <input
                  type="password"
                  value={user.password}
                  onChange={handleChanges}
                  className="form-control shadow-none"
                  placeholder="Password"
                  name="password"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  value={user.cpassword}
                  onChange={handleChanges}
                  className="form-control shadow-none"
                  placeholder="Confirm your password"
                  name="cpassword"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                name="register-btn"
              >
                Register
              </button>
            </form>
          </div>
          <div className="col-sm-6 signup-image">
            <img src={loginPic} height="400px" alt="login" srcSet="" />
            <NavLink to="/login">
              <span>Already Loged In ?</span>
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signup;
