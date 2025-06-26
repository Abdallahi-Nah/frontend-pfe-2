const express = require("express");

const {
    createAdmin,
    getAdmins,
    getAdmin,
    updateAdmin,
    deleteAdmin
} = require("../controller/admin.controller");
const {
  createAdminValidator,
  getAdminByNameValidator,
  getAdminByIdValidator,
  updateAdminValidator,
  // updateLoggedAdminValidator,
  // changeAdminPasswordValidator,
  // changeLoggedAdminPasswordValidator,
  deleteAdminValidator,
} = require("../utils/validators/adminValidator");

// const matiereRoutes = require('./matiere.routes');

const router = express.Router({ mergeParams: true });

// router.use('/:moduleId/matiere', matiereRoutes);

router.post("/create", createAdminValidator, createAdmin);
router.get("/get", getAdmins);
router.get('/get/:id', getAdminByIdValidator, getAdmin);
// router.get('/getModuleInfos/:id', getModuleByIdValidator, getModuleInfos);
router.put('/update/:id', updateAdminValidator, updateAdmin);
router.delete('/delete/:id', deleteAdminValidator, deleteAdmin);

module.exports = router;