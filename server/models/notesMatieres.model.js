const mongoose = require("mongoose");

const notesMatieresSchema = new mongoose.Schema(
  {
    specialite: {
      type: mongoose.Schema.ObjectId,
      ref: "Specialite",
      required: [true, "Specialite est obligatoire"],
    },
    module: {
      type: mongoose.Schema.ObjectId,
      ref: "Module",
      required: [true, "Module est obligatoire"],
    },
    etudiant: {
      type: mongoose.Schema.ObjectId,
      ref: "Etudiant",
      required: [true, "Etudiant est obligatoire"],
    },
    matiere: {
        type: mongoose.Schema.ObjectId,
        ref: "Matiere",
        required: [true, "Matiere est obligatoire"],
    },
    hasRatt: {
      type: Boolean,
      default: false,
    },
    tp: {
        type: Number,
        default: 0,
        min: 0,
        max: 20,
    },
    cc: {
        type: Number,
        default: 0,
        min: 0,
        max: 20,
    },
    ecrit: {
        type: Number,
        default: 0,
        min: 0,
        max: 20,
    },
    ratt: {
        type: Number,
        default: 0,
        min: 0,
        max: 20,
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

// Mongoose query middleware
notesMatieresSchema.pre(/^find/, function (next) {
  this.populate({
    path: "matiere",
    select: "nom credit",
  });
  next();
});

const notesMatieres = mongoose.model("NotesMatieres", notesMatieresSchema);

module.exports = notesMatieres;
