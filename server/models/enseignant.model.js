const mongoose = require("mongoose");
const Utilisateur = require("./user.model"); // Importer le schéma de base

// Schéma pour Enseignant
const enseignantSchema = new mongoose.Schema({
  diplomes: { type: [String], required: true },
  specialite: { type: String, required: true },
  anneesExperience: { type: Number, default: 0 },
  matieresEnseignes: {
    type: [mongoose.Schema.ObjectId],
    ref: "Matiere",
    required: [true, "L'enseignant doit enseigne une matière minimum"],
    default: [],
  },
  disponibilites: { type: [String], default: [] },
  preferencesPedagogiques: { type: String },
  historiqueCours: { type: [String], default: [] },
});

// Héritage du schéma Utilisateur
enseignantSchema.add(Utilisateur.schema);

// Mongoose query middleware
enseignantSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'matieresEnseignes',
    select: 'nom',
  });
  next();
});

// Modèle Enseignant
const Enseignant = mongoose.model("Enseignant", enseignantSchema);

module.exports = Enseignant;
