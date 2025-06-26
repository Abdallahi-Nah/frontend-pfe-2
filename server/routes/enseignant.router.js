const express = require("express");

const {
    createEnseignant,
    getEnseignants,
    getEnseignant,
    updateEnseignant,
    deleteEnseignant
} = require("../controller/enseignant.controller");
const {
  createEnseignantValidator,
  getEnseignantByNameValidator,
  getEnseignantByIdValidator,
  updateEnseignantValidator,
//   updateLoggedEnseignantValidator,
//   changeEnseignantPasswordValidator,
//   changeLoggedEnseignantPasswordValidator,
  deleteEnseignantValidator,
} = require("../utils/validators/enseignantValidator");

// const matiereRoutes = require('./matiere.routes');

const router = express.Router({ mergeParams: true });

// router.use('/:moduleId/matiere', matiereRoutes);

router.post("/create", createEnseignantValidator, createEnseignant);
router.get("/get", getEnseignants);
router.get('/get/:id', getEnseignantByIdValidator, getEnseignant);
// router.get('/getModuleInfos/:id', getModuleByIdValidator, getModuleInfos);
router.put('/update/:id', updateEnseignantValidator, updateEnseignant);
router.delete('/delete/:id', deleteEnseignantValidator, deleteEnseignant);

module.exports = router;