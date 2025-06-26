const NotesMatieres = require("../../../models/notesMatieres.model");

/**
 * Met à jour la décision du module en fonction des décisions des notes de matières associées.
 *
 * @param {Object} notesModules - Document NotesModules
 * @returns {String} - La décision calculée du module (V, R, NV)
 */
const updateModuleDecision = async (notesModules) => {
  const notesMatieresAssociated = await NotesMatieres.find({
    _id: { $in: notesModules.notesMatieres }
  }).lean();

  let decMod = 'NV';

  if (notesMatieresAssociated.length > 0) {
    const hasNV = notesMatieresAssociated.some(n => n.decision === 'NV');
    const hasR = notesMatieresAssociated.some(n => n.decision === 'R');
    const allV = notesMatieresAssociated.every(n => n.decision === 'V');

    if (hasNV) {
      decMod = 'NV';
    } else if (hasR || notesModules.moyenne < 10) {
      decMod = 'R';
    } else if (allV && notesModules.moyenne >= 10) {
      decMod = 'V';
    }
  }

  notesModules.decision = decMod;
  await notesModules.save();

  return decMod;
};

module.exports = updateModuleDecision;
