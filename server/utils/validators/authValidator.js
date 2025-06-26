const { check } = require("express-validator");
const slugify = require("slugify");
const validationMiddleware = require("../../my_middlewares/validationMiddleware");
const User = require("../../models/user.model");

exports.signupValidator = [
  check("nom")
    .trim() // Supprime les espaces au début et à la fin
    .notEmpty()
    .withMessage("Le champ nom est requis et ne peut pas être vide.")
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s-]+$/)
    .withMessage(
      "Le champ nom doit contenir uniquement des lettres, des espaces et des tirets."
    )
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Le champ email est requis et ne peut pas être vide.")
    .isEmail()
    .withMessage("L'email est invalide.")
    .custom(async (val) => {
      const user = await User.findOne({ email: val });
      if (user) {
        return Promise.reject(new Error("Cet email est déjà utilisé."));
      }
    }),
  check("motDePasse")
    .trim()
    .notEmpty()
    .withMessage("Le champ 'motDePasse' est requis et ne peut pas être vide.")
    .isLength({ min: 6 })
    .withMessage("minimum length 6 caractères")
    .custom((motDePasse, { req }) => {
      if (req.body.passwordConfirm) {
        if (motDePasse !== req.body.passwordConfirm) {
          throw new Error("mot de passe confirmation incorrect");
        }
      }
      return true;
    }),
  check("passwordConfirm")
    .trim()
    .notEmpty()
    .withMessage("Le champ 'password confirmation' est requis"),
  validationMiddleware,
];

exports.loginValidator = [
  check("emailUniv")
    .trim()
    .notEmpty()
    .withMessage("Le champ 'email Universitaire' est requis et ne peut pas être vide.")
    .isEmail()
    .withMessage("L'email universitaire est invalide."),
  check("motDePasse")
    .trim()
    .notEmpty()
    .withMessage("Le champ 'mot De Passe' est requis et ne peut pas être vide.")
    .isLength({ min: 6 })
    .withMessage("minimum length 6 caractères"),
  validationMiddleware,
];