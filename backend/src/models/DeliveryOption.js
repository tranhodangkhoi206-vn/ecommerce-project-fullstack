import mongoose from "mongoose";

const deliveryOptionSchema = new mongoose.Schema({
  deliveryCode: {
    type: String,
    enum: ["save", "fast", "expres"],
    required: true,
  },
  deliveryName: {
    type: String,
    enum: ["tiết kiệm", "nhanh", "hỏa tốc"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  baseCost: {
    type: Number,
    required: true,
    min: 0,
  },
  estimatedDays: {
    type: Number,
    required: true,
    min: 1,
  },
});

const DeliveryOption = mongoose.model("DeliveryOption", deliveryOptionSchema);
export default DeliveryOption;
