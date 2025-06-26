const slugify = require("slugify");
const { check } = require("express-validator");
const validationMiddleware = require("../../my_middlewares/validationMiddleware");
const ModuleModel = require("../../models/module.model");

exports.createMatiereValidator = [
  check("nom")
    .trim() // Supprime les espaces au début et à la fin
    .notEmpty()
    .withMessage("Le champ nom est requis et ne peut pas être vide.")
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
    .withMessage(
      "Le champ nom doit contenir uniquement des lettres, des espaces, des apostrophes et des tirets ."
    )
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("module")
    .trim()
    .notEmpty()
    .withMessage("module id must be not empty")
    .isMongoId()
    .withMessage("invalid module id")
    .custom((moduleId) =>
      ModuleModel.findById(moduleId).then((mdl) => {
        if (!mdl) {
          return Promise.reject(
            new Error(`No module for this id: ${moduleId}`)
          );
        }
      })
    ),
  validationMiddleware,
];

exports.getMatiereByNameValidator = [
  check("nom")
    .trim() // Supprime les espaces au début et à la fin
    .notEmpty()
    .withMessage("Le champ nom est requis et ne peut pas être vide.")
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
    .withMessage(
      "Le champ nom doit contenir uniquement des lettres, des espaces, des apostrophes et des tirets."
    ),
  validationMiddleware,
];

exports.getMatiereByIdValidator = [
  check("id").isMongoId().withMessage("invalid id"),
  validationMiddleware,
];

exports.updateMatiereValidator = [
  check("id").isMongoId().withMessage("invalid id"),
  check("nom")
    .optional()
    .trim() // Supprime les espaces au début et à la fin
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
    .withMessage(
      "Le champ nom doit contenir uniquement des lettres, des espaces, des apostrophes et des tirets."
    )
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("module")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("invalid module id")
    .custom((moduleId) =>
      ModuleModel.findById(moduleId).then((mdl) => {
        if (!mdl) {
          return Promise.reject(
            new Error(`No module for this id: ${moduleId}`)
          );
        }
      })
    ),
  validationMiddleware,
];

exports.deleteMatiereValidator = [
  check("id").isMongoId().withMessage("invalid id"),
  validationMiddleware,
];
