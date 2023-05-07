import axios from "axios";
import React, { useEffect, useState } from "react";

function Home() {
  const [loggedUser, setUser] = useState("");
  const callHomePage = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getdata", {
        withCredentials: true,
      });
      console.log("logging at React/home");
      console.log(response.status);
      if (response.status !== 200) {
        setUser("WElcome xxxx");
      } else {
        setUser(response.data.name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callHomePage();
  }, []);

  return (
    <>
      <section className="home-container">
        <h4>Welcome</h4>
        <h1  className="mt-4">Welcome Back {loggedUser} </h1>
        <h4 className="mt-4"> Nice to see you again</h4>
        <div className="row home-bg">
          <div className="col-sm-6 left"></div>
          <div className="col-sm-6 right"></div>
        </div>
      </section>
    </>
  );
}
export default Home;
