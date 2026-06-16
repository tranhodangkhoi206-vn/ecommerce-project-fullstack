import express from "express";
import {
  addNewItem,
  deleteItem,
  getAllCartItem,
  updateQuantity,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.get("/", getAllCartItem);
cartRouter.post("/", addNewItem);
cartRouter.put("/", updateQuantity);
cartRouter.delete("/", deleteItem);
export default cartRouter;
