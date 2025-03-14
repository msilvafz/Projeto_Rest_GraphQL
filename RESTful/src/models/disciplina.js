// const mongoose = require("mongoose");

// const DisciplinaSchema = new mongoose.Schema(
//   {
//     nome: { type: String, required: true }, 
//     descricao: { type: String, required: false }, 
//     cargaHoraria: { type: Number, required: false }, 
//     curso: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Cursos", // Cada disciplina pertence a um único curso
//       required: true, // 1 para Muitos
//     },
//     professor: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Professor",
//         unique: true, // Disciplina ministrada por apenas um professor
//       },              // 1 pra 1
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Disciplina", DisciplinaSchema);