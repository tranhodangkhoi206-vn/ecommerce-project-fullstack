import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
    console.log("Kết nối với database Mongodb thành công");
  } catch (error) {
    console.error("Lỗi khi kết nối đến database: ", error);
    process.exit(1);
  }
};

export default connectDatabase;