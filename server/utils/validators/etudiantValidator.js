const { check } = require("express-validator");
const bcrypt = require("bcryptjs");
const validationMiddleware = require("../../my_middlewares/validationMiddleware");
const Etudiant = require("../../models/etudiant.model");
const MatiereModel = require("../../models/matiere.model");
const SpecialiteModel = require("../../models/specialite.model");

// Validateur pour la création d'un etudiant
exports.createEtudiantValidator = [
  check("nom")
    .trim()
    .notEmpty()
    .withMessage("Le champ nom est requis et ne peut pas être vide.")
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s-]+$/)
    .withMessage("Le champ nom doit contenir uniquement des lettres, des espaces et des tirets."),
  check("prenom")
    .trim()
    .notEmpty()
    .withMessage("Le champ prenom est requis et ne peut pas être vide.")
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s-]+$/)
    .withMessage("Le champ prenom doit contenir uniquement des lettres, des espaces et des tirets."),
  check("email")
    .notEmpty()
    .withMessage("L'email est requis et ne peut pas être vide.")
    .isEmail()
    .withMessage("L'email est invalide.")
    .custom(async (val) => {
      const etudiant = await Etudiant.findOne({ email: val });
      if (etudiant) {
        throw new Error("Cet email est déjà utilisé.");
      }
      return true;
    }),
  check("motDePasse")
    .optional()
    .trim()
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères."),
  check("telephone")
    .trim()
    .notEmpty()
    .withMessage("Le champ telephone est requis et ne peut pas être vide."),
  check("adresse")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Le champ adresse ne peut pas être vide."),
  check("profileImg").optional(),
  check("dateNaissance").optional(),
  check("dateDerniereConnexion").optional(),
  check("passwordChangedAt").optional(),
  check("matricule")
    .trim()
    .notEmpty()
    .withMessage("Le champ matricule est requis et ne peut pas être vide."),
  check("specialite")
    .trim()
    .notEmpty()
    .withMessage("Le champ specialite est requis et ne peut pas être vide.")
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

// Validateur pour récupérer un étudiant par son ID
exports.getEtudiantByIdValidator = [
  check("id")
    .isMongoId()
    .withMessage("L'identifiant de l'étudiant est invalide."),
  validationMiddleware,
];

// Validateur pour mettre à jour un étudiant
exports.updateEtudiantValidator = [
  check("nom")
    .optional()
    .trim()
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s-]+$/)
    .withMessage("Le champ nom doit contenir uniquement des lettres, des espaces et des tirets."),
  check("prenom")
    .optional()
    .trim()
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s-]+$/)
    .withMessage("Le champ prenom doit contenir uniquement des lettres, des espaces et des tirets."),
  check("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("L'email est invalide.")
    .custom(async (val) => {
      const etudiant = await Etudiant.findOne({ email: val });
      if (etudiant) {
        throw new Error("Cet email est déjà utilisé.");
      }
    }),
  check("motDePasse")
    .optional()
    .trim()
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères."),
  check("telephone")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Le champ telephone ne peut pas être vide."),
  check("adresse")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Le champ adresse ne peut pas être vide."),
  check("profileImg").optional(),
  check("dateNaissance").optional(),
  check("dateDerniereConnexion").optional(),
  check("passwordChangedAt").optional(),
  check("matricule")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Le champ matricule est requis et ne peut pas être vide."),
  check("specialite")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Le champ specialite ne peut pas être vide.")
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

// Validateur pour supprimer un étudiant
exports.deleteEtudiantValidator = [
  check("id")
    .isMongoId()
    .withMessage("L'identifiant de l'étudiant est invalide."),
  validationMiddleware,
];