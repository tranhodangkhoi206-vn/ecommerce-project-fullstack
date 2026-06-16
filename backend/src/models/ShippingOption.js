import mongoose from "mongoose";

const shippingOptionSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    enum: ["SAVE", "FAST", "EXPRESS"],
    default: "SAVE",
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const ShippingOption = mongoose.model("ShippingOption", shippingOptionSchema);
export default ShippingOption;