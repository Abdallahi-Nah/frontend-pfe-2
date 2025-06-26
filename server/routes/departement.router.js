const express = require('express');
const router = express.Router();
const {createDepartement, 
       getAllDepartements,
       getDepartementById,
       updateSpecificDepartement,
       deleteSpecificDepartement} = require('../controller/departement.controller');
const {createDepartementValidator,
       getDepartementByIdValidator,
       updateDepartementValidator,
       deleteDepartementValidator
      } = require('../utils/validators/departementValidator');

const specialiteRoutes = require('./specialite.routes');

router.use('/:departementId/specialite', specialiteRoutes);

router.post('/create', createDepartementValidator, createDepartement);
router.get('/get', getAllDepartements);
router.get('/get/:id', getDepartementByIdValidator, getDepartementById);
router.put('/update/:id', updateDepartementValidator, updateSpecificDepartement);
router.delete('/delete/:id', deleteDepartementValidator, deleteSpecificDepartement);

module.exports = router;
