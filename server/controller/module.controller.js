const factory = require('./handlersFactory');
const asyncHandler = require("express-async-handler");
const ModuleModel = require("../models/module.model");
const SpecialiteModel = require("../models/specialite.model");
const MatiereModel = require("../models/matiere.model");
const ApiErrors = require("../utils/ApiErrors.utils");

exports.setSpecialiteIdToBody = (req, res, next) => {
  // Nested route
  if (!req.body.specialite) req.body.specialite = req.params.specialiteId;
  next();
};

exports.createModule = factory.createOne(ModuleModel);

exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.specialiteId) {
    filterObject = { specialite: req.params.specialiteId };
  } 
  req.filterObj = filterObject;
  next();
};

exports.getAllModules = factory.getAll(ModuleModel);

exports.getModuleById = factory.getOne(ModuleModel);

const getModuleById2 = asyncHandler(async (req, res, next) => {
  const moduleId = req.params.id;
  const mdl = await ModuleModel.findById(moduleId).populate({
    path: "specialite",
    select: 'nom'
  });

  if (!mdl) {
    throw new ApiErrors(`Il n'existe pas de module pour cet ID`, 404);
  }

  const specialiteId = mdl.specialite._id;
  const specialite = await SpecialiteModel.findById(specialiteId).populate({
    path: "departement",
    select: 'nom -_id'
  });

  if (!specialite) {
    throw new ApiErrors(`Il n'existe pas de spécialité pour cet ID`, 404);
  }

  return {
    mdl,
    specialite
  };
});

const getMatiereCountInModule = asyncHandler(async (req, res, next) => {
  const moduleId = req.params.id;

  const moduleExists = await ModuleModel.exists({ _id: moduleId });
  if (!moduleExists) {
    throw new ApiErrors('Module non trouvée', 404);
  }

  const matieresInModule = await MatiereModel.find({module: moduleId});

  let numberOfCredits = 0;

  matieresInModule.forEach((matiere) => {
    numberOfCredits += matiere.credit;
  });

  const countMatiere = await MatiereModel.countDocuments({
    module: moduleId,
  });

  return {
    numberOfCredits,
    countMatiere
  };
});

exports.getModuleInfos = asyncHandler(async (req, res, next) => {
  try {
    const mdlSpec = await getModuleById2(req, res, next);

    const matiereCreditCount = await getMatiereCountInModule(req, res, next);

    const response = {
      mdlSpec,
      matiereCreditCount,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

exports.updateModule = factory.updateOne(ModuleModel);

exports.deleteSpecificModule = factory.deleteOne(ModuleModel);