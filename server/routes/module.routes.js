const express = require("express");

const {
  setSpecialiteIdToBody,
  createModule,
  createFilterObj,
  getAllModules,
  getModuleById,
  getModuleInfos,
  updateModule,
  deleteSpecificModule,
} = require("../controller/module.controller");
const {
  createModuleValidator,
  getModuleByNameValidator,
  getModuleByIdValidator,
  updateModuleValidator,
  deleteModuleValidator,
} = require("../utils/validators/moduleValidator");

const matiereRoutes = require('./matiere.routes');

const router = express.Router({ mergeParams: true });

router.use('/:moduleId/matiere', matiereRoutes);

router.post("/create", setSpecialiteIdToBody, createModuleValidator, createModule);
router.get("/get", createFilterObj, getAllModules);
router.get('/get/:id', getModuleByIdValidator, getModuleById);
router.get('/getModuleInfos/:id', getModuleByIdValidator, getModuleInfos);
router.put('/update/:id', updateModuleValidator, updateModule);
router.delete('/delete/:id', deleteModuleValidator, deleteSpecificModule);

module.exports = router;
