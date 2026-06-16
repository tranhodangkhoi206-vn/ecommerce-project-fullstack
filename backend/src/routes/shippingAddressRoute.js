import express from "express";
import { addShippingAddress } from "../controllers/shippingAddressController.js";

const shippingAddressRouter = express.Router();

shippingAddressRouter.post("/", addShippingAddress);

export default shippingAddressRouter;
