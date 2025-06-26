const express = require("express");

const {
  createNotesMatiere,
  updateNotesMatiere,
  getAllNotesMatieres,
  getOneNotesMatiere,
  deleteNotesMatieres,
  getNotesMatieresByEtudiant,
} = require("../controller/notesMatieres.controller");
const {
  getNotesSemestreByEtudiant,
} = require("../controller/notesSemestres.controller");
const {
  createNotesMatiereValidator,
  updateNotesMatiereValidator,
  getNotesMatiereByIdValidator,
  deleteNotesMatiereValidator,
} = require("../utils/validators/notesMatieresValidator");

const router = express.Router({ mergeParams: true });

router.post("/create", createNotesMatiereValidator, createNotesMatiere);
router.put("/update/:id", updateNotesMatiereValidator, updateNotesMatiere);
router.get("/get", getAllNotesMatieres);
router.get("/get/:id", getNotesMatiereByIdValidator, getOneNotesMatiere);
router.get("/get-notes-matieres-by-etudiant/:etudiant", getNotesSemestreByEtudiant);
router.delete("/delete/:id", deleteNotesMatiereValidator, deleteNotesMatieres);

module.exports = router;
