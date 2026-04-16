


import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; 

const Product = () => {
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "Sneakers", price: 50.99, image: "https://i.pinimg.com/originals/25/7f/a2/257fa295a43fc66db683a469051ad31c.png" },
    { id: 2, name: "Cool Shoes", price: 25.99, image: "https://addicfashion.com/wp-content/uploads/2019/06/cool-shoes-summer-ideas-for-men-that-looks-cool18.jpg" },
    { id: 3, name: "Shirt", price: 20.99, image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/n/b/a/m-st28-vebnor-original-imah4uv59vxzhpng.jpeg?q=70" },
    { id: 4, name: "Watch", price: 15.99, image: "https://i5.walmartimages.com/seo/OLEVS-Large-White-Face-Mens-Watches-With-Sliver-Stainless-Steel-Strap-Luxury-Analog-Quartz-For-Men-Date-Display-Roman-Numerals-Wrist-Water-Resistant_12c0ae61-edc4-400c-89bb-d52a003ef8fa.ab19048b079d32ed5437c16440fd669e.jpeg" },
    { id: 5, name: "Party Shirt", price: 50.99, image: "https://i5.walmartimages.com/seo/Cats-Birthday-Party-Cake-Women-Long-Sleeve-Shirts-Clothing-Autumn-Tops-Shirts-Ladies_25e0e497-4998-49af-9fe1-0b6bf7c03f41.e50cf64c1b5840345af0dafc45caeec8.jpeg" },
    { id: 6, name: "Handwork Suit", price: 25.99, image: "https://i.pinimg.com/originals/97/70/5f/97705fce2c86cc47d7083559ceaec74b.jpg" },
    { id: 7, name: "Sandal", price: 20.99, image: "https://i.pinimg.com/736x/2c/52/56/2c52567e9955d8ac5a6dec076b5ae6eb.jpg" },
    { id: 8, name: "Smart Watch", price: 15.99, image: "https://m.media-amazon.com/images/I/71ghnRodvBL._SL1500_.jpg" },
    { id: 9, name: "kids", price: 25.99, image: "https://m.media-amazon.com/images/I/61VLIsKtSoL._AC_SL1100_.jpg" },
    { id: 10, name: "girls", price: 25.99, image: "https://i.pinimg.com/originals/84/74/74/84747445d6f29053629b2a42ef36d081.png" },
    { id: 11, name: "shoes", price: 10.99, image: "https://i.pinimg.com/originals/d4/ab/e1/d4abe10a9a0b59ae97763ad5307e9765.jpg" },
    { id: 12, name: "gift", price: 8.99, image: "https://i5.walmartimages.com/asr/a124bc0b-b995-426c-a95e-5395034628ac.e045af841de09930410a6e2a85a53ced.jpeg" }
  ];

  const handleAddToCart = async (product) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.warn("Please login first to add products!");
      navigate("/login");
      return;
    }

    try {
      // ✅ URL update kiya gaya hai '/cart/add' par
      // const response = await axios.post("http://localhost:4644/cart/add", {
      //   userId: userId,
      //   productId: product.id, // Backend ko productId bhi chahiye tracking ke liye
      //   name: product.name,
      //   price: product.price,
      //   image: product.image,
      //   quantity: 1
      // });
// handleAddToCart ke andar ye update karein
const response = await axios.post("http://localhost:4644/cart/add", {
    userId: userId,
    productId: String(product.id), // ID ko string mein convert kiya
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: 1
});
      // ✅ Response success check (Humne controller mein success: true bheja hai)
      if (response.data.success || response.status === 201) {
        toast.success(`${product.name} added to cart! 🛒`);
      }
    } catch (error) {
      console.error("Add to cart error:", error.response?.data);
      const errorMsg = error.response?.data?.message || "Failed to add product!";
      toast.error(errorMsg);
    }
  };

  return (
    <>
      <h1 className="pro-page text-center my-4">Trending Products</h1>
      
      <div className="container2 mt-1 px-4">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 text-center">
          {products.map((product) => (
            <div key={product.id} className="col">
              <div className="product-card-inner pb-3">
                <img src={product.image} alt={product.name} className="imgpro shadow-sm" />
                <h5 className="mt-3 fw-bold">{product.name}</h5>
                <h6 className="textf">Price: ${product.price}</h6>
                
                <img
                  src="https://cdn-icons-png.flaticon.com/128/11906/11906637.png"
                  className="iconpro"
                  alt="rating"
                />
                <br />
                
                <button 
                  className="btn1 mt-2" 
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Product;