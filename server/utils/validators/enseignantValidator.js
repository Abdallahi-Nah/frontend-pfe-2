const { check } = require("express-validator");
const bcrypt = require("bcryptjs");
const validationMiddleware = require("../../my_middlewares/validationMiddleware");
const Enseignant = require("../../models/enseignant.model");
const MatiereModel = require("../../models/matiere.model");

// Validateur pour la création d'un enseignant
exports.createEnseignantValidator = [
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
      const enseignant = await Enseignant.findOne({ email: val });
      if (enseignant) {
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
  check("diplomes")
    .trim()
    .notEmpty()
    .withMessage("Le champ diplomes est requis et ne peut pas être vide."),
  check("specialite")
    .trim()
    .notEmpty()
    .withMessage("Le champ specialite est requis et ne peut pas être vide."),
  check("anneesExperience").optional(),
  check("disponibilites").optional(),
  check("preferencesPedagogiques").optional(),
  check("historiqueCours").optional(),
  check("matieresEnseignes")
    .trim()
    .notEmpty()
    .withMessage("L'identifiant de la matière ne peut pas être vide.")
    .isMongoId()
    .withMessage("L'identifiant de la matière est invalide.")
    .custom((matiereIds) => {
      return Promise.all(
        matiereIds.map((matiereId) =>
          MatiereModel.findById(matiereId).then((matiere) => {
            if (!matiere) {
              return Promise.reject(new Error(`Aucune matière trouvée pour cet identifiant : ${matiereId}`));
            }
          })
        )
      );
    }),
  validationMiddleware,
];

// Validateur pour récupérer un enseignant par son nom
exports.getEnseignantByNameValidator = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Le champ name est requis et ne peut pas être vide.")
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s-]+$/)
    .withMessage("Le champ name doit contenir uniquement des lettres, des espaces et des tirets."),
  validationMiddleware,
];

// Validateur pour récupérer un enseignant par son ID
exports.getEnseignantByIdValidator = [
  check("id")
    .isMongoId()
    .withMessage("L'identifiant de l'enseignant est invalide."),
  validationMiddleware,
];

// Validateur pour mettre à jour un enseignant
exports.updateEnseignantValidator = [
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
      const enseignant = await Enseignant.findOne({ email: val });
      if (enseignant) {
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
  check("diplomes")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Le champ diplomes ne peut pas être vide."),
  check("specialite")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Le champ specialite ne peut pas être vide."),
  check("anneesExperience").optional(),
  check("disponibilites").optional(),
  check("preferencesPedagogiques").optional(),
  check("historiqueCours").optional(),
  check("matieresEnseignes")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("L'identifiant de la matière ne peut pas être vide.")
    .isMongoId()
    .withMessage("L'identifiant de la matière est invalide.")
    .custom((matiereIds) => {
      return Promise.all(
        matiereIds.map((matiereId) =>
          MatiereModel.findById(matiereId).then((matiere) => {
            if (!matiere) {
              return Promise.reject(new Error(`Aucune matière trouvée pour cet identifiant : ${matiereId}`));
            }
          })
        )
      );
    }),
  validationMiddleware,
];

// Validateur pour mettre à jour un enseignant connecté
exports.updateLoggedEnseignantValidator = [
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
      const enseignant = await Enseignant.findOne({ email: val });
      if (enseignant) {
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
  check("diplomes")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Le champ diplomes ne peut pas être vide."),
  check("specialite")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Le champ specialite ne peut pas être vide."),
  check("anneesExperience").optional(),
  check("disponibilites").optional(),
  check("preferencesPedagogiques").optional(),
  check("historiqueCours").optional(),
  validationMiddleware,
];

// Validateur pour changer le mot de passe d'un enseignant
exports.changeEnseignantPasswordValidator = [
  check("id")
    .isMongoId()
    .withMessage("L'identifiant de l'enseignant est invalide."),
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
      const enseignant = await Enseignant.findById(req.params.id);
      if (!enseignant) {
        throw new Error(`Aucun enseignant trouvé pour cet identifiant : ${req.params.id}`);
      }
      const isMatch = await bcrypt.compare(req.body.currentPassword, enseignant.password);
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

// Validateur pour changer le mot de passe de l'enseignant connecté
exports.changeLoggedEnseignantPasswordValidator = [
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
      const enseignant = await Enseignant.findById(req.enseignant._id);
      if (!enseignant) {
        throw new Error(`Aucun enseignant trouvé pour cet identifiant : ${req.params.id}`);
      }
      const isMatch = await bcrypt.compare(req.body.currentPassword, enseignant.password);
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

// Validateur pour supprimer un enseignant
exports.deleteEnseignantValidator = [
  check("id")
    .isMongoId()
    .withMessage("L'identifiant de l'enseignant est invalide."),
  validationMiddleware,
];