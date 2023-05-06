import React, { useState, useEffect } from "react";
import axios from "axios";

function Contact() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  //   We did the above as we dont need entire data (pword, tokens, ..etc)here!

  const callContactPage = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getdata", {
        withCredentials: true,
      });
      console.log(response.data);
      // This has the actual user data
      setUser({
        ...user,
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
      });
      // we set/update the user state with the data rx from axios.get request.
      // cant set message, as we dont get it from the axios.get request
      if (!response.status === 200) {
        console.log("Error Detected");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callContactPage();
  }, []);

  //   Storing data inside state
  const handleInputs = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
    // we keep on updating the values here, which would be further sent to the backend.
  };

  //   Sending the data to Backend
  const contactForm = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = user;

    const res = await axios
      .post("http://localhost:8080/contact", {
        name,
        email,
        phone,
        message,
      },{ withCredentials: true})
      console.log(res);
      if(res.status === 201){
        setUser({...user, message: ""})
      }
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
            <form method="POST">
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
              <button
                type="submit"
                onClick={contactForm}
                className="btn btn-primary"
              >
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
