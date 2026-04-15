
import Product from "../model/productSchema.js";

// ✅ Add Product
export const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();

    // 🔹 Log in backend
    console.log("Product added successfully:", savedProduct);

    res.json({
      status: 200,
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      status: 500,
      message: "Error adding product",
    });
  }
};

// ✅ Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    console.log(`Fetched ${products.length} products`);

    res.json({
      status: 200,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      status: 500,
      message: "Error fetching products",
    });
  }
};

// ✅ Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        status: 404,
        message: "Product not found",
      });
    }

    console.log("Product deleted successfully:", deletedProduct);

    res.json({
      status: 200,
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      status: 500,
      message: "Error deleting product",
    });
  }
};

// ✅ Update Product
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        status: 404,
        message: "Product not found",
      });
    }

    console.log("Product updated successfully:", updatedProduct);

    res.json({
      status: 200,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      status: 500,
      message: "Error updating product",
    });
  }
};

// ✅ Get Cart Items by User ID (Naya Function)
export const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params; // URL se userId uthayenge
    
    // Database mein wahi items find karein jinka userId match karta ho
    const items = await Product.find({ userId: userId });

    console.log(`Fetched ${items.length} cart items for user: ${userId}`);

    res.json({
      status: 200,
      products: items,
    });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({
      status: 500,
      message: "Error fetching cart items",
    });
  }
};

// ✅ Remove Item From Cart (Naya Function)
export const removeFromCart = async (req, res) => {
  try {
    // req.params.id ka matlab hai product ki unique _id
    const deletedItem = await Product.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ status: 404, message: "Item not found" });
    }

    res.json({
      status: 200,
      message: "Item removed from cart successfully",
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error removing item" });
  }
};