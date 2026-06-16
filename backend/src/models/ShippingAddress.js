import mongoose from "mongoose";

const shippingAddressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  provinceCode: {
    type: String,
    required: true,
  },
  addressType: {
    type: String,
    required: true,
    enum: ["CITY", "HOME"],
    default: "HOME",
  },
  isDefault: {
    type: Boolean,
    default: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const ShippingAddress = mongoose.model(
  "ShippingAddress",
  shippingAddressSchema,
);
export default ShippingAddress;
