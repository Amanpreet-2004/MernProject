// import express from "express";
// import { addToCart } from "../controllers/cartController.js";
// const router = express.Router();

// router.post("/add", addToCart);

// export default router;
// import express from 'express';
// import { addToCart, getCartItems } from '../controllers/cartController.js';

// const router = express.Router();

// // app.js mein pehle se '/cart' hai, isliye yahan sirf '/get/:userId' kaafi hai
// router.post("/add", addToCart);
// router.get("/get/:userId", getCartItems); 

// export default router;

import express from 'express';
import { addToCart, getCartItems, removeCartItem } from '../controllers/cartController.js';

const cartRouter = express.Router();

cartRouter.post("/add", addToCart);
cartRouter.get("/get/:userId", getCartItems);
cartRouter.delete("/delete/:id", removeCartItem);

export default cartRouter;