import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      ""
    );
    console.log("Conectado ao MongoDB Atlas");
  } catch (error) {
    console.error("Erro ao conectar no MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
