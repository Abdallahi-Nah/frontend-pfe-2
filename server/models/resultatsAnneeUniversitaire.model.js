const mongoose = require("mongoose");

const resultatsAnneeUniversitaireSchema = new mongoose.Schema(
  {
    etudiant: {
      type: mongoose.Schema.ObjectId,
      ref: "Etudiant",
      required: [true, "Etudiant est obligatoire"],
    },
    resultatsSemestres: {
        type: [mongoose.Schema.ObjectId],
        ref: "ResultatsSemestres",
        required: [true, "Resultats Semestres est obligatoire"],
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

const resultatsAnneeUniversitaire = mongoose.model("ResultatsAnneeUniversitaire", 
                                                    resultatsAnneeUniversitaireSchema);

module.exports = resultatsAnneeUniversitaire;