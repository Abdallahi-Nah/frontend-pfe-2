const slugify = require("slugify");
const { check } = require("express-validator");
const validationMiddleware = require("../../my_middlewares/validationMiddleware");

exports.createDepartementValidator = [
  check("nom")
    .trim() // Supprime les espaces au début et à la fin
    .notEmpty()
    .withMessage("Le champ nom est obligatoire et ne peut pas être vide.")
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
    .withMessage(
      "Le champ nom doit contenir uniquement des lettres, des espaces et des tirets."
    )
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validationMiddleware,
];

exports.getDepartementByNameValidator = [
  check("nom").notEmpty().withMessage("nom obligatoire"),
  validationMiddleware,
];

exports.getDepartementByIdValidator = [
  check("id").isMongoId().withMessage("incorrect id"),
  validationMiddleware,
];

exports.updateDepartementValidator = [
  check("id").isMongoId().withMessage("incorrect id"),
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
  validationMiddleware,
];

exports.deleteDepartementValidator = [
  check("id").isMongoId().withMessage("incorrect id"),
  validationMiddleware,
];
