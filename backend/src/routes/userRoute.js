import express from "express";
import { getProfile } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/profile", getProfile);

export default userRouter;
