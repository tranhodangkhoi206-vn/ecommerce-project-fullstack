import mongoose from "mongoose";
import getDiscountPrice from "../utils/getDiscountPrice.js";

const reviewSchema = new mongoose.Schema(
  {
    reviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      trim: true,
    },
    ratingStar: {
      type: Number,
      required: true,
      max: 5,
      min: 1,
    },
  },
  { timestamps: true },
);

const productSchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    isSale: {
      type: Boolean,
      required: true,
    },
    discountPercent: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    priceAfterSale: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    quantitySold: {
      type: Number,
      default: 0,
      min: 0,
    },
    imgUrl: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    reviews: [
      {
        type: reviewSchema,
      },
    ],
    category: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);
export default Product;
