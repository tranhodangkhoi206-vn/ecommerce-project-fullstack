import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["FREESHIP", "DISCOUNTPRICE"],
    default: "FREESHIP",
  },
  expireAt: {
    type: Date,
    required: true,
  },
  condition: {
    type: Number,
    required: true,
  },
  discountPercent: {
    type: Number,
    required: true,
  },
});

voucherSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const Voucher = mongoose.model("Voucher", voucherSchema);
export default Voucher;
