const Etudiant = require("../../../models/etudiant.model");
const Matiere = require("../../../models/matiere.model");
const ContratPedagogique = require("../../../models/contratPedagogique.model");

const loadDecisionData = async (idEtud, idMat) => {
  if (!idEtud || !idMat) {
    throw new Error("ID étudiant ou matière manquant");
  }

  const etudiant = await Etudiant.findById(idEtud);
  if (!etudiant) {
    throw new Error("Étudiant non trouvé");
  }

  const matiere = await Matiere.findById(idMat);
  if (!matiere) {
    throw new Error("Matière non trouvée");
  }

  const contratPedagogique = await ContratPedagogique.findOne({ etudiant: idEtud });
  if (!contratPedagogique) {
    throw new Error("Contrat pédagogique non trouvé");
  }

  return { etudiant, matiere, contratPedagogique };
};

module.exports = loadDecisionData;
