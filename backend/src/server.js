import express from "express";
import { config } from "dotenv";
import connectDatabase from "./config/db.js";
import dns from "dns";
import authRouter from "./routes/authRoute.js";
import { protectedRoute } from "./middlewares/authMiddleware.js";
import userRouter from "./routes/userRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// Thiết lập dns của google
dns.setServers(["8.8.8.8"], ["8.8.4.4"]);

config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// Public route
app.use("/api/auth", authRouter);

// Prive route
app.use(protectedRoute);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
  });
});
