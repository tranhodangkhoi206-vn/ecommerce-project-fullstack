import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema(
  {
    // Tên voucher
    voucherName: {
      type: String,
      required: true,
    },
    // Loại voucher
    voucherType: {
      type: String,
      required: true,
      enum: ["shipping", "discout"],
    },
    // Ngày hết hạn
    expireAt: {
      type: Date,
      required: true,
    },
    // Số tiền tối thiểu để đạt được
    minimumOrderAmount: {
      type: Number,
      required: true,
    },
    // Phần trăm giảm giá
    discountPercent: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

voucherSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const Voucher = mongoose.model("Voucher", voucherSchema);
export default Voucher;
