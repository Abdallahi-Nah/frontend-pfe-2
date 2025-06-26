const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      unique: [true, "nom du module doit-etre unique"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    semestre: {
      type: String,
    },
    specialite: {
      type: mongoose.Schema.ObjectId,
      ref: "Specialite",
      required: [true, "module doit-etre dans une spécialité"],
    },
  },
  { timestamps: true }
);

// Mongoose query middleware
moduleSchema.pre(/^find/, function (next) {
  this.populate({
    path: "specialite",
    select: "nom",
  });
  next();
});

const moduleModel = mongoose.model("Module", moduleSchema);

module.exports = moduleModel;
