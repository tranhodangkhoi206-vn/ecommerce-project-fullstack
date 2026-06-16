import express from "express";
import { changeRole, getProfile } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/profile", getProfile);
userRouter.post("/role", changeRole)

export default userRouter;
