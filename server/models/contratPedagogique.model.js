const mongoose = require("mongoose");

const contratPedagogiqueSchema = new mongoose.Schema(
  {
    specialite: {
        type: mongoose.Schema.ObjectId,
        ref: "Specialite",
        required: [true, "Specialite doit-etre existe"],
    },
    etudiant: {
      type: mongoose.Schema.ObjectId,
      ref: "Etudiant",
      required: [true, "Etudiant doit-etre existe"],
    },
    matieresAValides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Matiere",
      },
    ],
  },
  { timestamps: true }
);

// Mongoose query middleware
contratPedagogiqueSchema.pre(/^find/, function (next) {
  this.populate([
      {
        path: 'specialite',
        select: 'nom'
      },
      {
        path: 'etudiant',
        select: 'nom prenom'
      },
      {
        path: 'matieresAValides',
        select: 'nom',
      }
    ]);
  next();
});

const ContratPedagogiqueModel = mongoose.model("ContratPedagogique", contratPedagogiqueSchema);

module.exports = ContratPedagogiqueModel;
