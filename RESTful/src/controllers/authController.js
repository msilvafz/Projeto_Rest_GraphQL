const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.register = async (req, res) => {
  try {
    const { nome, email, senha, tipo } = req.body;

    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    // Criptografar a senha
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(senha, salt);

    // Criar novo usuário
    const user = new User({
      nome,
      email,
      senha: hashedPassword,
      tipo,
    });

    await user.save();
    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao registrar usuário" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verificar se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    }

    // Verificar senha
    const validPassword = await bcryptjs.compare(senha, user.senha);
    if (!validPassword) {
      return res.status(400).json({ message: "Senha inválida" });
    }

    // Criar e assinar o token
    const token = jwt.sign(
      { _id: user._id, role: user.tipo },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, userId: user._id, role: user.tipo });
  } catch (error) {
    res.status(500).json({ message: "Erro ao fazer login" });
  }
};