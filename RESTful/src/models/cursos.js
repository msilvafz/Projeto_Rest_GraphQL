const mongoose = require("mongoose");

const CursosSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    descrição: { type: String, required: true },
    preço: { type: Number, required: true, min: 0 }, // Preço deve ser positivo
    imagem: { type: String, required: false },
    video: { type: String, required: false },
    promoção: { type: Number, required: true, min: 0 }, // Promoção deve ser positiva
    professor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Associa um curso a um professor
    },
    alunos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Associa vários alunos a um curso
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cursos", CursosSchema);