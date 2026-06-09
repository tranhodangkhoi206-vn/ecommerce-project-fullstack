import bcrypt from "bcrypt";
import User from "../models/User.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import Session from "../models/Session.js";

const ACCESS_TOKEN_TTL = "30m";
const REFRESH_TOKEN_TTL = 1000 * 60 * 60 * 24 * 14;

export const signUp = async (req, res) => {
  try {
    const { username, email, password, firstname, lastname } = req.body;

    // Kiểm tra có đủ các trường không
    if (!username || !email || !password || !firstname || !lastname) {
      return res
        .status(400)
        .json({ message: "Thông tin người dùng không đầy đủ" });
    }

    // Kiểm tra người dùng đã tồn tại chưa
    const duplicate = await User.findOne({ username });
    if (duplicate) {
      return res.status(409).json({ message: "Người dùng đã tồn tại, trùng username" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);
    //   Thêm người dùng vào database
    await User.create({
      username,
      email,
      hashedPassword,
      displayName: `${firstname} ${lastname}`,
    });
    return res.sendStatus(204);
  } catch (error) {
    console.error("Lỗi khi gọi signUp: ", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kiểm tra có đầy đủ thông tin chưa
    if (!username || !password) {
      return res.status(400).json({ message: "Thiếu username hoặc password" });
    }

    // Kiểm tra người dùng đã có tài khoản chưa
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    // Kiểm tra mật khẩu
    const passwordCorrect = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordCorrect) {
      return res.status(401).json({ message: "Sai mật khẩu" });
    }

    // Tạo accessToken và refreshToken
    const accessToken = generateAccessToken(user._id, ACCESS_TOKEN_TTL);
    const refreshToken = generateRefreshToken(res, REFRESH_TOKEN_TTL);

    // Lưu refreshToken vào database
    await Session.create({
      userId: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
    });

    // Trả accessToken về cho client
    res.status(200).json({
      message: `User ${user.username} đã đăng nhập vào hệ thống`,
      accessToken: accessToken,
    });
  } catch (error) {
    console.error("Lỗi khi gọi signUp: ", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
