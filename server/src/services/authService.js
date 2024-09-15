import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const registerUser = async (nome, email, senha) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("Usuário já existe");
  }

  const hashedPassword = await bcrypt.hash(senha, 10);
  const newUser = new User({
    nome,
    email,
    senha: hashedPassword,
  });

  await newUser.save();
  return newUser;
};

const loginUser = async (email, senha) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const isMatch = await bcrypt.compare(senha, user.senha);
  if (!isMatch) {
    throw new Error("Senha incorreta");
  }

  const token = jwt.sign({ id: user._id }, "secreto", {
    expiresIn: "1h",
  });
  return token;
};

export { registerUser, loginUser };
