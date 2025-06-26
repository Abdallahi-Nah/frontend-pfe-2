const mongoose = require("mongoose");

// Schéma de base pour Utilisateur
const utilisateurSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: false },
  emailUniv: { type: String}, 
  telephone: { type: String, required: true },
  adresse: { type: String },
  profileImg: { type: String },
  dateNaissance: { type: Date },
  motDePasse: { type: String, required: false },
  dateDerniereConnexion: { type: Date, default: null },
  historiqueChangementsMotDePasse: { type: [String], default: [] },
  passwordChangedAt: { type: Date},
  role: {
    type: String,
    enum: ['superAdmin','admin', 'enseignant', 'etudiant'],
    default: 'superAdmin',
  },
  active: {
    type: Boolean,
    default: true,
  },
  passwordResetCode: String,
  passwordResetExpires: Date,
  passwordResetVerified: Boolean,
});

// Modèle Utilisateur
const Utilisateur = mongoose.model("Utilisateur", utilisateurSchema);

module.exports = Utilisateur;
