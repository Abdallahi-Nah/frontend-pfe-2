const { check } = require("express-validator");
const validationMiddleware = require("../../my_middlewares/validationMiddleware");
const SpecialiteModel = require("../../models/specialite.model");
const MatiereModel = require("../../models/matiere.model");
const EnseignantModel = require("../../models/enseignant.model");

exports.createEmploisValidator = [
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
 check("matiere")
    .trim()
    .notEmpty()
    .withMessage("matiere id must be not empty")
    .isMongoId()
    .withMessage("invalid matiere id")
    .custom((matiereId, {req}) =>
        MatiereModel.findById(matiereId).then((matiere) => {
        if (!matiere || (req.body.specialite !== matiere.module.specialite._id.toString())) {
          return Promise.reject(
            new Error(`No matiere for this id: ${matiereId}`)
          );
        }
      })
    ),
  check("enseignant")
    .trim()
    .notEmpty()
    .withMessage("enseignant id must be not empty")
    .isMongoId()
    .withMessage("invalid enseignant id"),
    // .custom((enseignantId, {req}) =>
    //     EnseignantModel.findById(enseignantId).then((enseignant) => {
    //     let isMatExist = false;
    //     for(let matiereEnseigne of enseignant.matieresEnseignes) {
    //       if(req.body.matiere === matiereEnseigne._id.toString()) {
    //         isMatExist = true;
    //       }
    //     }
    //     console.log(req.body.matiere, isMatExist);
    //     if (!enseignant || !isMatExist) {
    //       return Promise.reject(
    //         new Error(`No enseignant for this id: ${enseignantId}`)
    //       );
    //     }
    //   })
    // ),
 check("semestre")
    .trim()
    .notEmpty()
    .withMessage("Le champ semestre est requis et ne peut pas être vide.")
    .matches(/^S[1-6]$/i)
    .withMessage(
      "Les valeurs autorisées pour semestre sont S1, S2, S3, S4, S5 ou S6."
    ),
 check("type")
    .trim()
    .notEmpty()
    .withMessage("Le champ type est requis et ne peut pas être vide."),
 check("jour")
    .trim()
    .notEmpty()
    .withMessage("Le champ jour est requis et ne peut pas être vide."),
 check("heureDebut")
    .trim()
    .notEmpty()
    .withMessage("Le champ 'heureDebut' est requis et ne peut pas être vide."),
 check("heureFin")
    .trim()
    .notEmpty()
    .withMessage("Le champ 'heureFin' est requis et ne peut pas être vide."),
  check("lieu")
    .trim()
    .notEmpty()
    .withMessage("Le champ 'lieu' est requis et ne peut pas être vide."),
  validationMiddleware,
];

exports.getEmploisByIdValidator = [
  check("id").isMongoId().withMessage("invalid id"),
  validationMiddleware,
];

exports.updateEmploisValidator = [
  check("specialite")
    .optional()
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
 check("matiere")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("matiere id must be not empty")
    .isMongoId()
    .withMessage("invalid matiere id")
    .custom((matiereId, {req}) =>
        MatiereModel.findById(matiereId).then((matiere) => {
        if (!matiere || (req.body.specialite !== matiere.module.specialite._id.toString())) {
          return Promise.reject(
            new Error(`No matiere for this id: ${matiereId}`)
          );
        }
      })
    ),
  check("enseignant")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("enseignant id must be not empty")
    .isMongoId()
    .withMessage("invalid enseignant id")
    .custom((enseignantId, {req}) =>
        EnseignantModel.findById(enseignantId).then((enseignant) => {
        let isMatExist = false;
        for(let matiereEnseigne of enseignant.matieresEnseignes) {
          if(req.body.matiere === matiereEnseigne._id.toString()) {
            isMatExist = true;
          }
        }
        console.log(req.body.matiere, isMatExist);
        if (!enseignant || !isMatExist) {
          return Promise.reject(
            new Error(`No enseignant for this id: ${enseignantId}`)
          );
        }
      })
    ),
 check("semestre")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Le champ semestre est requis et ne peut pas être vide.")
    .matches(/^S[1-6]$/i)
    .withMessage(
      "Les valeurs autorisées pour semestre sont S1, S2, S3, S4, S5 ou S6."
    ),
 check("type")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Le champ type est requis et ne peut pas être vide."),
 check("jour")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Le champ jour est requis et ne peut pas être vide."),
 check("heureDebut")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Le champ 'heureDebut' est requis et ne peut pas être vide."),
 check("heureFin")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Le champ 'heureFin' est requis et ne peut pas être vide."),
  check("lieu")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Le champ 'lieu' est requis et ne peut pas être vide."),
  validationMiddleware,
];

exports.deleteEmploisValidator = [
  check("id").isMongoId().withMessage("invalid id"),
  validationMiddleware,
];