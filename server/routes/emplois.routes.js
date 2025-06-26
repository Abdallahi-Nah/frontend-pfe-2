const express = require("express");

const {
  createEmplois,
  createFilterObj,
  getAllEmplois,
  getEmploiById,
  updateEmplois,
  deleteSpecificEmplois,
} = require("../controller/emplois.controller");
const {
  createEmploisValidator,
  getEmploisByIdValidator,
  updateEmploisValidator,
  deleteEmploisValidator,
} = require("../utils/validators/emploisValidator");

const router = express.Router({ mergeParams: true });

router.post("/create", createEmploisValidator, createEmplois);
router.get("/get", createFilterObj, getAllEmplois);
router.get('/get/:id', getEmploisByIdValidator, getEmploiById);
router.put('/update/:id', updateEmploisValidator, updateEmplois);
router.delete('/delete/:id', deleteEmploisValidator, deleteSpecificEmplois);

module.exports = router;