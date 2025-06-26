const mongoose = require("mongoose");

const notesModulesSchema = new mongoose.Schema(
  {
    etudiant: {
      type: mongoose.Schema.ObjectId,
      ref: "Etudiant",
      required: [true, "Etudiant est obligatoire"],
    },
    module: {
        type: mongoose.Schema.ObjectId,
        ref: "Module",
        required: [true, "Module est obligatoire"],
    },
    notesMatieres: {
        type: [mongoose.Schema.ObjectId],
        ref: "NotesMatieres",
        required: [true, "Notes Matieres est obligatoire"],
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
notesModulesSchema.pre(/^find/, function (next) {
  this.populate({
    path: "module",
    select: "nom",
  });
  next();
});

const notesModules = mongoose.model("NotesModules", notesModulesSchema);

module.exports = notesModules;
