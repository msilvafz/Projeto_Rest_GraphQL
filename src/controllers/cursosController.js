const Cursos = require("../models/cursos");
const User = require("../models/user");

exports.createCursos = async (req, res) => {
  try {
    const { professorId, ...cursoData } = req.body;

    // Verifica se o professor já existe
    const professor = await User.findById(professorId);
    if (!professor || professor.tipo !== "Professor") {
      return res.status(400).json({ message: "Professor inválido" });
    }

    const curso = new Cursos({
      ...cursoData,
      professor: professorId,
    });

    await curso.save();

    // Associa o curso ao professor
    professor.cursos.push(curso._id);
    await professor.save();

    res.status(201).json({ message: "Curso criado com sucesso", curso });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Matricula um aluno em um curso
exports.matricularAluno = async (req, res) => {
  try {
    const { cursoId, alunoId } = req.body;

    // Verifica se o curso existe
    const curso = await Cursos.findById(cursoId);
    if (!curso) {
      return res.status(400).json({ message: "Curso não encontrado" });
    }

    // Verifica se o aluno existe
    const aluno = await User.findById(alunoId);
    if (!aluno || aluno.tipo !== "Aluno") {
      return res.status(400).json({ message: "Aluno inválido" });
    }

    // Verifica se o aluno já está matriculado no curso
    if (curso.alunos.includes(alunoId)) {
      return res.status(400).json({ message: "Aluno já está matriculado neste curso" });
    }

    // Matricula o aluno no curso
    curso.alunos.push(alunoId);
    aluno.cursos.push(cursoId);

    await curso.save();
    await aluno.save();

    res.status(200).json({ message: "Aluno matriculado com sucesso" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Listar todos os cursos
exports.getAllCursos = async (req, res) => {
  try {
    const cursos = await Cursos.find();
    res.status(200).json(cursos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Retorna os detalhes do curso pelo id e mostra os alunos matriculados
exports.getCursoById = async (req, res) => {
  try {
    const cursoId = req.params.id;

    // Busca o curso pelo ID e mostra os alunos e os professores referentes ao curso
    const curso = await Cursos.findById(cursoId)
      .populate("professor", "nome email tipo") // Retorna as informações do professor
      .populate("alunos", "nome email tipo"); // Retorna as informações dos alunos

    if (!curso) {
      return res.status(404).json({ message: "Curso não encontrado" });
    }

    res.status(200).json(curso);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Atualizar um curso
exports.updateCursos = async (req, res) => {
  try {
    const curso = await Cursos.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!curso) {
      return res.status(404).json({ message: "Curso não encontrado" });
    }
    res.status(200).json(curso);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Deletar um curso
exports.deleteCursos = async (req, res) => {
  try {
    const curso = await Cursos.findByIdAndDelete(req.params.id);
    if (!curso) {
      return res.status(404).json({ message: "Curso não encontrado" });
    }

    // Remover referências do curso nos professores e alunos
    await User.updateMany(
      { cursos: curso._id },
      { $pull: { cursos: curso._id } }
    );

    res.status(200).json({ message: "Curso deletado com sucesso" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};