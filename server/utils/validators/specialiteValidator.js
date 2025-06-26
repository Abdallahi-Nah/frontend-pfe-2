const slugify = require("slugify");
const { check } = require("express-validator");
const validationMiddleware = require("../../my_middlewares/validationMiddleware");
const departementModel = require("../../models/departement.model");

exports.createSpecialiteValidator = [
  check("nom")
    .trim() // Supprime les espaces au début et à la fin
    .notEmpty()
    .withMessage("Le champ nom est requis et ne peut pas être vide.")
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
    .withMessage(
      "Le champ nom doit contenir uniquement des lettres, des espaces et des tirets."
    )
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("departement")
    .trim()
    .notEmpty()
    .withMessage("departement id must be not empty")
    .isMongoId()
    .withMessage("invalid departement id")
    .custom((departementId) =>
      departementModel.findById(departementId).then((departement) => {
        if (!departement) {
          return Promise.reject(
            new Error(`No department for this id: ${departementId}`)
          );
        }
      })
    ),
  validationMiddleware,
];

exports.getSpecialiteByNameValidator = [
  check("nom")
    .trim() // Supprime les espaces au début et à la fin
    .notEmpty()
    .withMessage("Le champ nom est requis et ne peut pas être vide.")
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
    .withMessage(
      "Le champ nom doit contenir uniquement des lettres, des espaces et des tirets."
    ),
  validationMiddleware,
];

exports.getSpecialiteByIdValidator = [
  check("id").isMongoId().withMessage("invalid id"),
  validationMiddleware,
];

exports.updateSpecialiteValidator = [
  check("id").isMongoId().withMessage("invalid id"),
  check("nom")
    .optional()
    .trim() // Supprime les espaces au début et à la fin
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
    .withMessage(
      "Le champ nom doit contenir uniquement des lettres, des espaces et des tirets."
    )
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("departement")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("invalid departement id")
    .custom((departementId) =>
      departementModel.findById(departementId).then((departement) => {
        if (!departement) {
          return Promise.reject(
            new Error(`No department for this id: ${departementId}`)
          );
        }
      })
    ),
  validationMiddleware,
];

exports.deleteSpecialiteValidator = [
  check("id").isMongoId().withMessage("invalid id"),
  validationMiddleware,
];
