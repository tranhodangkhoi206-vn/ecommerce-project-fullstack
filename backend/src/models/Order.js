import mongoose from "mongoose";
const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    orderItems: [
      {
        type: [orderItemSchema],
        required: true,
      },
    ],
    // Giá gốc
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    // Giá bao gồm phí ship, giảm giá,...
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    voucher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Voucher",
    },
    shippingOption: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShippingOption",
    },
    status: {
      type: String,
      required: true,
      default: "PENDING",
      enum: ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],
      required: true,
    },
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShippingAddress",
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "BANKING"],
      default: "COD",
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["UNPAID", "PAID"],
      default: "UNPAID",
      required: true,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
