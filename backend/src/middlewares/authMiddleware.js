import "dotenv/config";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectedRoute = async (req, res, next) => {
  try {
    //   Lấy accessToken được gửi từ client
    const authHeader = req.headers["authorization"];
    const accessToken = authHeader && authHeader.split(" ")[1];

    // Kiểm tra có accessToken không
    if (!accessToken) {
      return res.status(401).json({ message: "Access token không tồn tại" });
    }

    //   Kiểm tra accessToken có đúng không
    await jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decodedUser) => {
        if (err) {
          console.error(err);
          return res
            .status(401)
            .json({ message: "Access token không đúng hoặc đã hết hạn" });
        }

        // Tìm user
        const user = await User.findById(decodedUser.userId).select(
          "-hashedPassword",
        );

        // Kiểm tra xem user có tồn tại không
        if (!user) {
          return res.status(404).json({ message: "Người dùng không tồn tại" });
        }

        req.user = user;
        next();
      },
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
