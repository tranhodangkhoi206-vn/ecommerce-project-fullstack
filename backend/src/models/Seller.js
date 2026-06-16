import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productsId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    status: {
      type: String,
      enum: ["ONLINE", "OFFLINE"],
      default: "ONLINE",
    },
    productsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    follower: {
      type: Number,
    },
    address: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

const Seller = mongoose.model("Seller", sellerSchema);
export default Seller;
