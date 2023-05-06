import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

function Contact() {
  // const history = useNavigate();
  const [user, setUser] = useState({name: "", email: "", phone: "", message: ""});
  //   const

  const callContactPage = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getdata", {
        withCredentials: true,
      });
      console.log(response.data);
      setUser({...user, name: response.data.name, email: response.data.email, phone: response.data.phone});
      if (!response.status === 200) {
        //   history("/signin");
        console.log("Error Detected");
      }
    } catch (error) {
      console.log(error);
      //   history("/signin");
    }
  };

  useEffect(() => {
    callContactPage();
  }, []);

  //   Storing data inside state
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({...user, [name]: value})
  };


  return (
    <>
      <section className="contact-page">
        <div className="container-fluid contact-container">
          <div className="row contact-container-items">
            <div className="col-sm-3 contact-container-item">
              <div className="contact-item-title">Phone</div>
              <div className="contact-item-content">{user.phone}</div>
            </div>
            <div className="col-sm-3 contact-container-item">
              <div className="contact-item-title">Email</div>
              <div className="contact-item-content">{user.email}</div>
            </div>
            <div className="col-sm-3 contact-container-item">
              <div className="contact-item-title">Address</div>
              <div className="contact-item-content">Goa, India</div>
            </div>
          </div>
        </div>

        <div className="get-in-touch-container">
          <div className="get-in-touch-content">
            <h1>Get In Touch</h1>
            <form action="">
              <div className="row contact-container-items">
                <input
                  type="text"
                  className="form-control shadow-none col-sm-2"
                  id="name"
                  value={user.name}
                  onChange={handleInputs}
                  placeholder="Your Name"
                  name="name"
                  required
                />

                <input
                  type="email"
                  className="form-control shadow-none col-sm-2"
                  value={user.email}
                  onChange={handleInputs}
                  placeholder="Your Email"
                  name="email"
                  required
                />

                <input
                  type="number"
                  className="form-control shadow-none col-sm-2"
                  id="phone"
                  value={user.phone}
                  onChange={handleInputs}
                  placeholder="Your Mobile Number"
                  name="phone"
                  required
                />
              </div>
              <div className="row mssg-container">
                <textarea
                  className="col-12"
                  name="message"
                  id=""
                  cols="30"
                  rows="10"
                  value={user.message}
                  onChange={handleInputs}
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button type="submit" onClick={} className="btn btn-primary">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
