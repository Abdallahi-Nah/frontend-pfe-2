const NotesModules = require("../../../models/notesModules.model");

/**
 * Met à jour la décision du semestre à partir des décisions des modules associés.
 *
 * @param {Object} resultatsSemestre - Document ResultatsSemestres
 * @returns {String} - La décision calculée du semestre (V, R, NV)
 */
const updateSemestreDecision = async (resultatsSemestre) => {
  const notesModulesAssociated = await NotesModules.find({
    _id: { $in: resultatsSemestre.notesModules }
  }).lean();

  let decSem = 'NV';

  if (notesModulesAssociated.length > 0) {
    const hasNV = notesModulesAssociated.some(n => n.decision === 'NV');
    const hasR = notesModulesAssociated.some(n => n.decision === 'R');
    const allV = notesModulesAssociated.every(n => n.decision === 'V');

    if (hasNV) {
      decSem = 'NV';
    } else if (hasR || resultatsSemestre.moyenne < 10) {
      decSem = 'R';
    } else if (allV && resultatsSemestre.moyenne >= 10) {
      decSem = 'V';
    }
  }

  resultatsSemestre.decision = decSem;
  await resultatsSemestre.save();

  return decSem;
};

module.exports = updateSemestreDecision;
