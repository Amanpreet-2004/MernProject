
import 'dotenv/config';
import express from 'express';
import dbConnect from './connect/dbConnect.js';
import userRouter from './routes/userRouter.js';
import fileUpload from 'express-fileupload';
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();

// --- Middlewares ---
app.use(express.json());
app.use(cors());
app.use(fileUpload());

// const port = 4644;
const PORT = process.env.PORT || 4644;
// --- Database Connection ---
dbConnect();

// --- Nodemailer Email Route (Checkout ke liye) ---
app.post("/send-email", async (req, res) => {
  const { name, email, address, payment } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kaurcsamanpreet@gmail.com',
        pass: 'dixf zmkq cnbo xcsg' 
      }
    });

    const mailOptions = {
      from: '"MyShop Team" <kaurcsamanpreet@gmail.com>',
      to: email,
      subject: 'Order Confirmed! 🛒',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #e57373;">Thank you for your order, ${name}!</h2>
          <p>We've successfully received your order and it's being processed.</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 10px; border: 1px solid #ddd;">
            <p><strong>Delivery Address:</strong> ${address}</p>
            <p><strong>Payment Method:</strong> ${payment}</p>
          </div>
          <br />
          <p>Best Regards,<br /><strong>MyShop Team</strong></p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send({ status: 200, message: "Email sent successfully!" });

  } catch (error) {
    console.error("Nodemailer Error:", error);
    res.status(500).send({ status: 500, message: "Error sending email" });
  }
});

// --- Routes Registration ---
// Ab saare URLs in prefixes se shuru honge:
app.use("/user", userRouter);       // e.g., http://localhost:4644/user/signup
app.use("/product", productRouter); // e.g., http://localhost:4644/product/all
app.use("/cart", cartRouter);       // e.g., http://localhost:4644/cart/get/:id

// --- Server Start ---
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});