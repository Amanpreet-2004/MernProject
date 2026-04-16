


import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 1. Backend API call
      const res = await axios.post("https://mernproject-x9rt.onrender.com/user/login", data);

      // 2. Aapke Postman screenshot ke mutabiq 'success' check karein
      if (res.data.success) {
        const userData = res.data.body;
        const token = res.data.token;

        if (userData && userData.id) {
          // 3. Purana data saaf karke naya data save karein
          localStorage.clear();
          localStorage.setItem("token", token);
          localStorage.setItem("userRole", userData.role); // 'admin' ya 'user'
          localStorage.setItem("userId", userData.id);
          localStorage.setItem("currentUser", JSON.stringify(userData));
          localStorage.setItem("loggedIn", "true");

          toast.success("Login Successful!");

          // 4. Role-based Redirection
          setTimeout(() => {
            if (userData.role === "admin") {
              navigate("/admin"); // Admin dashboard par bhejein
            } else {
              navigate("/products"); // Normal user ko products par
            }
            // Page refresh ki zarurat nahi hogi agar protected routes sahi hain
          }, 1000);
        }
      }
    } catch (error) {
      console.error("Login Error:", error);
      // Backend se jo error message aaye wahi dikhayein
      const errorMsg = error.response?.data?.message || "Invalid Credentials or Server Error";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-12 col-sm-8 col-md-6 col-lg-4 p-4 rounded card shadow-sm" style={{ backgroundColor: "#cfe2f3" }}>
        <h2 className="text-center mb-4" style={{ fontFamily: "serif", fontWeight: "bold" }}>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input 
              type="email" 
              name="email" 
              className="form-control" 
              placeholder="Email" 
              value={data.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-3">
            <input 
              type="password" 
              name="password" 
              className="form-control" 
              placeholder="Password" 
              value={data.password} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <button type="submit" className="btn4 w-75 d-block mx-auto">Login</button>

          <div className="text-center mt-3">
            Password is forgot then? <Link to="/forgot-password">Forgot Password</Link>
          </div>

          <hr />

          <p className="text-center mt-2">
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;