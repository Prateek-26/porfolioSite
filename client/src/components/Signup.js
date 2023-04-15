import React from "react";
import loginPic from "../images/login2.jpg";
import { NavLink } from "react-router-dom";

function Signup(){
    return(
        <>
            <section className="signup">
                <div className="row signup-content-container">
                <div className="col-sm-6 signup-form">
                        <h1>REGISTER</h1>
                            <form>
                            <div class="mb-3">
                                <input type="text" class="form-control shadow-none" id="name" placeholder="Your Name" name="name" required  />
                            </div>
                            <div class="mb-3">
                                <input type="email" class="form-control shadow-none" placeholder="Your Email" name="email" required  />
                            </div>
                            <div class="mb-3">
                                <input type="number" class="form-control shadow-none" id="phone" placeholder="Mobile Number" name="phone" required />
                            </div>
                            <div class="mb-3">
                                <input type="text" class="form-control shadow-none" name="job" placeholder="Your Profession" required  />
                            </div>
                            <div class="mb-3">
                                <input type="password" class="form-control shadow-none" placeholder="Password" name="pword" required  />
                            </div>
                            <div class="mb-3">
                                <input type="password" class="form-control shadow-none" placeholder="Confirm your password" name="cpword"  required />
                            </div>
                            <button type="submit" className="btn btn-primary" name="register-btn">Register</button>
                            </form>
                        </div>
                <div className="col-sm-6 signup-image">
                    <img src={loginPic} height="400px"  alt="login" srcset="" />
                    <NavLink to="/login"><span>Already Loged In ?</span></NavLink>
                </div>
                </div>
                        
            </section>
        </>
    )
}

export default Signup;