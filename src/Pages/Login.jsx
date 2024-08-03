import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../App";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post("https://contact-backend-ochre.vercel.app/contact/login", data);
      const response = await axios.post("https://contact-backend-ochre.vercel.app/contact/login",
         data, 
      {
        withCredentials: true
      });
      

      toast.success("Login Successful");

      // Store token in local storage
      localStorage.setItem("token", response.data.token);

      // Set user information in context
      setUser(response.data.user);
      console.log(response)

      // Navigate to home page after successful login
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        // Server responded with a status code outside of 2xx
        toast.error(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response received from server");
      } else {
        // Something happened in setting up the request that triggered an error
        toast.error("Error logging in");
      }
    }
  };

  return (
    <div className="signup-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/register">SignUp</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
