import Product from "../models/Product.js";
import getDiscountPrice from "../utils/getDiscountPrice.js";

export const getProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const user = req.user;
    const { products } = req.body;

    if (!products) {
      return res.status(400).json({ message: "Không tìm thấy sản phẩm nào" });
    }

    products.forEach((product) => {
      const {
        name,
        price,
        description,
        stockQuantity,
        imgUrl,
        category,
        isSale,
        discountPercent,
      } = product;
      if (
        !name ||
        !price ||
        !description ||
        !stockQuantity ||
        !imgUrl ||
        !category ||
        !isSale ||
        !discountPercent
      ) {
        return res
          .status(400)
          .json({ message: "Chưa đầy đủ thông tin sản phẩm" });
      }
    });
    await Product.insertMany(
      products.map((product) => ({
        sellerId: user._id,
        name: product.name,
        price: product.price,
        description: product.description,
        stockQuantity: product.stockQuantity,
        imgUrl: product.imgUrl,
        category: product.category,
        isSale: product.isSale,
        discountPercent: product.discountPercent,
        priceAfterSale: getDiscountPrice(
          product.isSale,
          product.price,
          product.discountPercent,
        ),
      })),
    );

    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const {
      productId,
      name,
      price,
      description,
      stockQuantity,
      imgUrl,
      category,
      isSale,
      discountPercent,
    } = req.body;

    const product = await Product.findById(productId).select("price");

    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    await Product.findByIdAndUpdate(productId, {
      name,
      price,
      description,
      stockQuantity,
      imgUrl,
      category,
      isSale,
      discountPercent: isSale ? discountPercent : 0,
      priceAfterSale: getDiscountPrice(
        isSale,
        product.price,
        isSale ? discountPercent : 0,
      ),
    });
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productsId = req.body.productsId;

    if (!productsId || productsId.length === 0) {
      return res.status(400).json({ message: "Không có id nào được gửi" });
    }

    const products = await Product.find({ _id: { $in: productsId } });

    if (products.length !== productsId.length) {
      return res.status(404).json({
        message: "Mã sản phẩm không hợp lệ hoặc sản phẩm không tồn tại",
      });
    }

    await Product.deleteMany({
      _id: { $in: productsId },
    });
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
