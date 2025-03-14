const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Aluno = require("../models/aluno");
const Professor = require("../models/professor");
const Admin = require("../models/admin");

// Função auxiliar para buscar usuário por tipo e email
const findUserByType = async (tipo, email) => {
  let model;
  if (tipo === "Aluno") model = Aluno;
  else if (tipo === "Professor") model = Professor;
  else if (tipo === "Admin") model = Admin;
  else throw new Error("Tipo de usuário inválido");

  return model.findOne({ email });
};

exports.register = async (req, res) => {
  try {
    const { nome, email, senha, tipo } = req.body;

    // Verificar se o tipo de usuário é válido
    if (!["Aluno", "Professor", "Admin"].includes(tipo)) {
      return res.status(400).json({ message: "Tipo de usuário inválido" });
    }

    // Verificar se o usuário já existe
    const existingUser = await findUserByType(tipo, email);
    if (existingUser) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    // Criptografar a senha
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(senha, salt);

    // Criar novo usuário
    const model = require(`../models/${tipo.toLowerCase()}`);
    const newUser = new model({ nome, email, senha: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha, tipo } = req.body;

    // Verificar se o tipo de usuário é válido
    if (!["Aluno", "Professor", "Admin"].includes(tipo)) {
      return res.status(400).json({ message: "Tipo de usuário inválido" });
    }

    // Buscar o usuário pelo tipo e email
    const user = await findUserByType(tipo, email);
    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    }

    // Verificar a senha
    const validPassword = await bcryptjs.compare(senha, user.senha);
    if (!validPassword) {
      return res.status(400).json({ message: "Senha inválida" });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { _id: user._id, role: tipo }, // Inclui o tipo de usuário no token
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, userId: user._id, role: tipo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};