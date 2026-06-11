import express from "express";
import { refresh, signIn, signOut, signUp } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/signout", signOut)
authRouter.post("/refresh", refresh)

export default authRouter;
