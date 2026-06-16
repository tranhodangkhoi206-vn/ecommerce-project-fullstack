import CartItem from "../models/Cart.js";
import Product from "../models/Product.js";

export const getAllCartItem = async (req, res) => {
  try {
    const user = req.user;

    const cartItems = await CartItem.find({ userId: user._id });
    return res.status(200).json({ cartItems });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const addNewItem = async (req, res) => {
  try {
    const user = req.user;
    const { productId, price, quantity } = req.body;

    // Kiểm tra sản phẩm có tồn tại hay không
    const product = await Product.findById({ _id: productId });
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    // Tìm xem người dùng đã được tạo giỏ hàng chưa
    const cart = await CartItem.findOne({ userId: user._id }).select("items");

    // Nếu chưa thì tạo
    if (!cart) {
      await CartItem.create({
        userId: user._id,
        items: [
          {
            productId,
            price,
            quantity,
            totalPrice: price * quantity,
          },
        ],
      });
      return res.sendStatus(204);
    }

    // Kiểm tra xem có thêm trùng không
    const duplicate = cart.items.find(
      (cartItem) => cartItem.productId.toString() === productId,
    );

    if (duplicate) {
      // Trùng thì tìm theo id sản phẩm và cập nhật số sượng và tổng giá
      await CartItem.findOneAndUpdate(
        { userId: user._id, "items.productId": productId },
        {
          $inc: {
            "items.$.quantity": quantity,
            "items.$.totalPrice": quantity * price,
          },
        },
      );
    } else {
      // Nếu không thì đẩy vào mảng
      await CartItem.findOneAndUpdate(
        { userId: user._id },
        {
          $push: {
            items: [
              {
                productId,
                price,
                quantity,
                totalPrice: price * quantity,
              },
            ],
          },
        },
      );
    }

    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const user = req.user;
    const { productId, quantity, price } = req.body;

    await CartItem.updateOne(
      {
        userId: user._id,
        "items.productId": productId,
      },
      {
        $inc: {
          "items.$.quantity": quantity,
          "items.$.totalPrice": quantity * price,
        },
      },
    );

    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const user = req.user;
    const { productIds } = req.body;

    await CartItem.updateOne(
      {
        userId: user._id,
      },
      {
        $pull: {
          items: {
            productId: { $in: productIds },
          },
        },
      },
    );

    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
