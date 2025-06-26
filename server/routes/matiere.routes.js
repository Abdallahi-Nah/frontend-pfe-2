const express = require("express");

const {
  setModuleIdToBody,
  createMatiere,
  createFilterObj,
  getAllMatieres,
  getMatiereById,
  getMatiereInfos,
  updateMatiere,
  deleteSpecificMatiere,
} = require("../controller/matiere.controller");
const {
  createMatiereValidator,
  getMatiereByIdValidator,
  updateMatiereValidator,
  deleteMatiereValidator,
} = require("../utils/validators/matiereValidator");

const enseignantRoutes = require("./enseignant.router");

const router = express.Router({ mergeParams: true });

router.use('/:matiereId/enseignant', enseignantRoutes);

router.post("/create", setModuleIdToBody, createMatiereValidator, createMatiere);
router.get("/get", createFilterObj, getAllMatieres);
router.get('/get/:id', getMatiereByIdValidator, getMatiereById);
router.get('/getMatiereInfos/:id', getMatiereByIdValidator, getMatiereInfos);
router.put('/update/:id', updateMatiereValidator, updateMatiere);
router.delete('/delete/:id', deleteMatiereValidator, deleteSpecificMatiere);

module.exports = router;
