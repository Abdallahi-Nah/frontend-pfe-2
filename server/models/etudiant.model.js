const mongoose = require("mongoose");
const Utilisateur = require("./user.model"); // Importer le schéma de base

// Schéma pour Étudiant
const etudiantSchema = new mongoose.Schema({
  matricule: { type: String, required: true, unique: true },
  creditAccumulee: { type: Number, default: 0 },
  moyAnnuelle: { type: Number, default: 0 },
  specialite: {
    type: mongoose.Schema.ObjectId,
    ref: "Specialite",
    required: [true, "L'étudiant doit inscrit dans spécialité"],
    required: true,
  }
});

// Héritage du schéma Utilisateur
etudiantSchema.add(Utilisateur.schema);

nouveauAcademique.pre(/^find/, function (next) {
  this.populate({
    path: 'specialite',
    select: 'nom nouveauAcademique',
  });
  next();
});

// Modèle Étudiant
const Etudiant = mongoose.model("Etudiant", etudiantSchema);

module.exports = Etudiant;
