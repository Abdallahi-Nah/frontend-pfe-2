const express = require("express");

const {
    createEnseignant,
    getEnseignants,
    getEnseignant,
    updateEnseignant,
    deleteEnseignant,
    addCourse,
    getEducatorCourses
} = require("../controller/enseignant.controller");
const upload = require("../configs/multer");
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

router.post(
  "/add-course",
  upload.single("image"),
  addCourse
);
router.get("/courses", getEducatorCourses);

module.exports = router;