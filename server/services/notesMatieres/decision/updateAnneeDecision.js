const ResultatsSemestres = require("../../../models/resultatsSemestres.model");

/**
 * Met à jour la décision de l'année universitaire à partir des décisions des semestres associés.
 *
 * @param {Object} resultatsAnnee - Document ResultatsAnneeUniversitaire
 * @returns {String} - La décision calculée de l'année (V, R, NV)
 */
const updateAnneeDecision = async (resultatsAnnee) => {
  const resultatsSemestresAssociated = await ResultatsSemestres.find({
    _id: { $in: resultatsAnnee.resultatsSemestres }
  }).lean();

  let decAnn = 'NV';

  if (resultatsSemestresAssociated.length > 0) {
    const hasNV = resultatsSemestresAssociated.some(n => n.decision === 'NV');
    const hasR = resultatsSemestresAssociated.some(n => n.decision === 'R');
    const allV = resultatsSemestresAssociated.every(n => n.decision === 'V');

    if (hasNV) {
      decAnn = 'NV';
    } else if (hasR || resultatsAnnee.moyenne < 10) {
      decAnn = 'R';
    } else if (allV && resultatsAnnee.moyenne >= 10) {
      decAnn = 'V';
    }
  }

  resultatsAnnee.decision = decAnn;
  await resultatsAnnee.save();

  return decAnn;
};

module.exports = updateAnneeDecision;
