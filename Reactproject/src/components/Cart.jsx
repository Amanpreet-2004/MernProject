


import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  // 1. Fetch Cart Items from Backend
  const fetchCart = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(`https://mernproject-x9rt.onrender.com/cart/get/${userId}`);
      if (res.data.success) {
        setCartItems(res.data.body);
      }
    } catch (err) {
      console.error("Cart fetch error:", err);
      toast.error("Cart load nahi ho paya!");
    } finally {
      setLoading(false);
    }
  };

  // 2. Remove Item from Cart
  const handleRemove = async (id) => {
    try {
      const res = await axios.delete(`https://mernproject-x9rt.onrender.com/cart/delete/${id}`);
      if (res.data.success) {
        toast.success("Item removed!");
        fetchCart(); // List refresh karein
      }
    } catch (err) {
      toast.error("Nahi nikal paye item!");
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  // Total Price Calculation
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border text-danger" role="status"></div>
    </div>
  );

  return (
    <div className="container py-5" style={{ minHeight: "100vh", fontFamily: 'Poppins, sans-serif' }}>
      <h2 className="mb-5 fw-bold text-center">My Shopping Bag ({cartItems.length})</h2>
{/* 🔹 Beautiful Empty Cart Section */}
{cartItems.length === 0 ? (
  <div 
    className="container d-flex justify-content-center align-items-center" 
    style={{ minHeight: "60vh" }}
  >
    <div 
      className="card border-0 shadow-lg p-5 text-center rounded-4" 
      style={{ 
        maxWidth: "500px", 
        background: "rgba(255, 255, 255, 0.8)", 
        backdropFilter: "blur(10px)" 
      }}
    >
      <div className="mb-4">
        {/* Cart Icon with Theme Color */}
        <i 
          className="bi bi-cart-x" 
          style={{ fontSize: "5rem", color: "#d9534f" }}
        ></i>
      </div>
      
      <h2 className="fw-bold mb-3" style={{ color: "#333" }}>
        Your Cart is Empty
      </h2>
      
      <p className="text-muted mb-4 fs-5">
        Looks like you haven't added anything to your bag yet. Let's find something special for you!
      </p>
      
      <Link 
        to="/products" 
        className="btn btn-lg px-5 py-3 rounded-pill shadow-sm border-0" 
        style={{ 
          backgroundColor: "#d9534f", 
          color: "white", 
          fontWeight: "400",
          transition: "0.3s" 
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = "#e68a87"}
        onMouseOut={(e) => e.target.style.backgroundColor = "#d9534f"}
      >
        Start Shopping
      </Link>
    </div>
  </div>
) : (
        <div className="row g-4">
          {/* Cart Items List */}
          <div className="col-lg-8">
            {cartItems.map((item) => (
              <div key={item._id} className="card border-0 shadow-sm mb-3 overflow-hidden rounded-4">
                <div className="row g-0 align-items-center">
                  <div className="col-md-3">
                    <img 
                      src={item.image} 
                      className="img-fluid p-2 rounded-4" 
                      alt={item.name} 
                      style={{ height: "180px", width: "100%", objectFit: "cover" }} 
                    />
                  </div>
                  <div className="col-md-6 p-3" style={{fontSize:"20px"}}>
                    <h3 className=" mb-1">{item.name}</h3>
                    <p className="text-danger mb-0 fw-semibold">${item.price}</p>
                    <small className="text-muted">Quantity: {item.quantity || 1}</small>
                  </div>
                  

                  <div className="col-md-3 text-center overflow-visible" style={{ position: "relative", top: "-30px", marginLeft:"50px" }}>
          <button 
            className="btn btn-outline-danger border-0 rounded-pill "
            onClick={() => handleRemove(item._id)}
          >
            
          Remove</button>
        </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="col-lg-4">
<div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: "100px", zIndex: "10" }}>
              <h4 className="fw-bold mb-4">Order Summary</h4>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span className="fw-bold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Delivery</span>
                <span className="text-success fw-bold">FREE</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <span className="fs-5 fw-bold">Total</span>
                <span className="fs-4 fw-bold text-danger">${totalPrice.toFixed(2)}</span>
              </div>
              <button 
                className="btn btn-danger py-3 rounded-pill fw-bold shadow"
                onClick={() => navigate("/checkout")}
              >
                Checkout Now
              </button>
              <div className="text-center mt-3">
                <Link to="/products" className="text-muted text-decoration-none small">
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;