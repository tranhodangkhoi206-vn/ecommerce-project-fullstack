import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        // Số lượng sản phẩm
        quantity: {
          type: Number,
          max: 100,
          min: 1,
          default: 1,
          required: true,
        },
        // Giá thành của sản phẩm
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        // Tổng tiền nguyên bản trước khi thêm các loại phí khác
        subtotal: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
  },
  { timestamps: true },
);

const CartItem = mongoose.model("Cart", cartItemSchema);
export default CartItem;
