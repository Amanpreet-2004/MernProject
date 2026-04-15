// import CartSchema from "../model/cartSchema.js";

// export const addToCart = async (req, res) => {
//   try {
//     const { userId, name, price, image, quantity } = req.body;

//     if (!userId || !name || !price) {
//       return res.status(400).json({
//         message: "Missing required fields",
//       });
//     }

//     const newCart = new Cart({
//       userId,
//       name,
//       price,
//       image,
//       quantity,
//     });

//     await newCart.save();

//     res.status(201).json({
//       message: "Product added to cart",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };



// export const getCartItems = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const items = await cartSchema.find({ userId }); // Ensure cartSchema import hai
//     res.status(200).json({ success: true, body: items });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// import CartSchema from "../model/cartSchema.js"; // Check karein aapki file ka naam yahi hai

// // 1. Add to Cart
// export const addToCart = async (req, res) => {
//   try {
//     // productId bhi extract karein
//     const { userId, productId, name, price, image, quantity } = req.body;

//     if (!userId || !name || !price || !productId) {
//       return res.status(400).json({
//         success: false,
//         message: "Zaroori jankari (userId, productId, etc.) missing hai",
//       });
//     }

//     // CartSchema use karein (jo upar import kiya hai)
//     const newCartItem = new CartSchema({
//       userId,
//       productId,
//       name,
//       price,
//       image,
//       quantity: quantity || 1,
//     });

//     await newCartItem.save();

//     res.status(201).json({
//       success: true,
//       message: "Product cart mein add ho gaya!",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // 2. Get Cart Items
// export const getCartItems = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     if (!userId) {
//       return res.status(400).json({ success: false, message: "User ID missing hai" });
//     }

//     // CartSchema (C capital) use karein jo upar import hai
//     const items = await CartSchema.find({ userId }); 
    
//     res.status(200).json({ 
//       success: true, 
//       body: items 
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


import CartSchema from "../model/cartSchema.js";

export const addToCart = async (req, res) => {
  try {
    const { userId, productId, name, price, image, quantity } = req.body;

    // Validation
    if (!userId || !productId || !name || !price) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newCartItem = new CartSchema({
      userId,
      productId,
      name,
      price,
      image,
      quantity: quantity || 1,
    });

    await newCartItem.save();
    res.status(201).json({ success: true, message: "Product added to cart" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    const items = await CartSchema.find({ userId });
    res.status(200).json({ success: true, body: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    await CartSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Item removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};