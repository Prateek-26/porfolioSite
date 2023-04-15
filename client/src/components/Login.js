import React from "react";
import SigninPic from "../images/signin.jpg";
import { NavLink } from "react-router-dom";

function Login(){
    return(
        <>
            <section className="signup">
                <div className="row signup-content-container">
                <div className="col-sm-6 signup-form">
                        <h1>SIGN IN</h1>
                            <form>
                            
                            <div class="mb-3">
                            <i class="fa-solid fa-envelope"></i>
                                <input type="email" class="form-control shadow-none" placeholder="Your Email" name="email" required  />
                            </div>
                            <div class="mb-3">
                            <i class="fa-solid fa-lock"></i>
                                <input type="password" class="form-control shadow-none" placeholder="Password" name="pword" required  />
                            </div>
                            <button type="submit" className="btn btn-primary" name="login-btn">Log In</button>
                            </form>
                        </div>
                <div className="col-sm-6 signup-image">
                    <img src={SigninPic} height="400px"  alt="login" srcset="" />
                    <NavLink to="/signup"><span>Create an Account</span></NavLink>
                </div>
                </div>
                        
            </section>
        </>
    )
}

export default Login;