const mongoose = require("mongoose");

const AlunoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    cursos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cursos", // Um Aluno pode estar matriculado em mais de um curso
      },               // Muitos pra Muitos
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Aluno", AlunoSchema);
