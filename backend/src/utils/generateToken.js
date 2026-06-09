import "dotenv/config";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const generateAccessToken = (userId, ACCESS_TOKEN_TTL) => {
  const payload = { userId };
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_TTL,
  });
  return accessToken;
};

export const generateRefreshToken = (res, REFRESH_TOKEN_TTL) => {
  const refreshToken = crypto.randomBytes(64).toString("hex");

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none", // Frontend và Backend khác domain
    maxAge: REFRESH_TOKEN_TTL,
  });

  return refreshToken;
};
