import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  // Tỉnh thành
  province: {
    type: String,
    default: null,
  },
  // Quận/huyện
  district: {
    type: String,
    default: null,
  },
  // Đường
  street: {
    type: String,
    default: null,
  },
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    hashedPassword: {
      type: String,
      required: true,
      trim: true,
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
    },
    avatarUrl: {
      type: String,
    },
    role: {
      type: String,
      enum: ["CUSTOMER", "SELLER"],
      default: "CUSTOMER",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
