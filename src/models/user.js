const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    tipo: {
      type: String,
      required: true,
      enum: ["Admin", "Aluno", "Professor"],
    },
    cursos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cursos", // Um usuário (aluno ou professor) pode ser associado a vários cursos
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);