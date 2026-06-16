import Seller from "../models/Seller.js";
import User from "../models/User.js";

export const getProfile = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
export const changeRole = async (req, res) => {
  try {
    const user = req.user;
    await User.findByIdAndUpdate(
      { _id: user._id },
      {
        role: "SELLER",
      },
      {
        runValidators: true,
      },
    );

    await Seller.create({
      userId: user._id,
    });

    return res.sendStatus(204);
  } catch (error) {
    console.log("Lỗi khi thay đổi chức vụ", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
