const Matiere = require("../../models/matiere.model");
const NotesModules = require("../../models/notesModules.model");
const ResultatsSemestres = require("../../models/resultatsSemestres.model");
const ResultatsAnneeUniversitaire = require("../../models/resultatsAnneeUniversitaire.model");

/**
 * Récupère les documents associés (matière, module, semestre, année).
 * @param {Object} noteMatiere - Le document NotesMatieres
 * @param {Object} notesModule - Le document NotesModules associé
 * @param {Object} resultatsSemestre - Le document ResultatsSemestres associé
 * @returns {Object} - Objet contenant matiere, notesModule, resultatsSemestre, resultatsAnnee
 */
const fetchEvaluationData = async (noteMatiere, notesModule, resultatsSemestre) => {
  const matiere = await Matiere.findById(noteMatiere.matiere);
  if (!matiere) throw new Error("Matière non trouvée");

  const mod = await NotesModules.findOne({ notesMatieres: noteMatiere._id });
  if (!mod) throw new Error("Module de notes non trouvé");

  const semestre = await ResultatsSemestres.findOne({ notesModules: notesModule._id });
  if (!semestre) throw new Error("Résultats semestre non trouvé");

  const annee = await ResultatsAnneeUniversitaire.findOne({ resultatsSemestres: resultatsSemestre._id });
  if (!annee) throw new Error("Résultats année non trouvé");

  return { matiere, notesModule: mod, resultatsSemestre: semestre, resultatsAnnee: annee };
};

module.exports = fetchEvaluationData;
