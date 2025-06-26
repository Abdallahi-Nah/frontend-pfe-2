const factory = require('./handlersFactory');
const asyncHandler = require("express-async-handler");
const SpecialiteModel = require("../models/specialite.model");
const ModuleModel = require("../models/module.model");
const MatiereModel = require("../models/matiere.model");
const ApiErrors = require("../utils/ApiErrors.utils");

exports.setDepartementIdToBody = (req, res, next) => {
  // Nested route
  if (!req.body.departement) req.body.departement = req.params.departementId;
  next();
};

exports.createSpecialite = factory.createOne(SpecialiteModel);

exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.departementId) {
    filterObject = { departement: req.params.departementId };
  } 
  req.filterObj = filterObject;
  next();
};

exports.getAllSpecialites = factory.getAll(SpecialiteModel);

exports.getSpecialiteById = factory.getOne(SpecialiteModel);

const getSpecialiteById2 = asyncHandler(async (req, res, next) => {
  const specialiteId = req.params.id;
  const specialite = await SpecialiteModel.findById(specialiteId).populate({
    path: "departement",
    select: 'nom -_id'
  });

  if (!specialite) {
    throw new ApiErrors(`Il n'existe pas de spécialité pour cet ID`, 404); // Lancer une erreur
  }
  return specialite; // Renvoyer la spécialité
});

const getModuleMatiereCount = asyncHandler(async (req, res, next) => {
  const specialiteId = req.params.id;

  const specialiteExists = await SpecialiteModel.exists({ _id: specialiteId });
  if (!specialiteExists) {
    throw new ApiErrors('Spécialité non trouvée', 404); // Lancer une erreur
  }

  const modules = await ModuleModel.find({ specialite: specialiteId });
  const moduleIds = modules.map((module) => module._id);

  const countMatiere = await MatiereModel.countDocuments({
    module: { $in: moduleIds },
  });

  return {
    countModule: modules.length,
    countMatiere,
  }; // Renvoyer les comptes
});

exports.getSpecialiteInfos = asyncHandler(async (req, res, next) => {
  try {
    // Récupérer les informations de la spécialité
    const specialite = await getSpecialiteById2(req, res, next);

    // Récupérer le nombre de modules et de matières
    const moduleMatiereCount = await getModuleMatiereCount(req, res, next);

    // Fusionner les résultats
    const response = {
      specialite,
      moduleMatiereCount,
    };

    // Renvoyer la réponse
    res.status(200).json(response);
  } catch (error) {
    // Gérer les erreurs
    next(error);
  }
});

exports.updateSpecialite = factory.updateOne(SpecialiteModel);

exports.deleteSpecificSpecialite = factory.deleteOne(SpecialiteModel);