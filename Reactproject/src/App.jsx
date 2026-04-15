// import { useState } from 'react'
// import Navbar from './components/Navbar'
// import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// import Home from './components/Home';
// import Category from './components/Category';
// import About from './components/About';
// import Product from './components/Products';
// import Footer from './components/Footer';
// import Signup  from './components/Signup';
// import Cart from './components/cart';
// import Checkout from './components/Checkout';
// import Login from './components/Login';
// import OrderDone from './components/OrderDone';
// import ResetPassword from './components/ResetPassword';
// import ForgotPassword from './components/ForgotPassword';
// import {  ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AdminLayout from './components/Admin/AdminLayout';

// import Dashboard from './components/Admin/Dashboard';
// import AddProduct from './components/Admin/AddProduct';
// import AdminProducts from './components/Admin/AdminProduct';

// function App() {
 
//   return (
//      <Router> 
//      <Navbar/>
//         <Routes>
//           <Route exact path="/" element={
//         <>
//         <Home/>
//         <Category/>
//         <About />
//         <Product/>
//         <Footer/>
//     </>
//   } />
//    <Route path="/signup" element={<Signup />} />

//     <Route path="/login" element={<Login />} />
//     <Route path="/about" element={<About />} />
//     <Route path="/products" element ={<Product/>} />
//     <Route path="/Signup" element={<Signup/>}/>
//     <Route path="/cart" element={<Cart/>}/>
//     <Route path="/reset-password/:token" element={<ResetPassword/>}/>
//     <Route path="/forgot-password" element={<ForgotPassword/>}/>
//     <Route path="/checkout" element={<Checkout/>}/>
//     <Route path="/orderDone" element={<OrderDone/>}/>
   

  
//   {/* Admin Routes Group */}
//   <Route path="/admin" element={<AdminLayout />}/>
//     <Route path="/dashboard" element={<Dashboard />} /> 
//     <Route path="/add-product" element={<AddProduct />} />
//     <Route path="/admin-products" element={<AdminProducts/>}/>
    
  

//     </Routes>
//     <ToastContainer />
//   </Router>
//   )
// }

// export default App;

import { useState } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Category from './components/Category';
import About from './components/About';
import Product from './components/Products';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Cart from './components/cart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import OrderDone from './components/OrderDone';
import ResetPassword from './components/ResetPassword';
import ForgotPassword from './components/ForgotPassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* --- Public Routes --- */}
        <Route exact path="/" element={
          <>
            <Home />
            <Category />
            <About />
            <Product />
            <Footer />
          </>
        } />
        
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orderDone" element={<OrderDone />} />

       

      </Routes>
      <ToastContainer />
    </Router>
  )
}

export default App;

