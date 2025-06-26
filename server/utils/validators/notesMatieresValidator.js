const { check } = require("express-validator");
const validationMiddleware = require("../../my_middlewares/validationMiddleware");
const MatiereModel = require("../../models/matiere.model");
const EtudiantModel = require("../../models/etudiant.model");
const SpecialiteModel = require("../../models/specialite.model");
const ModuleModel = require("../../models/module.model");

exports.createNotesMatiereValidator = [
  check("specialite")
    .trim()
    .notEmpty()
    .withMessage("specialite id must be not empty")
    .isMongoId()
    .withMessage("invalid specialite id")
    .custom((specialiteId) =>
      SpecialiteModel.findById(specialiteId).then((specialite) => {
        if (!specialite) {
          return Promise.reject(
            new Error(`No specialite for this id: ${specialiteId}`)
          );
        }
      })
    ),
  check("module")
    .trim()
    .notEmpty()
    .withMessage("module id must be not empty")
    .isMongoId()
    .withMessage("invalid module id")
    .custom((moduleId, { req }) =>
      ModuleModel.findOne({ _id: moduleId, specialite: req.body.specialite })
        .then((mdl) => {
          if (!mdl) {
            return Promise.reject(
              new Error(`No module found with id ${moduleId} for this specialite ${req.body.specialite}`)
            );
          }
        })
    ),
  check("etudiant")
    .trim()
    .notEmpty()
    .withMessage("etudiant id must be not empty")
    .isMongoId()
    .withMessage("invalid etudiant id")
    .custom((etudiantId) =>
      EtudiantModel.findById(etudiantId).then((etudiant) => {
        if (!etudiant) {
          return Promise.reject(
            new Error(`No etudiant for this id: ${etudiantId}`)
          );
        }
      })
    ),
  check("matiere")
    .trim()
    .notEmpty()
    .withMessage("matiere id must be not empty")
    .isMongoId()
    .withMessage("invalid matiere id")
    .custom((matiereId, { req }) =>
      MatiereModel.findOne({ _id: matiereId, module: req.body.module })
        .then((matiere) => {
          if (!matiere) {
            return Promise.reject(
              new Error(`No matiere found with id ${matiereId} for this module ${req.body.module}`)
            );
          }
        })
    ),
  check("tp")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Le champ tp est requis et ne peut pas être vide."),
  check("cc")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Le champ control continu est requis et ne peut pas être vide."),
  check("ecrit")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Le champ ecrit est requis et ne peut pas être vide."),
  check("ratt")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Le champ rattrappage est requis et ne peut pas être vide."),
  validationMiddleware,
];

exports.updateNotesMatiereValidator = [
  check("specialite")
    .trim()
    .notEmpty()
    .withMessage("specialite id must be not empty")
    .isMongoId()
    .withMessage("invalid specialite id")
    .custom((specialiteId) =>
      SpecialiteModel.findById(specialiteId).then((specialite) => {
        if (!specialite) {
          return Promise.reject(
            new Error(`No specialite for this id: ${specialiteId}`)
          );
        }
      })
    ),
  check("module")
    .trim()
    .notEmpty()
    .withMessage("module id must be not empty")
    .isMongoId()
    .withMessage("invalid module id")
    .custom((moduleId, { req }) =>
      ModuleModel.findOne({ _id: moduleId, specialite: req.body.specialite })
        .then((mdl) => {
          if (!mdl) {
            return Promise.reject(
              new Error(`No module found with id ${moduleId} for this specialite ${req.body.specialite}`)
            );
          }
        })
    ),
  check("etudiant")
    .trim()
    .notEmpty()
    .withMessage("etudiant id must be not empty")
    .isMongoId()
    .withMessage("invalid etudiant id")
    .custom((etudiantId) =>
      EtudiantModel.findById(etudiantId).then((etudiant) => {
        if (!etudiant) {
          return Promise.reject(
            new Error(`No etudiant for this id: ${etudiantId}`)
          );
        }
      })
    ),
  check("matiere")
    .trim()
    .notEmpty()
    .withMessage("matiere id must be not empty")
    .isMongoId()
    .withMessage("invalid matiere id")
    .custom((matiereId, { req }) =>
      MatiereModel.findOne({ _id: matiereId, module: req.body.module })
        .then((matiere) => {
          if (!matiere) {
            return Promise.reject(
              new Error(`No matiere found with id ${matiereId} for this module ${req.body.module}`)
            );
          }
        })
    ),
  check("tp")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Le champ tp est requis et ne peut pas être vide."),
  check("cc")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Le champ control continu est requis et ne peut pas être vide."),
  check("ecrit")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Le champ ecrit est requis et ne peut pas être vide."),
  check("ratt")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Le champ rattrappage est requis et ne peut pas être vide."),
  validationMiddleware,
];

// Validateur pour récupérer une notes matière par son ID
exports.getNotesMatiereByIdValidator = [
  check("id")
    .isMongoId()
    .withMessage("L'identifiant de notes matière est invalide."),
  validationMiddleware,
];

// Validateur pour supprimer une notes matière
exports.deleteNotesMatiereValidator = [
  check("id")
    .isMongoId()
    .withMessage("L'identifiant de notes matière est invalide."),
  validationMiddleware,
];