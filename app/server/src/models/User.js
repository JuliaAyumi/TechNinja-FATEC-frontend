import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    matricula: { type: String, default: "" },
    senha: { type: String, required: true },
    usuario: { type: String, default: "" },
    avatar: { type: String, default: "" },
    pontuacao: { type: String, default: "" },
    nivelmodulo: { type: String, default: "" },
    ranking: { type: String, default: "" },
  },
  { collection: "Usuarios" }
);

const User = mongoose.model("Usuário", userSchema, "Usuarios");

export default User