const mongoose = require("mongoose");

const matiereSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "le code du matière obligatoire"],
      unique: [true, "le code du matière doit-etre unique"],
    },
    nom: {
      type: String,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    hasTp: {
      type: Boolean,
      default: false,
    },
    credit: {
      type: Number,
      required: true,
      min: 1,
      max: 30,
    },
    module: {
      type: mongoose.Schema.ObjectId,
      ref: "Module",
      required: [true, "matiere doit-etre dans un module"],
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

matiereSchema.pre(/^find/, function (next) {
  this.populate({
    path: "module",
    select: "nom",
  });
  next();
});

const matiereModel = mongoose.model("Matiere", matiereSchema);

module.exports = matiereModel;
