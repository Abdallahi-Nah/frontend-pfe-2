const NotesMatieres = require("../../../models/notesMatieres.model");
const NotesModules = require("../../../models/notesModules.model");
const Matiere = require("../../../models/matiere.model");

/**
 * Calcule la moyenne d'un module basé sur les moyennes pondérées des matières.
 *
 * @param {string} id - ID de la note de matière
 * @returns {Promise<number>} - Moyenne du module
 */
const calculMoyModule = async (id) => {
  try {
    const notesMatiere = await NotesMatieres.findById(id);
    if (!notesMatiere) throw new Error("Note de matière non trouvée");

    const notesModule = await NotesModules.findOne({ notesMatieres: id });
    if (!notesModule) throw new Error("Module de notes non trouvé");

    const notesMatieresAssociated = await NotesMatieres.find({
      _id: { $in: notesModule.notesMatieres }
    });

    let sumMoy = 0;
    let sumCredit = 0;

    for (let notesMatiereAssociated of notesMatieresAssociated) {
      const matiere = await Matiere.findById(notesMatiereAssociated.matiere);
      if (!matiere) continue; // Ignore si la matière n'existe pas

      sumMoy += notesMatiereAssociated.moyenne * matiere.credit;
      sumCredit += matiere.credit;
    }

    if (sumCredit === 0) return 0; // Évite la division par zéro

    return sumMoy / sumCredit;
  } catch (error) {
    console.error("Erreur dans calculMoyModule:", error);
    return 0;
  }
};

module.exports = calculMoyModule;
