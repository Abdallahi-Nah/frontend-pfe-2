const slugify = require("slugify");
const { check } = require("express-validator");
const validationMiddleware = require("../../my_middlewares/validationMiddleware");
const SpecialiteModel = require("../../models/specialite.model");

exports.createModuleValidator = [
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
  check("semestre")
    .trim()
    .notEmpty()
    .withMessage("Le champ semestre est requis et ne peut pas être vide.")
    .matches(/^S[1-6]$/i)
    .withMessage(
      "Les valeurs autorisées pour semestre sont S1, S2, S3, S4, S5 ou S6."
    ),
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
  validationMiddleware,
];

exports.getModuleByNameValidator = [
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

exports.getModuleByIdValidator = [
  check("id").isMongoId().withMessage("invalid id"),
  validationMiddleware,
];

exports.updateModuleValidator = [
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
  check("semestre")
    .optional()
    .trim()
    .matches(/^S[1-6]$/i)
    .withMessage(
      "Les valeurs autorisées pour semestre sont S1, S2, S3, S4, S5 ou S6."
    ),
  check("specialite")
    .optional()
    .trim()
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
  validationMiddleware,
];

exports.deleteModuleValidator = [
  check("id").isMongoId().withMessage("invalid id"),
  validationMiddleware,
];
