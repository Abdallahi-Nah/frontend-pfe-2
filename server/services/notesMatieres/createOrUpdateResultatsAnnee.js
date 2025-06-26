const ResultatsAnneeUniversitaire = require("../../models/resultatsAnneeUniversitaire.model");

/**
 * Crée ou met à jour le document ResultatsAnneeUniversitaire
 * en associant un ResultatsSemestre donné à l'étudiant.
 *
 * @param {Object} noteMatiere - Le document NotesMatieres
 * @param {Object} resultatsSemestre - Le document ResultatsSemestres
 * @returns {Object} resultatsAnnee - L'année universitaire liée ou créée
 */
const createOrUpdateResultatsAnnee = async (noteMatiere, resultatsSemestre) => {
  let resultatsAnnee = await ResultatsAnneeUniversitaire.findOne({
    etudiant: noteMatiere.etudiant
  });

  if (!resultatsAnnee) {
    // Création d'une nouvelle année universitaire
    resultatsAnnee = await ResultatsAnneeUniversitaire.create({
      etudiant: noteMatiere.etudiant,
      resultatsSemestres: [resultatsSemestre._id]
    });
  } else {
    // Ajout du semestre s'il n'est pas déjà lié
    if (!resultatsAnnee.resultatsSemestres.includes(resultatsSemestre._id)) {
      resultatsAnnee.resultatsSemestres.push(resultatsSemestre._id);
      await resultatsAnnee.save();
    }
  }

  return resultatsAnnee;
};

module.exports = createOrUpdateResultatsAnnee;
