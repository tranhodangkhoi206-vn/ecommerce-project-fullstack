import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    reviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    feedback: {
      type: String,
      trim: true,
    },
    starRating: {
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
    productName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    orginalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    isSale: {
      type: Boolean,
      required: true,
      default: false,
    },
    discountPercent: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    description: {
      type: String,
      required: true,
    },
    // Số sao trung bình
    averageRating: {
      type: Number,
      default: 0,
    },
    // Tổng số đánh giá
    reviewCount: {
      type: Number,
      default: 0,
    },
    // Số hượng hàng tồn trong kho
    stockQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    // Số lượng hàng đã bán
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
