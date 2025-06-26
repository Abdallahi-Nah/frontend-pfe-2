const express = require("express");

const {
  setDepartementIdToBody,
  createSpecialite,
  createFilterObj,
  getAllSpecialites,
  getSpecialiteById,
  getSpecialiteInfos,
  updateSpecialite,
  deleteSpecificSpecialite,
} = require("../controller/specialite.controller");
const {
  createSpecialiteValidator,
  getSpecialiteByIdValidator,
  updateSpecialiteValidator,
  deleteSpecialiteValidator,
} = require("../utils/validators/specialiteValidator");

const moduleRoutes = require('./module.routes');
const emploisRoutes = require('./emplois.routes');

const router = express.Router({ mergeParams: true });

router.use('/:specialiteId/module', moduleRoutes);
router.use('/:specialiteId/emplois', emploisRoutes);

router.post("/create", setDepartementIdToBody, createSpecialiteValidator, createSpecialite);
router.get("/get", createFilterObj, getAllSpecialites);
router.get('/get/:id', getSpecialiteByIdValidator, getSpecialiteById);
router.get("/getSpecialiteInfos/:id", getSpecialiteByIdValidator, getSpecialiteInfos);
router.put('/update/:id', updateSpecialiteValidator, updateSpecialite);
router.delete('/delete/:id', deleteSpecialiteValidator, deleteSpecificSpecialite);

module.exports = router;
