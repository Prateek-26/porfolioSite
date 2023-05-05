import React from "react";

function Contact(){
    return(
        <>
            <section className="contact-page">
            <div className="container-fluid contact-container">
                <div className="row contact-container-items">
                <div className="col-sm-3 contact-container-item">
                    <div className="contact-item-title">Phone</div>
                    <div className="contact-item-content">9096091326</div>
                </div>
                <div className="col-sm-3 contact-container-item">
                <div className="contact-item-title">Email</div>
                    <div className="contact-item-content">test@gmail.com</div>                   
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

                                <input type="text" className="form-control shadow-none col-sm-2" id="name" placeholder="Your Name" name="name" required  />

                                <input type="email" className="form-control shadow-none col-sm-2" placeholder="Your Email" name="email" required  />
                        
                                <input type="number" className="form-control shadow-none col-sm-2" id="phone" placeholder="Your Mobile Number" name="phone" required />

                    </div>
            <div className="row mssg-container">
                <textarea className="col-12" name="" id="" cols="30" rows="10" placeholder="Your Message"></textarea>
                </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
                </form>
                </div>
  
            </div>
            </section>
            
        </>
    )
}

export default Contact;