import mongoose from "mongoose";

const deliveryAddressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
});

const DeliveryAddress = mongoose.model(
  "DeliveryAddress",
  deliveryAddressSchema,
);
export default DeliveryAddress;
