const factory = require('./handlersFactory');
const departementModel = require('../models/departement.model');

exports.createDepartement = factory.createOne(departementModel);

exports.getAllDepartements = factory.getAll(departementModel);

exports.getDepartementById = factory.getOne(departementModel);

exports.updateSpecificDepartement = factory.updateOne(departementModel);

exports.deleteSpecificDepartement = factory.deleteOne(departementModel);