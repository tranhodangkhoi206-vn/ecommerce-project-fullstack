import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  productName: {
    type: String,
    required: true,
  },
  orginalPrice: {
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
    voucher: {
      voucherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Voucher",
      },
      voucherName: {
        type: String,
        required: true,
      },
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
    deliveryOption: {
      deliveryOptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DeliveryOption",
        required: true,
      },
      deliveryCode: {
        type: String,
        enum: ["save", "fast", "express"],
        required: true,
      },
      deliveryName: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      // Giá ship gốc
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
    },
    // Giá có thể áp dụng giảm ship
    shippingFee: {
      type: Number,
      required: true,
      min: 0,
    },
    discountPercent: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    // Giá chưa xử lý các loại phí khác
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
    status: {
      type: String,
      required: true,
      default: "peding",
      enum: ["pedning", "processing", "shiped", "delivered", "cancelled"],
      required: true,
    },
    deliveryAddress: {
      deliveryAddressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "deliveryAddress",
        required: true,
      },
      deliveryAddresses: [
        {
          // Tên người nhận
          receipentName: {
            type: String,
            required: true,
          },
          // Số điện thoại người nhận
          receipentPhone: {
            type: String,
            required: true,
          },
          // Tỉnh/Thành phố
          province: {
            type: String,
            required: true,
          },
          // Quận/Huyện
          district: {
            type: String,
            required: true,
          },
          // Phường
          ward: {
            type: String,
            required: true,
          },
          detailAddress: {
            type: String,
            default: null,
          },
          isDefault: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "banking"],
      default: "COD",
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
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
