import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admbancotechninja:OLc8MPqLwxmyEG34@techninja.jrs23.mongodb.net/TechNinja?retryWrites=true&w=majority"
    );
    console.log("Conectado ao MongoDB Atlas");
  } catch (error) {
    console.error("Erro ao conectar no MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
