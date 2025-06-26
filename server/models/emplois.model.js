const mongoose = require("mongoose");

const emploisSchema = new mongoose.Schema(
  {
    specialite: {
        type: mongoose.Schema.ObjectId,
        ref: "Specialite",
        required: [true, "La spécialité est obligatoire"],
    },
    matiere: {
        type: mongoose.Schema.ObjectId,
        ref: "Matiere",
        required: [true, "La matière est obligatoire"],
    },
    enseignant: {
        type: mongoose.Schema.ObjectId,
        ref: "Enseignant",
        required: [true, "Le nom de l'enseignant est obligatoire"],
    },
    semestre: {
      type: String,
    },
    type: {
        type: String,
    },
    jour: {
        type: String,
        enum: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    },
    heureDebut: {
        type: String,
    },
    heureFin: {
        type: String,
    },
    lieu: {
      type: String,
    }
  },
  { timestamps: true }
);

// Mongoose query middleware
emploisSchema.pre(/^find/, function (next) {
    this.populate([
      {
        path: "specialite",
        select: "nom" // Sélectionne uniquement le champ 'nom' de la spécialité
      },
      {
        path: "matiere",
        select: "nom" // Sélectionne les champs 'nom' et 'credit' de la matière
      },
      {
        path: "enseignant",
        select: "nom prenom" // Sélectionne les champs 'nom' et 'prenom' de l'enseignant
      }
    ]);
    next();
});

const emploisModel = mongoose.model("Emplois", emploisSchema);

module.exports = emploisModel;