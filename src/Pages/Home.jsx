import React from "react";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/bim.jpg";
const Home = () => {
  return (
    <>
      <Navbar />
      <div
        className="home"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <h1>CONTACT MANAGEMENT SYSTEM</h1>
        <h4>
          Welcome to our Contact Management System! Securely store and manage
          your contacts with ease and confidence
        </h4>
      </div>
    </>
  );
};

export default Home;
