// const asyncHandler = require("express-async-handler");
// const NotesSemestres = require("../models/resultatsSemestres.model");
// const ApiErrors = require("../utils/ApiErrors.utils");

// exports.getNotesSemestreByEtudiant = asyncHandler(async (req, res, next) => {
//   const etudiantId = req.params.etudiant;

//   // 1. Récupérer le semestre + modules + notes matières + matière (pour crédit)
//   const semestre = await NotesSemestres.findOne({ etudiant: etudiantId })
//     .populate({
//       path: "notesModules",
//       populate: {
//         path: "notesMatieres",
//         populate: {
//           path: "matiere", // on va jusque dans le document "matiere" pour récupérer le crédit
//           //   select: "credit nom" // seulement le champ "credit" est récupéré
//         },
//       },
//     })
//     .lean(); // Pour travailler avec un objet simple

//   if (!semestre) {
//     return next(new ApiErrors("Aucun semestre trouvé pour cet étudiant", 404));
//   }

//   let creditsSemestreValidee = 0;

//   // Structurer la réponse
//   const result = {
//     semestre: semestre.semestre,
//     moyenneSemestre: parseFloat(semestre.moyenne.toFixed(2)),
//     decisionSemestre: semestre.decision,
//     modules: semestre.notesModules.map((mod) => ({
//       module: mod.module?._id?.toString?.() || mod.module?.toString?.() || null,
//       moyenneModule: parseFloat(mod.moyenne.toFixed(2)),
//       decisionModule: mod.decision,
//       notesMatieres: mod.notesMatieres.map((note) => {
//         // Incrémenter si decision est "V"
//         if (note.decision === "V" && note.matiere?.credit) {
//           creditsSemestreValidee += note.matiere.credit;
//         }

//         // Retourner l'objet note
//         return {
//           matiere: note.matiere ? note.matiere._id.toString() : null,
//           nom: note.matiere?.nom ?? null,
//           moyenne: note.moyenne,
//           decision: note.decision,
//           credit: note.matiere?.credit ?? 0,
//         };
//       }),
//     })),
//   };

//   // Ajouter en plus `creditsSemestreValidee` dans ton result si tu veux
//   result.creditsSemestreValidee = creditsSemestreValidee;

//   res.status(200).json({ data: result });
// });

const asyncHandler = require("express-async-handler");
const NotesSemestres = require("../models/resultatsSemestres.model");
const ApiErrors = require("../utils/ApiErrors.utils");
const ApiFeatures = require("../utils/apiFeatures"); // <-- importer ton ApiFeatures ici

exports.getNotesSemestreByEtudiant = asyncHandler(async (req, res, next) => {
  let filter = {};

  // Ajouter filtre par étudiant si l'id est passé dans params
  if (req.params.etudiant) {
    filter.etudiant = req.params.etudiant;
  }

  // Ajouter d'autres filtres si envoyés dans req.filterObj
  if (req.filterObj) {
    filter = { ...filter, ...req.filterObj };
  }

  // Compter le nombre total de documents avec filtre
  const documentsCounts = await NotesSemestres.countDocuments(filter);

  // Utiliser ApiFeatures pour enrichir la query
  const apiFeatures = new ApiFeatures(NotesSemestres.find(filter), req.query)
    .paginate(documentsCounts)
    .filter()
    .search()
    .limitFields()
    .sort();

  // Exécuter la query
  const { mongooseQuery, paginationResult } = apiFeatures;

  const semestres = await mongooseQuery
    .populate({
      path: "notesModules",
      populate: {
        path: "notesMatieres",
        populate: {
          path: "matiere",
          select: "nom credit",
        },
      },
    })
    .lean();

  if (!semestres || semestres.length === 0) {
    return next(new ApiErrors("Aucun semestre trouvé pour cet étudiant", 404));
  }

  // Pour chaque semestre, structurer proprement
  const data = semestres.map((semestre) => {
    let creditsSemestreValidee = 0;

    const structuredSemestre = {
      semestre: semestre.semestre,
      moyenneSemestre: parseFloat(semestre.moyenne.toFixed(2)),
      decisionSemestre: semestre.decision,
      modules: semestre.notesModules.map((mod) => ({
        module: mod.module?._id?.toString?.() || mod.module?.toString?.() || null,
        moyenneModule: parseFloat(mod.moyenne.toFixed(2)),
        decisionModule: mod.decision,
        notesMatieres: mod.notesMatieres.map((note) => {
          if (note.decision === "V" && note.matiere?.credit) {
            creditsSemestreValidee += note.matiere.credit;
          }
          return {
            matiere: note.matiere ? note.matiere._id.toString() : null,
            nom: note.matiere?.nom ?? null,
            TP: note.tp,
            CC: note.cc,
            Ecrit: note.ecrit,
            Rattrapage: note.ratt,
            moyenne: note.moyenne,
            decision: note.decision,
            credit: note.matiere?.credit ?? 0,
          };
        }),
      })),
    };

    structuredSemestre.creditsSemestreValidee = creditsSemestreValidee;

    return structuredSemestre;
  });

  // Répondre
  res.status(200).json({
    results: data.length,
    paginationResult,
    data,
  });
});