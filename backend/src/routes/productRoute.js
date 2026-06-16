import express from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../controllers/productController.js";
import { authorizeRoute } from "../middlewares/authMiddleware.js";

const productRouter = express.Router();

productRouter.get("/", getProduct);
productRouter.use(authorizeRoute);
productRouter.post("/", addProduct);
productRouter.put("/", updateProduct);
productRouter.delete("/", deleteProduct);

export default productRouter;
