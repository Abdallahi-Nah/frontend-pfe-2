const ResultatsSemestres = require("../../models/resultatsSemestres.model");
const Module = require("../../models/module.model");

/**
 * Gère la création ou la mise à jour du ResultatsSemestre associé à un NotesModule.
 *
 * @param {Object} noteMatiere - Le document NotesMatieres
 * @param {Object} notesModule - Le document NotesModules associé
 * @returns {Object} resultatsSemestre - Le semestre mis à jour ou créé
 */
const createOrUpdateResultatsSemestre = async (noteMatiere, notesModule) => {
  // Récupère le module complet pour obtenir son semestre
  const mod = await Module.findById(notesModule.module);
  if (!mod) throw new Error("Module non trouvé pour déterminer le semestre.");

  let resultatsSemestre = await ResultatsSemestres.findOne({
    semestre: mod.semestre,
    etudiant: noteMatiere.etudiant
  });

  if (!resultatsSemestre) {
    // Création d'un nouveau semestre
    resultatsSemestre = await ResultatsSemestres.create({
      etudiant: noteMatiere.etudiant,
      semestre: mod.semestre,
      notesModules: [notesModule._id]
    });
  } else {
    // Ajout du module si pas encore présent
    if (!resultatsSemestre.notesModules.includes(notesModule._id)) {
      resultatsSemestre.notesModules.push(notesModule._id);
      await resultatsSemestre.save();
    }
  }

  return resultatsSemestre;
};

module.exports = createOrUpdateResultatsSemestre;
