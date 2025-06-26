const NotesModules = require("../../../models/notesModules.model");
const ResultatsSemestres = require("../../../models/resultatsSemestres.model");
const Module = require("../../../models/module.model");
const Matiere = require("../../../models/matiere.model");

/**
 * Calcule la moyenne d'un semestre basé sur les moyennes pondérées des modules.
 *
 * @param {string} id - ID du module de notes
 * @returns {Promise<number>} - Moyenne du semestre
 */
const calculMoySemestre = async (id) => {
  try {
    const notesModule = await NotesModules.findById(id);
    if (!notesModule) throw new Error("Module de notes non trouvé");

    const resultatsSemestre = await ResultatsSemestres.findOne({ notesModules: id });
    if (!resultatsSemestre) throw new Error("Résultats Semestre non trouvé");

    const notesModulesAssociated = await NotesModules.find({
      _id: { $in: resultatsSemestre.notesModules }
    });

    let sumMoy = 0;
    let sumCredit = 0;

    for (let notesModuleAssociated of notesModulesAssociated) {
      const mod = await Module.findById(notesModuleAssociated.module);
      if (!mod) continue;

      const matieres = await Matiere.find({ module: mod._id });
      let sumCreditMod = 0;

      if (!matieres) continue;
      for (let matiere of matieres) {
        sumCreditMod += matiere.credit;
      }

      sumMoy += notesModuleAssociated.moyenne * sumCreditMod;
      sumCredit += sumCreditMod;
    }

    if (sumCredit === 0) return 0;

    return sumMoy / sumCredit;
  } catch (error) {
    console.error("Erreur dans calculMoySemestre:", error);
    return 0;
  }
};

module.exports = calculMoySemestre;
