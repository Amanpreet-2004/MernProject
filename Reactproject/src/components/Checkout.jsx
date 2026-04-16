// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";


// const Checkout = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     address: "",
//     payment: "",
//   });
// const navigate = useNavigate();
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//    toast.success("✅ Order placed successfully!");

//     setFormData({
//         name: "",
//         email: "",
//         address:"",
//         payment: "",
//         });
//         navigate("/orderDone");
//   };

//   return (
//     <div className="container7 text-center">
//       <h2 className="text-center ">Checkout</h2>
//       <form
//         onSubmit={handleSubmit}
//         className="mx-auto p-4 card rounded "
//         style={{ maxWidth: "450px",maxHeight:"auto" }}
//       >
       
//         <div className="mb-3 ">
//           <label className="form-label">Full Name</label>
//           <input 
//             type="text" 
//             className="form-control"
//             name="name"
//             placeholder="Enter Your full name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>

       
//         <div className="mb-3">
//           <label className="form-label">Email Address</label>
//           <input
//             type="email"
//             className="form-control"
//             name="email"
//             placeholder="Enter Your email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>

        
//         <div className="mb-3">
//           <label className="form-label">Delivery Address</label>
//           <textarea
//             className="form-control"
//             rows="3"
//             name="address"
//             placeholder="Enter Your address"
//             value={formData.address}
//             onChange={handleChange}
//             required
//           ></textarea>
//         </div>

        
//         <div className="mb-3">
//           <label className="form-label">Payment mode</label>
//             <select
//             className="form-control"
//             name="payment"
//             value={formData.payment}
//             onChange={handleChange}
//             required
//             >
//             <option value="" disabled>Select Payment Method ⬇️</option>
//             <option value="creditCard">Credit Card</option>
//             <option value="debitCard">Debit Card</option>
//             <option value="googlePay">Google Pay</option>
//             </select>
//         </div>

       
//         <button type="submit" className="btn4 w-75 d-block mx-auto">
//           Place Order
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Checkout;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios"; // Axios import karein

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    payment: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit function ko async banaya
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Backend ko data bhejein email ke liye
      const response = await axios.post("https://mernproject-x9rt.onrender.com/send-email", formData);

      if (response.data.status === 200) {
        toast.success("✅ Order placed & Confirmation email sent!");
        
        // Form clear karein
        setFormData({
          name: "",
          email: "",
          address: "",
          payment: "",
        });

        // Success page par navigate karein
        navigate("/orderDone");
      }
    } catch (err) {
      console.error("Email Error:", err);
      // Agar email fail bhi ho jaye, tab bhi order success dikha sakte hain ya error handling kar sakte hain
      toast.error("Order placed, but failed to send confirmation email.");
      navigate("/orderDone"); 
    }
  };

  return (
    <div className="container7 text-center mt-5">
      <h2 className="text-center mb-4">Checkout</h2>
      <form
        onSubmit={handleSubmit}
        className="mx-auto p-4 card rounded shadow-sm"
        style={{ 
          maxWidth: "450px", 
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          border: "1px solid #ddd" 
        }}
      >
        <div className="mb-3 text-start">
          <label className="form-label fw-bold">Full Name</label>
          <input 
            type="text" 
            className="form-control"
            name="name"
            placeholder="Enter Your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3 text-start">
          <label className="form-label fw-bold">Email Address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Enter Your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3 text-start">
          <label className="form-label fw-bold">Delivery Address</label>
          <textarea
            className="form-control"
            rows="3"
            name="address"
            placeholder="Enter Your address"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3 text-start">
          <label className="form-label fw-bold">Payment mode</label>
          <select
            className="form-control"
            name="payment"
            value={formData.payment}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Payment Method ⬇️</option>
            <option value="creditCard">Credit Card</option>
            <option value="debitCard">Debit Card</option>
            <option value="googlePay">Google Pay</option>
            <option value="cod">Cash on Delivery</option>
          </select>
        </div>

        <button type="submit" className="btn4 w-75 d-block mx-auto mt-3">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;