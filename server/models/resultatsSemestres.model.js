const mongoose = require("mongoose");

const resultatsSemestresSchema = new mongoose.Schema(
  {
    etudiant: {
      type: mongoose.Schema.ObjectId,
      ref: "Etudiant",
      required: [true, "Etudiant est obligatoire"],
    },
    semestre: {
        type: String,
    },
    notesModules: {
        type: [mongoose.Schema.ObjectId],
        ref: "NotesModules",
        required: [true, "Notes Modules est obligatoire"],
    },
    moyenne: {
        type: Number,
        default: 0,
        min: 0,
        max: 20,
    },
    decision: {
        type: String,
    }
  },
  { timestamps: true }
);

const resultatsSemestres = mongoose.model("ResultatsSemestres", resultatsSemestresSchema);

module.exports = resultatsSemestres;
