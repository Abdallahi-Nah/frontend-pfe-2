const factory = require('./handlersFactory');
const asyncHandler = require("express-async-handler");
const EmploisModel = require("../models/emplois.model");
const SpecialiteModel = require("../models/specialite.model");
const MatiereModel = require("../models/matiere.model");
const EnseignantModel = require("../models/enseignant.model");
const ApiErrors = require("../utils/ApiErrors.utils");

exports.setSpecialiteIdToBody = (req, res, next) => {
  // Nested route
  if (!req.body.specialite) req.body.specialite = req.params.specialiteId;
  next();
};

exports.createEmplois = factory.createOne(EmploisModel);

exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.specialiteId) {
    filterObject = { specialite: req.params.specialiteId };
  } 
  req.filterObj = filterObject;
  next();
};

exports.getAllEmplois = factory.getAll(EmploisModel);

exports.getEmploiById = factory.getOne(EmploisModel);

exports.updateEmplois = factory.updateOne(EmploisModel);

exports.deleteSpecificEmplois = factory.deleteOne(EmploisModel);