const User = require("../models/user");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createManyUser = async (req, res) => {
  try {
    const user = await User.insertMany(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUsersByType = async (req, res) => {
  try {
    const { tipo } = req.params;
    console.log("Tipo solicitado:", tipo);
    const users = await User.find({ tipo });
    console.log("Usuários encontrados:", users);
    res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários por tipo:", error);
    res.status(400).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mostrar os cursos de um aluno pelo ID
exports.getCursosByAluno = async (req, res) => {
  try {
    const alunoId = req.params.id;

    // Verifica se o aluno realmente existe
    const aluno = await User.findById(alunoId).populate("cursos", "nome descrição preço imagem video promoção");
    if (!aluno || aluno.tipo !== "Aluno") {
      return res.status(404).json({ message: "Aluno não encontrado ou inválido" });
    }

    res.status(200).json({
      aluno: {
        _id: aluno._id,
        nome: aluno.nome,
        email: aluno.email,
      },
      cursos: aluno.cursos,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
