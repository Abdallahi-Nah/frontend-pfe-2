const express = require("express");

const {
  createEtudiant,
  getEtudiants,
  getEtudiant,
  updateEtudiant,
  deleteEtudiant,
  getEtudiantsByMatiereId,
} = require("../controller/etudiant.controller");

const {
  createEtudiantValidator,
  getEtudiantByIdValidator,
  updateEtudiantValidator,
  deleteEtudiantValidator,
} = require("../utils/validators/etudiantValidator");

// const notesMatiereRoutes = require("./notesMatieres.routes");

const router = express.Router({ mergeParams: true });

// router.use('/:etudiantId/notes-matieres', notesMatiereRoutes);

router.post("/create", createEtudiantValidator, createEtudiant);
router.get("/get", getEtudiants);
router.get("/get/:id", getEtudiantByIdValidator, getEtudiant);
router.get("/get-students-by-matiere/:matiereId", getEtudiantsByMatiereId);
router.put("/update/:id", updateEtudiantValidator, updateEtudiant);
router.delete("/delete/:id", deleteEtudiantValidator, deleteEtudiant);

module.exports = router;
