import React, { useEffect, useState } from "react";
import person1img from "../images/person1.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function About() {
  const history = useNavigate();
  const [user, setUser] = useState({});

  const callAboutPage = async () => {
    try {
      const response = await axios.get("http://localhost:8080/about", {
        withCredentials: true,
      });
      console.log(response.data);
    setUser(response.data)
      if (!response.status === 200) {
          history("/signin");
        console.log("Error Detected");
      }
    } catch (error) {
      console.log(error);
      history("/signin");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <div className="container emp-profile">
        <form>
          <div className="row top-about">
            <div className="col-md-6">
              <img src={person1img} alt="p1" height="200px" srcSet="" />
            </div>

            <div className="col-md-6">
              <div className="profile-head">
                <h5>{user.name}</h5>
                <h6>{user.work}</h6>
                <p className="profile-rating mt-3 mb-5">
                  Rankings: <span>3/10</span>
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="profile-work-links">
                <h6>Work Links</h6>
                <h5>
                  <a href="#">Youtube</a>
                </h5>
                <h5>
                  <a href="#">GITHUB</a>
                </h5>
                <h5>
                  <a href="#">TWITTER</a>
                </h5>
                <h5>
                  <a href="#">INSTAGRAM</a>
                </h5>
                <h5>
                  <a href="#">STACKOVERFLOW</a>
                </h5>
              </div>
            </div>
            <div className="col-md-8 pl-5">
              <div className="tabs">
                <input
                  type="radio"
                  className="tabs__radio"
                  name="tabs-example"
                  id="tab1"
                  defaultChecked
                />
                <label htmlFor="tab1" className="tabs__label">
                  About
                </label>
                <div className="tabs__content">
                  <div className="tabs__content_content">
                    <div className="about-title">USER ID</div>
                    <div className="about-title-value">{user._id}</div>
                  </div>

                  <div className="tabs__content_content">
                    <div className="about-title">NAME</div>
                    <div className="about-title-value">{user.name}</div>
                  </div>

                  <div className="tabs__content_content">
                    <div className="about-title">EMAIL</div>
                    <div className="about-title-value">{user.email}</div>
                  </div>

                  <div className="tabs__content_content">
                    <div className="about-title">PHONE</div>
                    <div className="about-title-value">{user.phone}</div>
                  </div>

                  <div className="tabs__content_content">
                    <div className="about-title">ADDRESS</div>
                    <div className="about-title-value">GOA, INDIA</div>
                  </div>
                </div>

                <input
                  type="radio"
                  className="tabs__radio"
                  name="tabs-example"
                  id="tab2"
                />
                <label htmlFor="tab2" className="tabs__label">
                  Timeline
                </label>
                <div className="tabs__content">
                  <div className="tabs__content_content">
                    <div className="about-title">2009</div>
                    <div className="about-title-value">SD, PSL</div>
                  </div>

                  <div className="tabs__content_content">
                    <div className="about-title">2016</div>
                    <div className="about-title-value">
                      JNR. WEB DEV, HOTELHUB
                    </div>
                  </div>

                  <div className="tabs__content_content">
                    <div className="about-title">2022</div>
                    <div className="about-title-value">
                      SNR. WEB DEV, HOTELHUB
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default About;
