import { loginUser, registerUser } from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    await registerUser(nome, email, senha);
    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res
        .status(400)
        .json({ message: "Email e senha são obrigatórios" });
    }

    const token = await loginUser(email, senha);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
