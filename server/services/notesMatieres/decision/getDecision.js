// getDecision.js
const Etudiant = require("../../../models/etudiant.model");
const Matiere = require("../../../models/matiere.model");
const ContratPedagogique = require("../../../models/contratPedagogique.model");
const NotesMatieres = require("../../../models/notesMatieres.model");
const NotesModules = require("../../../models/notesModules.model");

const validateMatiere = require("./validateMatiere");
const handleRattrapage = require("./handleRattrapage");
const handleRevalidationIfModuleChanges = require("./handleRevalidationIfModuleChanges");
const revaliderMatieresIfModuleInvalid = require("./revaliderMatieresIfModuleInvalid");
const loadDecisionData = require("./loadDecisionData");

const getDecision = async (moyMat, moyMod, dec, idEtud, idMat) => {
  try {
    const { etudiant, matiere, contratPedagogique } = await loadDecisionData(idEtud, idMat);

    if (moyMat >= 10) {
      await validateMatiere(etudiant, matiere, contratPedagogique);
      return 'V';
    }

    if (moyMat >= 7) {
      if (moyMod >= 10) {
        await validateMatiere(etudiant, matiere, contratPedagogique);
        return 'V';
      } else {
        await revaliderMatieresIfModuleInvalid(idEtud, idMat, etudiant, contratPedagogique);
        if (dec === 'R') {
            return 'NV';
        }
      }
    }

    if (moyMat < 7) {
      return handleRattrapage(moyMat, moyMod, dec);
    }

    await handleRevalidationIfModuleChanges(idEtud, idMat, moyMod);
    return 'R';

  } catch (error) {
    console.error("Erreur dans getDecision:", error.message);
    throw error;
  }
};

module.exports = getDecision;
