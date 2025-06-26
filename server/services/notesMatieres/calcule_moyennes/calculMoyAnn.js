const ResultatsSemestres = require("../../../models/resultatsSemestres.model");
const ResultatsAnneeUniversitaire = require("../../../models/resultatsAnneeUniversitaire.model");

/**
 * Calcule la moyenne annuelle basée sur les moyennes des semestres associés.
 *
 * @param {string} id - ID du résultat de semestre
 * @returns {Promise<number>} - Moyenne annuelle
 */
const calculMoyAnn = async (id) => {
  try {
    const resultatsSemestre = await ResultatsSemestres.findById(id);
    if (!resultatsSemestre) throw new Error("Résultats Semestre non trouvé");

    const resultatsAnn = await ResultatsAnneeUniversitaire.findOne({ resultatsSemestres: id });
    if (!resultatsAnn) throw new Error("Résultats Année non trouvé");

    const resultatsSemestresAssociated = await ResultatsSemestres.find({
      _id: { $in: resultatsAnn.resultatsSemestres }
    });

    console.log("resultatsSemestresAssociated : ", resultatsSemestresAssociated);

    let sumMoy = 0;
    for (let resultatsSemestreAssociated of resultatsSemestresAssociated) {
      sumMoy += resultatsSemestreAssociated.moyenne;
    }

    console.log("sum moyenne deux semestres : ", sumMoy);
    return sumMoy / 2;
  } catch (error) {
    console.error("Erreur dans calculMoyAnnée:", error);
    return 0;
  }
};

module.exports = calculMoyAnn;
