const factory = require('./handlersFactory');
const asyncHandler = require("express-async-handler");
const NotesMatieres = require("../models/notesMatieres.model");
const ApiErrors = require("../utils/ApiErrors.utils");

exports.createNotesMatiere = factory.createOne(NotesMatieres, "NotesMatieres");

exports.updateNotesMatiere = factory.updateOne(NotesMatieres, "NotesMatieres");

exports.getOneNotesMatiere = factory.getOne(NotesMatieres);

exports.getAllNotesMatieres = factory.getAll(NotesMatieres);

exports.deleteNotesMatieres = factory.deleteOne(NotesMatieres);

exports.getNotesMatieresByEtudiant = factory.getNotesMatieresByEtudiant(NotesMatieres);

exports.getNoteByType = asyncHandler(async (req, res, next) => {
  const { specialiteId, moduleId, matiereId, etudiantId, type } = req.params;
  console.log("🔎 Type reçu :", type);

  const validTypes = ["tp", "cc", "ecrit", "ratt"];
  if (!validTypes.includes(type)) {
    return next(new ApiErrors("Type de note invalide", 400));
  }

  const noteDoc = await NotesMatieres.findOne({
    specialite: specialiteId,
    module: moduleId,
    matiere: matiereId,
    etudiant: etudiantId,
  }).select(type);

  if (!noteDoc) {
    return next(new ApiErrors("Note non trouvée", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      value: noteDoc[type],
    },
  });
});
