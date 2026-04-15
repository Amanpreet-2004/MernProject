import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", // User schema se connect karne ke liye
        required: true 
    },
    // productId: { 
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: "Product", // Product schema se connect karne ke liye
    //     required: true 
    // },
    // model/cartSchema.js mein ise change karein
productId: {
    type: String, // Pehle ye mongoose.Schema.Types.ObjectId tha, ise String kar dein
    required: true
},
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    quantity: { type: Number, default: 1 }
}, { timestamps: true });

export default mongoose.model("Cart", cartSchema);