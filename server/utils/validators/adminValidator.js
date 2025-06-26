const { check } = require("express-validator");
const bcrypt = require("bcryptjs");
const validationMiddleware = require("../../my_middlewares/validationMiddleware");
const Admin = require("../../models/admin.model");
const MatiereModel = require("../../models/matiere.model");

// Validateur pour la création d'un admin
exports.createAdminValidator = [
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
      const admin = await Admin.findOne({ email: val });
      if (admin) {
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
  check("dateEmbauche").optional(),
  validationMiddleware,
];

// Validateur pour récupérer un admin par son nom
exports.getAdminByNameValidator = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Le champ name est requis et ne peut pas être vide.")
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s-]+$/)
    .withMessage("Le champ name doit contenir uniquement des lettres, des espaces et des tirets."),
  validationMiddleware,
];

// Validateur pour récupérer un admin par son ID
exports.getAdminByIdValidator = [
  check("id")
    .isMongoId()
    .withMessage("L'identifiant de l'admin est invalide."),
  validationMiddleware,
];

// Validateur pour mettre à jour un admin
exports.updateAdminValidator = [
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
      const admin = await Admin.findOne({ email: val });
      if (admin) {
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
  check("dateEmbauche").optional(),
  validationMiddleware,
];

// Validateur pour mettre à jour un admin connecté
exports.updateLoggedAdminValidator = [
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
      const admin = await Admin.findOne({ email: val });
      if (admin) {
        throw new Error("Cet email est déjà utilisé.");
      }
    }),
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
  check("dateEmbauche").optional(),
  validationMiddleware,
];

// Validateur pour changer le mot de passe d'un admin
exports.changeAdminPasswordValidator = [
  check("id")
    .isMongoId()
    .withMessage("L'identifiant de l'admin est invalide."),
  check("currentPassword")
    .trim()
    .notEmpty()
    .withMessage("Vous devez entrer le mot de passe actuel."),
  check("passwordConfirm")
    .trim()
    .notEmpty()
    .withMessage("Vous devez confirmer le nouveau mot de passe."),
  check("motDePasse")
    .trim()
    .notEmpty()
    .withMessage("Vous devez entrer un nouveau mot de passe.")
    .custom(async (val, { req }) => {
      const admin = await Admin.findById(req.params.id);
      if (!admin) {
        throw new Error(`Aucun admin trouvé pour cet identifiant : ${req.params.id}`);
      }
      const isMatch = await bcrypt.compare(req.body.currentPassword, admin.password);
      if (!isMatch) {
        throw new Error("Le mot de passe actuel est incorrect.");
      }
      if (val !== req.body.passwordConfirm) {
        throw new Error("La confirmation du mot de passe ne correspond pas.");
      }
      return true;
    }),
  validationMiddleware,
];

// Validateur pour changer le mot de passe de l'admin connecté
exports.changeLoggedAdminPasswordValidator = [
  check("currentPassword")
    .trim()
    .notEmpty()
    .withMessage("Vous devez entrer le mot de passe actuel."),
  check("passwordConfirm")
    .trim()
    .notEmpty()
    .withMessage("Vous devez confirmer le nouveau mot de passe."),
  check("motDePasse")
    .trim()
    .notEmpty()
    .withMessage("Vous devez entrer un nouveau mot de passe.")
    .custom(async (val, { req }) => {
      const admin = await Admin.findById(req.admin._id);
      if (!admin) {
        throw new Error(`Aucun admin trouvé pour cet identifiant : ${req.params.id}`);
      }
      const isMatch = await bcrypt.compare(req.body.currentPassword, admin.password);
      if (!isMatch) {
        throw new Error("Le mot de passe actuel est incorrect.");
      }
      if (val !== req.body.passwordConfirm) {
        throw new Error("La confirmation du mot de passe ne correspond pas.");
      }
      return true;
    }),
  validationMiddleware,
];

// Validateur pour supprimer un admin
exports.deleteAdminValidator = [
  check("id")
    .isMongoId()
    .withMessage("L'identifiant de l'admin est invalide."),
  validationMiddleware,
];