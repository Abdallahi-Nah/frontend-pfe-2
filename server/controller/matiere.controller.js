const factory = require("./handlersFactory");
const asyncHandler = require("express-async-handler");
const MatiereModel = require("../models/matiere.model");
const ModuleModel = require("../models/module.model");
const SpecialiteModel = require("../models/specialite.model");
const ApiErrors = require("../utils/ApiErrors.utils");

exports.setModuleIdToBody = (req, res, next) => {
  // Nested route
  if (!req.body.module) req.body.module = req.params.moduleId;
  next();
};

exports.createMatiere = factory.createOne(MatiereModel);

exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.moduleId) {
    filterObject = { module: req.params.moduleId };
  }
  req.filterObj = filterObject;
  next();
};

exports.getAllMatieres = factory.getAll(MatiereModel);

exports.getMatiereById = factory.getOne(MatiereModel);

const getMatiereById2 = asyncHandler(async (req, res, next) => {
  const matiereId = req.params.id;
  const matiere = await MatiereModel.findById(matiereId).populate({
    path: "module",
    select: "nom",
  });

  if (!matiere) {
    throw new ApiErrors(`Il n'existe pas de matiere pour cet ID`, 404);
  }

  const moduleId = matiere.module._id;
  const mdl = await ModuleModel.findById(moduleId).populate({
    path: "specialite",
    select: "nom",
  });

  if (!mdl) {
    throw new ApiErrors(`Il n'existe pas de module pour cet ID`, 404);
  }

  const specialiteId = mdl.specialite._id;
  const specialite = await SpecialiteModel.findById(specialiteId).populate({
    path: "departement",
    select: "nom -_id",
  });

  if (!specialite) {
    throw new ApiErrors(`Il n'existe pas de spécialité pour cet ID`, 404);
  }

  return {
    matiere,
    mdl,
    specialite,
  };
});

exports.getMatiereInfos = asyncHandler(async (req, res, next) => {
  try {
    const matMdlSpec = await getMatiereById2(req, res, next);

    const response = {
      matMdlSpec,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

exports.updateMatiere = factory.updateOne(MatiereModel);

exports.deleteSpecificMatiere = factory.deleteOne(MatiereModel);
