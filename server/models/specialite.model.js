const mongoose = require("mongoose");

const specialiteSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      unique: [true, "nom de spécialité doit-etre unique"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    nouveauAcademique: {
      type: String,
      enum: ['L1', 'L2', 'L3', 'M1', 'M2', 'D1', 'D2', 'D3'],
      default: 'L1',
    },
    departement: {
      type: mongoose.Schema.ObjectId,
      ref: "Departement",
      required: [true, "spécialité doit-etre dans un département"],
    },
    enseignants: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Enseignant",
      },
    ],
  },
  { timestamps: true }
);

// Mongoose query middleware
specialiteSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'departement',
    select: 'nom',
  });
  next();
});

const specialiteModel = mongoose.model("Specialite", specialiteSchema);

module.exports = specialiteModel;
