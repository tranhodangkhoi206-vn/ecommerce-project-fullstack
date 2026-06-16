import Order from "../models/Order.js";
import Product from "../models/Product.js";
import ShippingOption from "../models/ShippingOption.js";
import Voucher from "../models/Voucher.js";

export const createOrder = async (req, res) => {
  try {
    const user = req.user;
    const { sellerId, orderItems, shipingOption, voucher } = req.body;

    const productExisting = await Product.find({
      _id: { $in: orderItems.map((item) => item.productId) },
    }).select("productId sellerId");

    if (!productExisting) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    // Check sellerid is true
    const correctSellerId = productExisting.find(
      (item) => sellerId === item.sellerId.toString(),
    );

    if (!correctSellerId) {
      return res
        .status(409)
        .json({ message: "Chỉ được mua trong cùng một shop" });
    }

    const subtotal = orderItems.reduce((sum, currenValue) => {
      return (sum += currenValue.price * currenValue.quantity);
    });

    const shippingCost = await ShippingOption.findById(shipingOption).select("price")

    const discountPercent = await Voucher.findById(voucher).select("discountPercent")

    await Order.create({
      userId: user._id,
      sellerId,
      orderItems,
      subtotal,
      total: subtotal + shippingCost,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
